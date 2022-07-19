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
                    label='Saleor url'
                    hint='Insert the Saleor url'
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
                    label='Saleor dashboard url'
                    hint='If the dashboard has its own url'
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
                    label='Saleor channel'
                    hint='Insert the used channel slug'
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
                    label='Saleor token'
                    hint='Add a token if you need permissions'
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
