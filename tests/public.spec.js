const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should()
const nock = require('nock');

const moneedaToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBydWViYUBtb25lZWRhLmNvbSIsImlkIjoiNWEzMDBkNzhiZjc1OWU1ZDc2YjQ5MDJmIiwiaWF0IjoxNTEzMDk4NjczfQ.6D5i49Y4jZyEaeQR0MPkkFkC6y2XrjVUR10b4r5sMZI'

const Moneeda = require('../src/index.js')
const moneeda = new Moneeda(moneedaToken)

describe('moneeda.public()', () => {

  describe('Products retrieve an array of products', () => {
    it('BTX-Products test', async () => {
      const btxTestResults = await moneeda.public('BTX').products()
      expect(btxTestResults).to.be.an('array')
      const btxSimp = btxTestResults.map(x => ({id: x.id}));
      expect(btxSimp).to.deep.include({id: 'BTC-ETH'})
    })

    it('BFX-Products test', async () => {
      const bfxTestResults = await moneeda.public('BFX').products()
      expect(bfxTestResults).to.be.an('array')
      const bfxSimp = bfxTestResults.map(x => ({id: x.id}));
      expect(bfxSimp).to.deep.include({id: 'BTC-USD'})
    })

    it('GDX-Products test', async () => {
      const gdxTestResults = await moneeda.public('GDX').products()
      expect(gdxTestResults).to.be.an('array')
      const gdxSimp = gdxTestResults.map(x => ({id: x.id}));
      expect(gdxSimp).to.deep.include({id: 'ETH-BTC'})
    })

    it('KRK-Products test', async () => {
      const krkTestResults = await moneeda.public('KRK').products()
      expect(krkTestResults).to.be.an('array')
      const krkSimp = krkTestResults.map(x => ({id: x.id}));
      expect(krkSimp).to.deep.include({id: 'XETH-ZUSD'})
    })
    it('BNB-Products test', async () => {
      try {
        await moneeda.public('BNB').products()
      } catch (err) {
        expect(err.statusCode).to.equal(404)
      }
    })
    it('LQI-Products test', async () => {
      const lqiTestResults = await moneeda.public('LQI').products()
      expect(lqiTestResults).to.be.an('array')
      const lqiSimp = lqiTestResults.map(x => ({id: x.id}));
      expect(lqiSimp).to.deep.include({id: 'OMG-ETH'})
    })
  });

  describe('AllTickers return all the tickers', () => {
    it('BTX-Alltickers test', async () => {
      const btxTickers = await moneeda.public('BTX').allTickers()
      expect(btxTickers).to.be.an('array')
    })
    it('BFX-Alltickers test', async () => {
      const bfxTickers = await moneeda.public('BFX').allTickers()
      expect(bfxTickers).to.be.an('array')
    })
    it('KRK-Alltickers test', async () => {
      const krkTickers = await moneeda.public('KRK').allTickers()
      expect(krkTickers).to.be.an('array')
    })
    it('GDX-Alltickers test', async () => {
      try {
        await moneeda.public('GDX').allTickers()
      } catch (err) {
        expect(err.statusCode).to.equal(404)
      }
    })

    it('BNB-Alltickers test', async () => {
      const bnbTickers = await moneeda.public('BNB').allTickers()
      expect(bnbTickers).to.be.an('array')
    })
    it('LQI-Alltickers test', async () => {
      try {
        await moneeda.public('LQI').allTickers()
      } catch (err) {
        expect(err.statusCode).to.equal(404)
      }
    })
  })

  describe('Ticker return ticker for specific product', () => {
    it('BTX-Ticker test', async () => {
      const btxTestResults = await moneeda.public('BTX').ticker('BTC-ETH')
      expect(btxTestResults).to.be.an('object')
      expect(btxTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
    it('BFX-Ticker test', async () => {
      const bfxTestResults = await moneeda.public('BFX').ticker('BTC-USD')
      expect(bfxTestResults).to.be.an('object')
      expect(bfxTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
    it('GDX-Ticker test', async () => {
      const gdxTestResults = await moneeda.public('GDX').ticker('ETH-BTC')
      expect(gdxTestResults).to.be.an('object')
      expect(gdxTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
    it('KRK-Ticker test', async () => {
      const krkTestResults = await moneeda.public('KRK').ticker('XETH-ZUSD')
      expect(krkTestResults).to.be.an('object')
      expect(krkTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
    it('BNB-Ticker test', async () => {
      const bnbTestResults = await moneeda.public('BNB').ticker('BTC-NEO')
      expect(bnbTestResults).to.be.an('object')
      expect(bnbTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
    it('LQI-Ticker test', async () => {
      const lqiTestResults = await moneeda.public('LQI').ticker('OMG-ETH')
      expect(lqiTestResults).to.be.an('object')
      expect(lqiTestResults).to.include.all.keys('price', 'bid', 'ask')
    })
  })

  describe('Candles return candles for specific exchange', () => {
    it('BTX-Candles test', async () => {
      const btxTestResults = await moneeda.public('BTX').candles('BTC-ETH')
      expect(btxTestResults).to.be.an('array')
    })
    it('BFX-Candles test', async () => {
      const bfxTestResults = await moneeda.public('BFX').candles('BTC-USD')
      expect(bfxTestResults).to.be.an('array')
    })
    it('GDX-Candles test', async () => {
      const gdxTestResults = await moneeda.public('GDX').candles('ETH-BTC')
      expect(gdxTestResults).to.be.an('array')
    })
    it('KRK-Candles test', async () => {
      const krkTestResults = await moneeda.public('KRK').candles('XETH-ZUSD')
      expect(krkTestResults).to.be.an('array')
    })
    it('BNB-Candles test', async () => {
      const bnbTestResults = await moneeda.public('BNB').candles('BTC-NEO')
      expect(bnbTestResults).to.be.an('array')
    })
    it('LQI-Candles test', async () => {
      try {
        await moneeda.public('LQI').candles('OMG-ETH')
      } catch (err) {
        expect(err.statusCode).to.equal(404)
      }
    })
  })

  describe('Trades return trades for specific exchange', () => {
    it('BTX-Trades test', async () => {
      const btxTestResults = await moneeda.public('BTX').trades('BTC-ETH')
      expect(btxTestResults).to.be.an('array')
    })
    it('BFX-Trades test', async () => {
      const bfxTestResults = await moneeda.public('BFX').trades('BTC-USD')
      expect(bfxTestResults).to.be.an('array')
    })
    it('GDX-Trades test', async () => {
      const gdxTestResults = await moneeda.public('GDX').trades('ETH-BTC')
      expect(gdxTestResults).to.be.an('array')
    })
    it('KRK-Trades test', async () => {
      const krkTestResults = await moneeda.public('KRK').trades('XETH-ZUSD')
      expect(krkTestResults).to.be.an('array')
    })
    it('BNB-Trades test', async () => {
      const bnbTestResults = await moneeda.public('BNB').trades('BTC-NEO')
      expect(bnbTestResults).to.be.an('array')
    })
    it('LQI-Trades test', async () => {
      const lqiTestResults = await moneeda.public('LQI').trades('OMG-ETH')
      expect(lqiTestResults).to.be.an('array')
    })
  })


  describe('OrderBook return orderBook for specific exchange', () => {
    it('BTX-OrderBook test', async () => {
      const btxTestResults = await moneeda.public('BTX').orderBook('BTC-ETH')
      expect(btxTestResults).to.be.an('object')
      expect(btxTestResults).to.include.all.keys('bids', 'asks')
    })
    it('BFX-OrderBook test', async () => {
      const bfxTestResults = await moneeda.public('BFX').orderBook('BTC-USD')
      expect(bfxTestResults).to.be.an('object')
      expect(bfxTestResults).to.include.all.keys('bids', 'asks')
    })
    it('GDX-OrderBook test', async () => {
      const gdxTestResults = await moneeda.public('GDX').orderBook('ETH-BTC')
      expect(gdxTestResults).to.be.an('object')
      expect(gdxTestResults).to.include.all.keys('bids', 'asks')
    })
    it('KRK-OrderBook test', async () => {
      const krkTestResults = await moneeda.public('KRK').orderBook('XETH-ZUSD')
      expect(krkTestResults).to.be.an('object')
      expect(krkTestResults).to.include.all.keys('bids', 'asks')
    })
    it('BNB-OrderBook test', async () => {
      const bnbTestResults = await moneeda.public('BNB').orderBook('BTC-NEO')
      expect(bnbTestResults).to.be.an('object')
      expect(bnbTestResults).to.include.all.keys('bids', 'asks')
    })
    it('LQI-OrderBook test', async () => {
      const lqiTestResults = await moneeda.public('LQI').orderBook('OMG-ETH')
      expect(lqiTestResults).to.be.an('object')
      expect(lqiTestResults).to.include.all.keys('bids', 'asks')
    })
  })

});
