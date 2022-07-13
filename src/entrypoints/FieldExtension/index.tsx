import { useState, useEffect, useMemo } from 'react'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import { Canvas, Button } from 'datocms-react-ui'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import s from './styles.module.css'

type PropTypes = {
  ctx: RenderFieldExtensionCtx
}

export default function FieldExtension({ ctx }: PropTypes) {
  const handleOpenModal = async () => {
    const result = await ctx.openModal({
      id: 'productModel',
      title: 'Browse Saleor SKUs',
      width: 'l',
    })
  }

  return (
    <Canvas ctx={ctx}>
      {/* Modal Button */}
      <Button
        buttonType="primary" 
        onClick={handleOpenModal}
        buttonSize="s"
        leftIcon={<FontAwesomeIcon icon={faSearch} />}
      >
        Browse Saleor SKUs
      </Button>
    </Canvas>
  )
}
