import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { addClientReducer, deleteClientReducer } from './reducers/clientReducer'
import { getCompaniesReducer, getCompanyReducer } from './reducers/companyReducer'
import { getHouseReducer } from './reducers/houseReducer'
import { getStreetReducer } from './reducers/streetReducer'

const initialState = {
  flats: [
    {
      clients: [], 
      building: '', 
      flat: '', 
      addressId: ''}
    ]
}

const reducer = combineReducers({
  getCompanies: getCompaniesReducer,
  getCompany: getCompanyReducer,
  getStreet: getStreetReducer,
  getHouse: getHouseReducer,
  addClient: addClientReducer,
  deleteClient: deleteClientReducer 
})

const store = createStore(reducer, initialState, applyMiddleware(thunk))
console.log(store.getState())

export default store