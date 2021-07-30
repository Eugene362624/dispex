import { HOUSE_FLATS_FAIL, HOUSE_FLATS_REQUEST, HOUSE_FLATS_SUCCESS } from "../constants/houseConst"

const initialState = {
    flats: [],
    flatsLoading: true
  }

export function getHouseReducer(state = initialState, action) {
    switch(action.type) {
        case HOUSE_FLATS_REQUEST: 
            return {...state, flatsLoading: true}
        case HOUSE_FLATS_SUCCESS: {
            console.log(state)
            let newFlats = []
            action.payload.map(flat => newFlats.push({clients: flat.clients, building: flat.building, flat: flat.flat, addressId: flat.addressId, houseId: flat.houseId}))
            return {...state, flats: [...state.flats, newFlats], flatsLoading: false}
        }
            
        case HOUSE_FLATS_FAIL: 
            return {flatsLoading: false, flatsError: action.error}
        default: return state
    }
}