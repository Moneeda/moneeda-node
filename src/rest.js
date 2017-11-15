const request = require('request')
const rp = require('request-promise')
const queryString = require('query-string');

class Rest {
  constructor (token) {
    this.options = {
      auth: {
        bearer: token
      },
      json: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }

  setAuthenticatedClientHeaders (keys) {
    this.options.headers['Moneeda Secret Key'] = keys.sercret
    this.options.headers['Moneeda Passphrase Key'] = keys.passphrase
    this.options.headers['Moneeda Private Key'] = keys.private
    return this
  }

  addOptions (options) {
    return Object.assign(options, this.options);
  }

  call (method, uri, opts = {}, data) {
    Object.assign(opts, {
      method,
      uri
    });
    this.addOptions(opts)
    return rp(opts).promise()
  }

  get (url, queryparams) {
    let uri = url + '?' + queryString.stringify(queryparams)
    return this.call('GET', url)
  }

  post (url, opts) {
    return this.call('POST', url, opts)
  }
}

module.exports = Rest;
