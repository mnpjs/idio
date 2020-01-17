/* eslint-disable react/jsx-key */

/**
 * Required to complete OAuth sign in.
 * @type {import('../../').Middleware}
 */
export default function callback(ctx) {
  const { error } = ctx.query
  ctx.body = ctx.render([
    <p>
      {error ? 'You have not authorised the app. ' : ''}
      Please close this window if not closed automatically in the next 60 seconds.
    </p>,
    <script>
      window.opener.postMessage('{error ? 'error' : 'signedin'}', '*')
      ;window.close()
    </script>,
  ], { title: 'Sign In Callback' })
}