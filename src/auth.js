const Rest = require('./rest')

class AuthenticatedClient {
  constructor ({exchange = 'BTX', token, keys = {}}) {
    this.exchange = exchange
    this.product = ''
    this.rest = new Rest(token).setAuthenticatedClientHeaders(keys)
    this.baseUrl = 'https://api.moneeda.com/api/exchanges/'
  }

  setExchange (exchange, keys) {
    if (!keys) {
      throw new Error('Missing auth keys')
    }

    if (!exchange) {
      throw new Error('Missing exchange')
    }

    this.exchange = exchange
    this.rest.setAuthenticatedClientHeaders(keys)
  }

  setProduct (product) {
    this.product = product
  }

  getBalance (currency) {
    let queryparams = {
      currency
    }
    let uri = this.baseUrl + this.exchange + '/balance'
    return this.rest.get(uri, queryparams)
  }

}

module.exports = AuthenticatedClient;
