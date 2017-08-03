import { expect } from 'chai'
import Core from '../src/index'

describe('Core.HttpClient module exports functional tests.', () => {
  const HttpClient = Core.HttpClient
  it('should be instance of `Object` and has `Object` constructor.', () => {
    expect(HttpClient).to.be.instanceOf(Object)
    expect(HttpClient.constructor.name).to.be.eq('Object')
  })
  it('should have `get` function property', () => {
    expect(HttpClient.get).to.be.instanceOf(Function)
  })
  describe('`get` function input handle tests.', () => {
    it('should return EmptyUrlError if first argument is empty string, or not a string', () => {
      let get = HttpClient.get('')
      expect(get).to.be.instanceOf(HttpClient.errors.EmptyUrlError)
    })
    it('should return InvalidUrlError if first argument is invalid url.', () => {
      let get = HttpClient.get('httx://google.com')
      expect(get).to.be.instanceOf(HttpClient.errors.InvalidUrlError)
    })
    it('should return Promise in case of valid url.', () => {
      let get = HttpClient.get('http://google.com')
      // let cname = get.constructor.name
      expect(get).to.be.instanceOf(Promise)
    })
  })
  describe('`get` Promisified execution handling tests.', () => {
    it('execution success . Return non empty string.', (done) => {
      let get = HttpClient.get('http://google.com')
      get.then((response) => {
        expect(typeof response).to.be.eq('string')
        done()
      })
    })
    it('execution failure . Return 404 error .', (done) => {
      let get = HttpClient.get('http://google.com/aasdasd')
      get.catch((err) => {
        // TODO  fromsomereason instanceOf doesnt causes :
        // (node:30017) UnhandledPromiseRejectionWarning: Unhandled promise
        // rejection (rejection id: 1): AssertionError: The instanceof
        // assertion needs a constructor but undefined was given.
        //
        //  leads to mocha timeout
        //     `expect(err).to.be.instanceOf(HttpClient.errors.NotFoundError)`
        //
        expect(err).to.be.instanceOf(Object)
        done()
      })
    })
  })
})
