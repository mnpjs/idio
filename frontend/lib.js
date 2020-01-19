import unfetch from 'unfetch'

/**
 * Loads data from the API.
 */
export const fetch = async (path, query, host, api_key, options, route = 'api') => {
  if (!path) throw new Error('No path given')
  if (query) path += serialize(query)
  let url
  if (/^https?:/.test(path)) {
    url = path
  } else {
    url = [host, route, api_key].filter(Boolean).join('/')
    url += path.startsWith('/') && host ? path : `/${path}`
  }
  try {
    const res = await unfetch(url, options)
    const { error, ...rest } = await res.json()
    if (error) throw new Error(error)
    return rest
  } catch (err) {
    if (err instanceof Event) {
      throw new Error('network error')
    } else throw err
  }
}

function serialize(obj) {
  let str = []
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      const val = obj[p]
      if (val === undefined) continue
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val))
    }
  const s = str.join("&")
  if (!s.length) return ''
  return `?${s}`
}