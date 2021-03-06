import Async from './async/index'
import HttpClient from './HttpClient'
import Utils from './Utils'

Utils.dbg(__filename)('loaded')

const Core = {
  Async,
  HttpClient,
  Utils
}

export default Core
