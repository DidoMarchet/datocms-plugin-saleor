import { Media, Product } from '../../classes/SaleorClient'
import classNames from 'classnames'

import s from './styles.module.css'

type PropTypes = {
  product: Product
  selected?: boolean
}

export default function ProductBlock({ product, selected }: PropTypes) {
  const getMedia = (media: Media[]) => {
    const finded = media.find((media: Media) => media.type === 'IMAGE')
    if (finded) {
      return (
        <div className={s['product__image']}>
          <img alt='' src={finded.url} loading='lazy' width='150' />
        </div>
      )
    }
  }

  return (
    <div
      className={classNames(s['product'], {
        [s['product-selected']]: selected,
      })}
    >
      {getMedia(product.media)}
      <div className={s['product__content']}>
        <p className={s['product__pretitle']}>{product?.sku ? 'Variant' : 'Product '}</p>
        <h2 className={s['product__title']}>
          {/* If it is not a variant it could be a link */}
          {product?.product?.name ? (
            `${product.product.name} ${product.name}`
          ) : (
            product.name
          )}
        </h2>
        {product?.variants && (
          <p className={s['product__variants']}>{product.variants.length} variants</p>
        )}
        {product?.sku && <p className={s['product__variants']}>Sku {product?.sku}</p>}
        {product.product && (
          <p className={s['product__variants']}>
            Variant of{' '}  <span> {product.product.name}</span>
          </p>
        )}
      </div>
    </div>
  )
}
