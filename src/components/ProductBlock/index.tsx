import { Config, Media, Product } from '../../classes/SaleorClient'
import classNames from 'classnames'

import s from './styles.module.css'

type PropTypes = {
  product: Product
  config: Config
  selected?: boolean
}

export default function ProductBlock({ product, config, selected }: PropTypes) {
  const backendUrl = config.backendUrl.endsWith('/')
    ? config.backendUrl.slice(0, -1)
    : config.backendUrl
  const dashboardUrl =
    config.dashboardUrl && config.dashboardUrl.endsWith('/')
      ? config.dashboardUrl.slice(0, -1)
      : config.dashboardUrl
  const url = dashboardUrl || backendUrl

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
        <h2 className={s['product__title']}>
          {selected ? (
            <a href={`${url}/products/${product.id}`} target='_blank' rel='noreferrer'>
              {product.name}
            </a>
          ) : (
            product.name
          )}
        </h2>
        <p className={s['product__variants']}>{product.variants.length} variants</p>
      </div>
    </div>
  )
}
