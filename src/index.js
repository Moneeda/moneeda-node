const PublicClient = require('./public.js')
const AuthenticatedClient = require('./auth.js')

class Moneeda {

  constructor(token, exchange) {
   this.token = token
   this.exchange = exchange
  }

  public (exchange = this.exchange) {
    return new PublicClient({token: this.token, exchange})
  }

  private (exchange = this.exchange, keys = {}) {
    return new AuthenticatedClient({token: this.token, exchange, keys})
  }

}

module.exports = exports = Moneeda;
