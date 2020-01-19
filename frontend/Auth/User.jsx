import { getUserData } from './lib'
import { Component } from 'preact'

export default class User extends Component {
  /**
   * @param {Object} [opts]
   * @param {!Auth} [opts.auth]
   */
  render({ auth, signOut }) {
    const { linkedin_user, github_user } = auth
    if (!linkedin_user && !github_user) return null

    const { picture, name } = getUserData(auth)

    return (<div>
      <img src={picture} width="50"/>
      {' '}Hello, {name}!{' '}
      <a href="#" onClick={(e) => {
        e.preventDefault()
        signOut()
          .catch((err) => {
            alert(`Could not sign out: ${err.message}. Please refresh the page and try again. Alternatively, clear your cookies.`)
          })
        return false
      }}>Sign Out</a>
    </div>)
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').Auth} Auth
 */
