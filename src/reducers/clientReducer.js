import { ADD_CLIENT_FAIL, ADD_CLIENT_REQUEST, ADD_CLIENT_SUCCESS, DELETE_CLIENT_FAIL, DELETE_CLIENT_REQUEST, DELETE_CLIENT_SUCCESS } from "../constants/clientConst"

export function addClientReducer(state = {clientAddLoading: false, clientAddError: ''}, action) {
    switch(action.type) {
        case ADD_CLIENT_REQUEST: 
            return {clientAddLoading: true}
        case ADD_CLIENT_SUCCESS: 
            return {clientAddLoading: false}
        case ADD_CLIENT_FAIL: 
            return {clientAddLoading: false, clientAddError: action.error}
        default: return state
    }
}

export function deleteClientReducer(state = {clientDeleteLoading: false, clientDeleteError: ''}, action) {
    switch(action.type) {
        case DELETE_CLIENT_REQUEST: 
            return {clientDeleteLoading: true}
        case DELETE_CLIENT_SUCCESS: 
            return {clientDeleteLoading: false}
        case DELETE_CLIENT_FAIL: 
            return {clientDeleteLoading: false, clientDeleteError: action.error}
        default: return state
    }
}