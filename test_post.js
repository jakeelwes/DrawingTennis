var request = require('request-promise')

var r = {
  method: 'POST',
  uri: 'http://nodesaveserve.herokuapp.com/save',
  body: {
    data: 'some cool data'
  },
  json: true
}

request(r)
  .then(console.log)
  .catch(console.log)
