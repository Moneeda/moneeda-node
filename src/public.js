const Rest = require('./rest')

class PublicClient {
  constructor ({exchange = 'BTX', token}) {
    this.exchange = exchange
    this.product = ''
    this.rest = new Rest(token)
    this.baseUrl = 'https://api.moneeda.com/api/exchanges/'
  }

  setExchange (exchange) {
    this.exchange = exchange
  }

  setProduct (product) {
    this.product = product
  }

  /**
  * Returns a promise that resolves all
  * the products available for the defined exchange
  *
  */
  getProducts () {
    let uri = this.baseUrl + this.exchange + '/products'
    return this.rest.get(uri)
  }

  /**
  * Returns a promise that resolves
  * the ticker for an specific product
  * @param {string} product - The product id
  * @returns {promise} ticker for an specific product
  */

  getProductTicker (product) {
    let queryparams = {
      product
    }
    let uri = this.baseUrl + this.exchange + '/ticker'
    return this.rest.get(uri, queryparams)
  }

  /**
  * Returns a promise that resolves the tickers of
  * all the available products
  */

  getAllProductsTicker () {
    let uri = this.baseUrl + this.exchange + '/alltickers'
    return this.rest.get(uri)
  }

  /**
  * Returns a promise that resolves the candles of
  * a defined product
  * @param {string} product - The product id
  * @param {string} period - Period of the candles
  */

  getCandles (product, period = '30m') {
    let queryparams = {
      period,
      product
    }
    let uri = this.baseUrl + this.exchange + '/candles'
    return this.rest.get(uri, queryparams)
  }

  /**
  * Returns a promise that resolves the trades of
  * a defined product
  * @param {string} product - The product id
  * @param {object} params - Extra params that include the following keys
  * from - The initial date to retrieve the trades
  * to - The end date to retrieve the dates
  * limit - The limit of trades, default to 100
  */

  getTrades (product, params = {}) {
    let queryparams = {
      product,
      from: params.from,
      to: params.to,
      limit: params.limit
    }
    let uri = this.baseUrl + this.exchange + '/trades'
    return this.rest.get(uri, queryparams)
  }

  /**
  * Returns a promise that resolves the order book of
  * a defined product
  * @param {string} product - The product id
  * @param {number} level - The deepness level
  *
  */

  getProductOrderBook (product, level) {
    let queryparams = {
      product,
      level
    }
    let uri = this.baseUrl + this.exchange + '/book'
    return this.rest.get(uri, queryparams)
  }
}

module.exports = PublicClient;
