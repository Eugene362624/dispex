import axios from "axios";
import { baseUrl } from "../config";
import { HOUSE_FLATS_FAIL, HOUSE_FLATS_REQUEST, HOUSE_FLATS_SUCCESS } from "../constants/houseConst";

export const getFlatsInHouse = (id) => async (dispatch) => {
    dispatch({type: HOUSE_FLATS_REQUEST})
    try {
        console.log("!!")
        const {data} = await axios.get(baseUrl + `/HousingStock?houseId=${id}`)
        dispatch({type: HOUSE_FLATS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: HOUSE_FLATS_FAIL, payload: error.message})
    }
}