import { RenderConfigScreenCtx } from 'datocms-plugin-sdk'
import { Button, Canvas, TextField, Form, FieldGroup } from 'datocms-react-ui'
import { Form as FormHandler, Field } from 'react-final-form'

type Props = {
  ctx: RenderConfigScreenCtx
}

export default function ConfigScreen({ ctx }: Props) {
  return (
    <Canvas ctx={ctx}>
      <FormHandler
        initialValues={ctx.plugin.attributes.parameters}
        /* eslint-disable @typescript-eslint/no-explicit-any*/
        validate={(values: any) => {
          const errors: Record<string, string> = {}

          if (!values.backendUrl) {
            errors.backendUrl = 'This field is required!'
          }
          if (!values.channel) {
            errors.channel = 'This field is required!'
          }
          return errors
        }}
        /* eslint-disable @typescript-eslint/no-explicit-any*/
        onSubmit={async (values: any) => {
          await ctx.updatePluginParameters(values)
          ctx.notice('Settings updated successfully!')
        }}
      >
        {({ handleSubmit, submitting, dirty }: any) => (
          <Form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Set Saleor Backend Url */}
              <Field name='backendUrl'>
                {({ input, meta: { error } }) => (
                  <TextField
                    id='backendUrl'
                    label='Saleor Url'
                    hint='Insert the Saleor Url'
                    placeholder='https://backend.saleor.io/'
                    required
                    error={error}
                    {...input}
                  />
                )}
              </Field>

              <Field name='dashboardUrl'>
                {({ input, meta: { error } }) => (
                  <TextField
                    id='dashboardUrl'
                    label='Saleor Dashboard Url'
                    hint='If the Dashboard has its own Url'
                    placeholder='https://dashboard.saleor.io/'
                    error={error}
                    {...input}
                  />
                )}
              </Field>

              {/* Set Saleor Channel */}
              <Field name='channel'>
                {({ input, meta: { error } }) => (
                  <TextField
                    id='channel'
                    label='Selected Channel'
                    hint='Insert the shop channel slug'
                    placeholder='channel-slug'
                    required
                    error={error}
                    {...input}
                  />
                )}
              </Field>

              {/* Set Token */}
              <Field name='token'>
                {({ input, meta: { error } }) => (
                  <TextField
                    id='token'
                    label='Saleor Token'
                    hint='Add token if you need more permission'
                    placeholder='XXXX XXXX XXXX XXXX'
                    error={error}
                    {...input}
                  />
                )}
              </Field>
            </FieldGroup>

            <Button
              type='submit'
              fullWidth
              buttonSize='l'
              buttonType='primary'
              disabled={submitting || !dirty}
            >
              Save settings
            </Button>
          </Form>
        )}
      </FormHandler>
    </Canvas>
  )
}
