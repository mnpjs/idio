import User from './User'
import LinkedIn from '../social/LinkedIn'
import GitHub from '../social/GitHub'
import Ellipsis from '../ellipsis'

/**
 * The buttons to authenticate user.
 * @param {Object} props
 * @param {Auth} props.auth
 */
const AppUser = ({
  linkedin = true, privacy, error, loading, auth, host, signOut,
}) => {
  if (error)
    return (<div>Error: {error}</div>)
  if (loading)
    return (<div>Loading<Ellipsis /></div>)

  const loggedIn = auth.linkedin_user || auth.github_user
  return (<div>
    {!loggedIn && <span style="display:block">To display the profile image and validate your GitHub profile, sign in. No advanced permissions are required other than default ones (no email). Your public LinkedIn ID remains unknown. <a href={privacy}>Privacy Policy</a></span>}

    <User auth={auth} signOut={signOut}/>

    {linkedin && !auth.linkedin_user && <LinkedIn host={host}/>}
    {linkedin && !auth.linkedin_user && ' '}
    {!auth.github_user && <GitHub host={host} />}
  </div>)
}

export default AppUser