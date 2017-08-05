import Async from './async/index'
import HttpClient from './HttpClient'
import Utils from './Utils'

import css from 'bootstrap/dist/css/bootstrap.css'
import cssTheme from 'bootstrap/dist/css/bootstrap-theme.css'
import jsBootstrap from 'bootstrap/dist/js/bootstrap.js'

Utils.dbg(__filename)('loaded')

const Core = {
  Async,
  HttpClient,
  Utils
}

export default Core
