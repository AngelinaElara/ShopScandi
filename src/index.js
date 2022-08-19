import './scss/index.scss'
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import * as ReactDOMClient from 'react-dom/client'
import {ApolloProvider} from 'react-apollo'
import App from './App'
import {client} from './db/data'
import {store} from './redux/store'
import { Provider } from 'react-redux'

const $root = document.querySelector('#root')

const root = ReactDOMClient.createRoot($root)

export const history = createBrowserHistory()

root.render(
  <BrowserRouter history={history}>
    <Routes>
      <Route
        path='*'
        element={
          <ApolloProvider client={client}>
            <Provider store={store}>
              <App />
            </Provider>
          </ApolloProvider>
        }
      />
    </Routes>
  </BrowserRouter>      
)

