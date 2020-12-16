import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import "./index.css"
import App from './App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import reducer from './reducers/index'

const store = createStore(reducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  )

ReactDOM.hydrate(
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>,
    document.getElementById("root")
)