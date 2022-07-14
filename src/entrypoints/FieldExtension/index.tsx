import { useState } from 'react'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import { Canvas, Button } from 'datocms-react-ui'

import SaleorClient, { Config, Products, Product } from '../../classes/SaleorClient'
import ProductBlock from '../../components/ProductBlock'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import s from './styles.module.css'

type PropTypes = {
  ctx: RenderFieldExtensionCtx
}

export default function FieldExtension({ ctx }: PropTypes) {
  const config = ctx.plugin.attributes.parameters
  
  const currentValue:string = ctx.formValues.saleorProduct as string || ''

  const [product, setProduct] = useState<Product>()
  const [value, setValue] = useState<string>('');

  const handleOpenModal = async () => {
    const result:Product = await ctx.openModal({
      id: 'ProductModal',
      title: 'Browse Saleor Products',
      width: 'l',
      parameters: { config },
    }) as Product

    if(result){
      setProduct(result) 
      setValue(result.node.id) 
    }
  }

  return (
    <Canvas ctx={ctx}>
      {/* Modal button */}
      <Button
        buttonType='primary'
        onClick={handleOpenModal}
        buttonSize='s'
        leftIcon={<FontAwesomeIcon icon={faSearch} />}
      >
        Browse Saleor Products
      </Button>

      { product && <ProductBlock product={product} />}

    </Canvas>

    
  )
}
