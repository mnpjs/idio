import { Component } from 'preact'
import fetch from 'unfetch'

export default class LinksList extends Component {
  constructor() {
    super()
    this.state = {
      links: [],
      loading: false,
      error: null,
    }
  }
  componentDidMount() {
    this.fetch()
  }
  async fetch() {
    this.setState({ loading: true })
    try {
      const res = await fetch('/admin/links')
      const links = await res.json()
      this.setState({ links })
    } catch (err) {
      if (err instanceof Event) {
        this.setState({ error: 'Network error' })
      } else {
        this.setState({ error: err.message })
      }
    } finally {
      this.setState({ loading: false })
    }
  }
  render() {
    const { loading, links, error } = this.state
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    return (<div>
      {links.map(({ location, path }) => {
        return <Row key={path} path={path} location={location} onDelete={() => {
          this.fetch()
        }} />
      })}
    </div>)
  }
}

class Row extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error: null,
    }
  }
  async deleteLink(path) {
    this.setState({ loading: true })
    try {
      const body = new FormData()
      body.append('path', path)
      const res = await fetch('/admin/link', {
        body,
        method: 'DELETE',
      })
      const { error } = await res.json()
      if (error) this.setState({ error })
      else this.props.onDelete()
    } catch (err) {
      if (err instanceof Event) {
        this.setState({ error: 'Network error' })
      } else {
        this.setState({ error: err.message })
      }
    } finally {
      this.setState({ loading: false })
    }
  }
  render({ path, location }) {
    const { loading, error } = this.state
    return (<div className="row">
      <div className="col">
        {path}
      </div>
      <div className="col">
        {location}
      </div>
      <div className="col">
        <a href="#" onClick={(ev) => {
          ev.preventDefault()
          this.deleteLink(path)
          return false
        }}>
          x
          {loading && '...'}
          {error && error}
        </a>
      </div>
    </div>)
  }
}