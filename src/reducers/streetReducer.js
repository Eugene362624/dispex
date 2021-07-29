import { STREET_HOUSES_FAIL, STREET_HOUSES_REQUEST, STREET_HOUSES_SUCCESS } from "../constants/streetConst"

export function getStreetReducer(state = {street: []}, action) {
    switch(action.type) {
        case STREET_HOUSES_REQUEST: 
            return {streetLoading: true}
        case STREET_HOUSES_SUCCESS: 
            return {streetLoading: false, street: action.payload}
        case STREET_HOUSES_FAIL: 
            return {streetLoading: false, streetError: action.error}
        default: return state
    }
}