import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { getCompaniesReducer, getCompanyReducer } from './reducers/companyReducer'
import { getStreetReducer } from './reducers/streetReducer'

const initiralState = {}

const reducer = combineReducers({
  getCompanies: getCompaniesReducer,
  getCompany: getCompanyReducer,
  getStreet: getStreetReducer
})

const store = createStore(reducer, initiralState, applyMiddleware(thunk))
export default store