const BASE = import.meta.env.VITE_API_URL ?? '/api'

const headers = () => ({
  'Content-Type': 'application/json',
  ...(localStorage.getItem('token') && {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })
})

const handle = async (res) => {
  if (res.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    window.location.href = '/login'
    return {}
  }
  return res.json()
}

export const api = {
  post: (path, body) =>
    fetch(`${BASE}${path}`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handle),
  get: (path) =>
    fetch(`${BASE}${path}`, { headers: headers() }).then(handle)
}
