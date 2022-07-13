import { Canvas } from 'datocms-react-ui'
import { RenderModalCtx } from 'datocms-plugin-sdk'

type PropTypes = {
  ctx: RenderModalCtx
}

export default function ProductModal({ ctx }: PropTypes) {
  return (
    <Canvas ctx={ctx}>
      <div style={{ fontSize: 'var(--font-size-xxxl)', fontWeight: '500' }}>
        Hello {ctx.parameters.name}!
      </div>
    </Canvas>
  )
}
