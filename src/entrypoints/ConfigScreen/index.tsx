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
        validate={(values: any) => {
          const errors: Record<string, string> = {}

          if (!values.endpoint) {
            errors.endpoint = 'This field is required!'
          }
          if (!values.channel) {
            errors.channel = 'This field is required!'
          }
          return errors
        }}
        onSubmit={async (values: any) => {
          await ctx.updatePluginParameters(values)
          ctx.notice('Settings updated successfully!')
        }}
      >
        {({ handleSubmit, submitting, dirty }: any) => (
          <Form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Set Saleor GraphQl Endpoint */}
              <Field name='endpoint'>
                {({ input, meta: { error } }) => (
                  <TextField
                    id='endpoint'
                    label='GraphQL endpoint'
                    hint='Insert the GraphQL URL'
                    placeholder='https://demo.saleor.io/graphql/'
                    required
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
