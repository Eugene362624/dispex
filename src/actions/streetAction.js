import axios from "axios";
import { baseUrl } from "../config";
import { STREET_HOUSES_FAIL, STREET_HOUSES_REQUEST, STREET_HOUSES_SUCCESS } from "../constants/streetConst";

export const getHousesOnStreet = (id, name) => async (dispatch) => {
    dispatch({type: STREET_HOUSES_REQUEST})
    try {
        const {data} = await axios.get(baseUrl + `/HousingStock?streetId=${id}`)
        dispatch({type: STREET_HOUSES_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: STREET_HOUSES_FAIL, payload: error.message})
    }
}