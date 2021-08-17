const http = require('http')
const createHandler = require('github-webhook-handler')
const handler = createHandler({
  path: '/deploy',
  secret: '123'
})

http.createServer((req, res) => {
  handler(req, res, err => {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777, () => {
  console.log('webhook listen at 7777')
})

handler.on('error', err => {
  console.error('Error', err.message)
})

handler.on('push', event => {
  console.log('received push', event.payload)
})
