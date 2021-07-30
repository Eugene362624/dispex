import { STREET_HOUSES_FAIL, STREET_HOUSES_REQUEST, STREET_HOUSES_SUCCESS } from "../constants/streetConst"

const initialState = {
    houses: [],
    streetLoading: true
}

export function getStreetReducer(state = initialState, action) {
    switch(action.type) {
        case STREET_HOUSES_REQUEST: 
            return {...state, streetLoading: true}
        case STREET_HOUSES_SUCCESS: {
            let newHouses = []
            action.payload.map(house => !newHouses.some(el => el.building == house.building) ? newHouses.push({building: house.building, id: house.houseId, streetName: house.streetName}) : '')
            return {...state, streetLoading: false, houses: [...state.houses, newHouses]}}
        case STREET_HOUSES_FAIL: 
            return {streetLoading: false, streetError: action.error}
        default: return state
    }
}