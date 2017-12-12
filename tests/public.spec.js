const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should()
const nock = require('nock');

const moneedaToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBydWViYUBtb25lZWRhLmNvbSIsImlkIjoiNWEzMDBkNzhiZjc1OWU1ZDc2YjQ5MDJmIiwiaWF0IjoxNTEzMDk4NjczfQ.6D5i49Y4jZyEaeQR0MPkkFkC6y2XrjVUR10b4r5sMZI'

const Moneeda = require('../src/index.js')
const moneeda = new Moneeda(moneedaToken)

describe('PublicClient', () => {

  describe('Products retrieve an array of products', () => {
    const publicClient = moneeda.public()
    it('BTX test', async () => {
      publicClient.setExchange('BTX')
      const btxTestResults = await publicClient.getProducts()
      expect(btxTestResults).to.be.an('array')
      const btxSimp = btxTestResults.map(x => ({id: x.id}));
      expect(btxSimp).to.deep.include({id: 'BTC-ETH'})
    })

    it('BFX test', async () => {
      publicClient.setExchange('BFX')
      const bfxTestResults = await publicClient.getProducts()
      expect(bfxTestResults).to.be.an('array')
      const bfxSimp = bfxTestResults.map(x => ({id: x.id}));
      expect(bfxSimp).to.deep.include({id: 'BTC-USD'})
    })

    it('GDX test', async () => {
      publicClient.setExchange('GDX')
      const gdxTestResults = await publicClient.getProducts()
      expect(gdxTestResults).to.be.an('array')
      const gdxSimp = gdxTestResults.map(x => ({id: x.id}));
      expect(gdxSimp).to.deep.include({id: 'ETH-BTC'})
    })

    it('KRK test', async () => {
      publicClient.setExchange('KRK')
      const krkTestResults = await publicClient.getProducts()
      expect(krkTestResults).to.be.an('array')
      const krkSimp = krkTestResults.map(x => ({id: x.id}));
      expect(krkSimp).to.deep.include({id: 'XETH-ZUSD'})
    })
    it('BNB test', async () => {
      publicClient.setExchange('BNB')
      try {
        await publicClient.getProducts()
      } catch (err) {
        expect(err.statusCode).to.equal(404)
      }
    })
    it('LQI test', async () => {
      publicClient.setExchange('LQI')
      const lqiTestResults = await publicClient.getProducts()
      expect(lqiTestResults).to.be.an('array')
      const lqiSimp = lqiTestResults.map(x => ({id: x.id}));
      expect(lqiSimp).to.deep.include({id: 'ETH-BTC'})
    })
  });

  describe('AllProductsTicker return all the tickers', () => {
    const publicClient = moneeda.public()
    it('BTX test', async () => {
      publicClient.setExchange('BTX')
      const btxTickers = await publicClient.getAllProductsTicker()
      expect(btxTickers).to.be.an('array')
    })
    it('BFX test', async () => {
      publicClient.setExchange('BFX')
      const bfxTickers = await publicClient.getAllProductsTicker()
      expect(bfxTickers).to.be.an('array')
    })
    it('KRK test', async () => {
      publicClient.setExchange('KRK')
      const krkTickers = await publicClient.getAllProductsTicker()
      expect(krkTickers).to.be.an('array')
    })
    it('GDX test', async () => {
      publicClient.setExchange('GDX')
      try {
        await publicClient.getAllProductsTicker()
      } catch (err) {
        expect(err.statusCode).to.equal(404)
      }
    })

    it('BNB test', async () => {
      publicClient.setExchange('BNB')
      const bnbTickers = await publicClient.getAllProductsTicker()
      expect(bnbTickers).to.be.an('array')
    })
    it('LQI test', async () => {
      publicClient.setExchange('LQI')
      try {
        await publicClient.getAllProductsTicker()
      } catch (err) {
        expect(err.statusCode).to.equal(404)
      }
    })
  })

  describe('ProductTicker return ticker for specific product', () => {
    const publicClient = moneeda.public()
    it('BTX test', async () => {
      publicClient.setExchange('BTX')
      const btxTestResults = await publicClient.getProductTicker('BTC-ETH')
      expect(btxTestResults).to.be.an('object')
      expect(btxTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
    it('BFX test', async () => {
      publicClient.setExchange('BFX')
      const bfxTestResults = await publicClient.getProductTicker('BTC-USD')
      expect(bfxTestResults).to.be.an('object')
      expect(bfxTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
    it('GDX test', async () => {
      publicClient.setExchange('GDX')
      const gdxTestResults = await publicClient.getProductTicker('ETH-BTC')
      expect(gdxTestResults).to.be.an('object')
      expect(gdxTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
    it('KRK test', async () => {
      publicClient.setExchange('KRK')
      const krkTestResults = await publicClient.getProductTicker('XETH-ZUSD')
      expect(krkTestResults).to.be.an('object')
      expect(krkTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
    it('BNB test', async () => {
      publicClient.setExchange('BNB')
      const bnbTestResults = await publicClient.getProductTicker('NEO-BTC')
      expect(bnbTestResults).to.be.an('object')
      expect(bnbTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
    it('LQI test', async () => {
      publicClient.setExchange('LQI')
      const lqiTestResults = await publicClient.getProductTicker('ETH-BTC')
      expect(lqiTestResults).to.be.an('object')
      expect(lqiTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
  })

  describe('Candles return candles for specific exchange', () => {
    const publicClient = moneeda.public()
    it('BTX test', async () => {
      publicClient.setExchange('BTX')
      const btxTestResults = await publicClient.getCandles('BTC-ETH')
      expect(btxTestResults).to.be.an('array')
    })
    it('BFX test', async () => {
      publicClient.setExchange('BFX')
      const bfxTestResults = await publicClient.getCandles('BTC-USD')
      expect(bfxTestResults).to.be.an('array')
    })
    it('GDX test', async () => {
      publicClient.setExchange('GDX')
      const gdxTestResults = await publicClient.getCandles('ETH-BTC')
      expect(gdxTestResults).to.be.an('array')
    })
    it('KRK test', async () => {
      publicClient.setExchange('KRK')
      const krkTestResults = await publicClient.getCandles('XETH-ZUSD')
      expect(krkTestResults).to.be.an('array')
    })
    it('BNB test', async () => {
      publicClient.setExchange('BNB')
      const bnbTestResults = await publicClient.getCandles('NEO-BTC')
      expect(bnbTestResults).to.be.an('array')
    })
    it('LQI test', async () => {
      publicClient.setExchange('LQI')
      try {
        await publicClient.getCandles('ETH-BTC')
      } catch (err) {
        expect(err.statusCode).to.equal(404)
      }
    })
  })

});
