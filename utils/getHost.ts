import { IncomingMessage } from "http"

// This is not production ready, (except with providers that ensure a secure host, like Now)
// For production consider the usage of environment variables and NODE_ENV
function getHost(req: IncomingMessage): string {
  if (!req) return ''

  const { host } = req.headers

  if (host.startsWith('localhost')) {
    return `http://${host}`
  }
  return `https://${host}`
}

export default getHost