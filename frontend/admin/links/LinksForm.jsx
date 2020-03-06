import Form, {
  FormGroup, Input, SubmitButton, SubmitForm,
} from '@depack/form'

export default class LinksForm extends SubmitForm {
  render({ onChange, ...props }) {
    const { formLoading, error, success } = this.state

    return (<Form {...props} onSubmit={this.submit.bind(this)} onChange={values => {
      this.reset()
      if(onChange) onChange(values)
    }}>
      <FormGroup label="Path" help="The path for the link.">
        <Input name="path" placeholder="/new-path" />
      </FormGroup>
      <FormGroup label="URL" help="The location of the redirect.">
        <Input name="location" placeholder="https://location.path" />
      </FormGroup>
      <SubmitButton loading={formLoading} type="warning"
        confirmText="Create Link" />
      {error && `Error: ${error}`}
      {success && `OK`}
    </Form>)
  }
}