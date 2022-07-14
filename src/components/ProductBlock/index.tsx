import { Product } from '../../classes/SaleorClient'

import s from './styles.module.css'

type PropTypes = {
  product: Product
}

export default function ProductBlock({ product }: PropTypes) {
  const getMedia = (media: any) => {
    const finded = media.find((media: any) => media.type === 'IMAGE')
    if (finded) {
      return (
        <div className={s['product__image']}>
          <img alt='' src={finded.url} loading='lazy' width='150' />
        </div>
      )
    }
  }

  return (
    <div className={s['product']}>
      {getMedia(product.node.media)}
      <div className={s['product__content']}>
        <div className={s['product__title']}>{product.node.name}</div>
        <div className={s['product__code']}>{product.node.id}</div>
      </div>
    </div>
  )
}
