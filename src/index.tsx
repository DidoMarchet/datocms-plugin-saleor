import { connect, RenderConfigScreenCtx, RenderModalCtx, RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import { render } from './utils/render'

import ConfigScreen from './entrypoints/ConfigScreen/'
import FieldExtension from "./entrypoints/FieldExtension";

import ProductModal from './components/ProductModal'

import 'datocms-react-ui/styles.css'

const FIELD_EXTENSION_ID = 'saleorProducts'

connect({
  manualFieldExtensions() {
    return [
      {
        id: FIELD_EXTENSION_ID,
        name: 'Saleor Product',
        type: 'editor',
        fieldTypes: ['json'],
      },
    ]
  },
  renderConfigScreen(ctx:RenderConfigScreenCtx) {
    return render(<ConfigScreen ctx={ctx} />)
  },
  async renderFieldExtension(id, ctx: RenderFieldExtensionCtx) {
    render(
      <FieldExtension ctx={ctx} />
    );
  },
  renderModal(modalId: string, ctx: RenderModalCtx) {
    switch (modalId) {
      case 'customModal':
        return render(<ProductModal ctx={ctx} />)
    }
  },
})
