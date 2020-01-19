import { FormGroup } from '@depack/form'
import Subscription from '../Subscription'

export default class Subscriptions extends Subscription {
  constructor() {
    super()
    this.state.comments = false
    this.state.p256dh = null
  }
  async componentDidMount() {
    super.componentDidMount()
    await this.check()
  }
  async check() {
    this.setState({ loading: true })
    try {
      const { comments, p256dh } = await this.checkSubscribed()
      if (comments) this.setState({ comments, p256dh })
      else this.setState({ comments: false, p256dh: null })
    } finally {
      this.setState({ loading: false })
    }
  }
  async subscribe() {
    this.setState({ loading: true })
    try {
      await this._subscribe('comments')
    } finally {
      this.setState({ loading: false })
    }
    await this.check()
  }
  async unsubscribe() {
    this.setState({ loading: true })
    try {
      await this._unsubscribe('comments')
    } finally {
      this.setState({ loading: false })
    }
    await this.check()
  }
  render({ disabled }) {
    const { comments, p256dh, loading } = this.state
    return <FormGroup form-row col-2 label="Subscribe" help="Receive push notifications with replies.">
      <div className="col-10">
        <div className="form-check col-4">
          <input checked={disabled ? false : comments} onChange={(ev) => {
            if (!ev.currentTarget.checked) {
              const res = window.confirm('Are you sure you want so unsubscribe? You will stop receiving notifications from ALL comments on the website.')
              if (!res) return ev.currentTarget.checked = true
              this.unsubscribe()
            } else this.subscribe()
          }} disabled={disabled || loading} type="checkbox" className="form-check-input" id="subscribe"/>
          <label className="form-check-label" htmlFor="subscribe">
            {(!disabled && loading) && <span style="color:grey">Checking your subscriptions...</span>}
            {(!disabled && !loading && comments) && <span style="color:green">You've subscribed 👍</span> }
          </label>
          {comments && <input value={p256dh} name="sub-id" type="hidden" />}
        </div>
      </div>
    </FormGroup>
  }
}
