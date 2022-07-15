import { useState, useEffect, useMemo } from 'react'

import { Canvas, Button, TextInput } from 'datocms-react-ui'
import { RenderModalCtx } from 'datocms-plugin-sdk'

import SaleorClient, { Config, Products, Node } from '../../classes/SaleorClient'
import ProductBlock from '../ProductBlock'

import useDebounce from '../../utils/useDebounce'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCheck } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import s from './styles.module.css'

type PropTypes = {
  ctx: RenderModalCtx
}

type FetchResult = {
  products: Products
}

export default function ProductModal({ ctx }: PropTypes) {
  const config: Config = ctx.parameters.config as Config

  {
    /* Init Client  */
  }
  const client = useMemo(() => new SaleorClient(config), [config])

  const [products, setProducts] = useState<{ edges: Node[] }>({ edges: [] })
  const [selected, setSelected] = useState<Node>()
  const [sku, setSku] = useState('')
  const debouncedValue = useDebounce<string>(sku, 500)

  {
    /* Handle Search  */
  }
  useEffect(() => {
    if (sku) {
      const fetchData = async () => {
        await client.productsMatching(sku).then(({ products }: FetchResult) => {
          setProducts(products)
          {
            /* Reset selected if it doesn't appear in the new searched array  */
          }
          if (selected && !products.edges.find((product) => product.node.id === selected.node.id)) {
            setSelected(undefined)
          }
        })
      }
      fetchData().catch(console.error)
    } else {
      setProducts({ edges: [] })
      setSelected(undefined)
    }
  }, [debouncedValue, sku, client])

  {
    /* Set Selected */
  }
  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, product: Node) => {
    setSelected(product)
  }

  /* On Close Modal */
  const handleClose = (e: React.MouseEvent<Element, MouseEvent>, selected: Node) => {
    ctx.resolve(selected)
  }

  return (
    <Canvas ctx={ctx}>
      {/* Search input */}
      <div className={s['search-input-wrapper']}>
        <TextInput
          name='search'
          id='search'
          value={sku}
          placeholder='Insert sku or product name (case sensitive)'
          onChange={(newValue) => setSku(newValue)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>

      {/* Display Result */}
      {products.edges.length > 0 && (
        <div className={s['products']}>
          {products.edges.map((product: Node) => (
            <div
              className={classNames(s['products-item'], {
                [s['products-item-selected']]: selected && product.node.id === selected.node.id,
              })}
              key={product.node.id}
              onClick={(e) => handleSelect(e, product)}
            >
              <ProductBlock product={product.node} config={config} />
            </div>
          ))}
        </div>
      )}

      {selected && (
        <Button
          className={s['search-button']}
          buttonType='primary'
          onClick={(e) => handleClose(e, selected)}
          buttonSize='s'
          leftIcon={<FontAwesomeIcon icon={faCheck} />}
        >
          Confirm selection
        </Button>
      )}
    </Canvas>
  )
}
