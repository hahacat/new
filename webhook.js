const http = require('http')
const createHandler = require('github-webhook-handler')
const { spawn } = require('child_process')

const handler = createHandler({
  path: '/test',
  secret: 'test123'
})

function run_cmd (cmd, args, callback) {
  const child = spawn(cmd, args)
  let resp = ''
  child.stdout.on('data', function (buffer) {
    resp += buffer.toString()
  })
  child.stdout.on('end', function () {
    callback(resp)
  })
}

http.createServer((req, res) => {
  handler(req, res, err => {
    res.statusCode = 404
    console.log(err.message)
    res.end('no such location')
  })
}).listen(7777, () => {
  console.log('webhook listen at 7777')
})

handler.on('error', err => {
  console.error('Error', err.message)
})

// handler.on('*', event => {
//   console.log('received * ', event.payload)
// run_cmd('sh', ['./ssh-deploy.sh'], function (text) {
//   console.log(text)
// })
// })

handler.on('push', event => {
  // console.log('received push', event.payload)
  if (event.payload.ref === 'refs/heads/master') {
    console.log('received push')
    run_cmd('sh', ['./ssh-deploy.sh'], function (text) {
      console.log(text)
    })
  }
})
