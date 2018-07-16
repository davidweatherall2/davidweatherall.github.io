import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { createLogger } from 'redux-logger'
import reduxPromiseMiddleware from "redux-promise-middleware"
import reducer from "./index"

const middleware = applyMiddleware(reduxPromiseMiddleware(), createLogger())

export default createStore(reducer, middleware)