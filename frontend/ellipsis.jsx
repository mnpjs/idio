import { Component } from 'preact'

/**
 * ... Animation
 */
export default class Ellipsis extends Component {
  constructor() {
    super()
    this.state.showing = false
  }
  render({ timeout = 250, children }) {
    return (<span>{children}
      <Dots timeout={timeout}/>
    </span>)
  }
}

class Dots extends Component {
  constructor() {
    super()
    this.state = {
      inc: 0,
    }
    this.int = null
  }
  componentDidMount() {
    this.int = setInterval(() => {
      let inc = this.state.inc + 1
      if (inc > 3) inc = 0
      this.setState({ inc })
    }, this.props.timeout)
  }
  /**
   * This function is called by _Preact_, because the root
   * component changed its state and removed the Dots element.
   */
  componentWillUnmount() {
    clearInterval(this.int)
  }
  render() {
    return (<span>{'.'.repeat(this.state.inc)}</span>)
  }
}
