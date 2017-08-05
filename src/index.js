import Async from './async/index'
import HttpClient from './HttpClient'
import Utils from './Utils'

import css from 'bootstrap/dist/css/bootstrap.css'
import cssTheme from 'bootstrap/dist/css/bootstrap-theme.css'
import jsBootstrap from 'bootstrap/dist/js/bootstrap.js'

import ReactDOM from 'react-dom'
import React from 'react'

Utils.dbg(__filename)('loaded')

import App from './react/components/App'

function initApp() {
  let appElement = <App />;
  ReactDOM.render(
    appElement,
    document.getElementById('react-dom')
  );
}

const Core = {
  initApp,
  Async,
  HttpClient,
  Utils
}

export default Core
