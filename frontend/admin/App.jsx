import { Component } from 'preact'
import LinksForm from './links/LinksForm'
import LinksList from './links/LinksList'

export default class App extends Component {
  constructor() {
    super()
    this.list = null
  }
  render() {
    return (<div>
      <h1>
        Hello World!
      </h1>
      <LinksForm path="/admin/link" submitFinish={() => {
        if (this.list) this.list.fetch()
      }} />
      <LinksList ref={(list) => {
        this.list = list
      }} />
    </div>)
  }
}