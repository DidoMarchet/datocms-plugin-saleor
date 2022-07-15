import { useState, useEffect, useMemo } from 'react'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import { Canvas, Button } from 'datocms-react-ui'

import SaleorClient, { Config, Node, Product } from '../../classes/SaleorClient'
import ProductBlock from '../../components/ProductBlock'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import s from './styles.module.css'

type PropTypes = {
  ctx: RenderFieldExtensionCtx
}

type FetchResult = {
  product: Product
}

export default function FieldExtension({ ctx }: PropTypes) {
  const config: Config = ctx.plugin.attributes.parameters as Config

  {
    /* Init Client  */
  }
  const client = useMemo(() => new SaleorClient(config), [config])

  const [product, setProduct] = useState<Product>()
  const [loaded, setLoaded] = useState<boolean>(true)

  const handleOpenModal = async () => {
    const result: Node = (await ctx.openModal({
      id: 'ProductModal',
      title: 'Browse Saleor Products',
      width: 'l',
      parameters: { config },
    })) as Node

    if (result) {
      const selected = result.node
      setProduct(selected)
      ctx.setFieldValue(ctx.fieldPath, result.node.id)
    }
  }

  useEffect(() => {
    const currentValue: string = (ctx.formValues[ctx.fieldPath] as string) || ''
    if (currentValue !== '') {
      const fetchData = async () => {
        await client.productMatching(currentValue).then(({ product }: FetchResult) => {
          setProduct(product)
          setLoaded(true)
        })
      }
      fetchData().catch(console.error)
    }
  }, [])

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setProduct(undefined)
    ctx.setFieldValue(ctx.fieldPath, '')
  }

  return (
    <Canvas ctx={ctx}>
      <div className={s['field-wrap']}>
        {product && (
          /* Product block */
          <div className={s['selected']}>
            <button type='button' onClick={(e) => handleRemove(e)} className={s['remove']}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
            <ProductBlock product={product} config={config} selected={true} />
          </div>
        )}
        {/* Modal button */}
        <Button
          className={s['trigger-overlay']}
          buttonType='primary'
          onClick={handleOpenModal}
          buttonSize='s'
          leftIcon={<FontAwesomeIcon icon={faSearch} />}
        >
          Browse Saleor Products
        </Button>
      </div>
    </Canvas>
  )
}
