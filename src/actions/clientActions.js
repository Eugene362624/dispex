import axios from "axios";
import { baseUrl } from "../config";
import { ADD_CLIENT_FAIL, ADD_CLIENT_REQUEST, ADD_CLIENT_SUCCESS, DELETE_CLIENT_FAIL, DELETE_CLIENT_REQUEST, DELETE_CLIENT_SUCCESS } from "../constants/clientConst";

export const addClientAction = (name, phone, email) => async (dispatch) => {
    dispatch({type: ADD_CLIENT_REQUEST})
    try {
        await axios.post(baseUrl + `/HousingStock/client`, {
            Name: name,
            Phone: phone,
            Email: email
        })
        .then(res => alert("id: " + res.data.id))
        dispatch({type: ADD_CLIENT_SUCCESS})
    } catch (error) {
        dispatch({type: ADD_CLIENT_FAIL, payload: error.message})
    }
}

export const deleteClientAction = (id) => async (dispatch) => {
    dispatch({type: DELETE_CLIENT_REQUEST})
    try {
        await axios.delete(baseUrl + `/HousingStock/bind_client/${id}`)
        .then(res => alert(JSON.stringify(res)))
        dispatch({type: DELETE_CLIENT_SUCCESS})
    } catch (error) {
        dispatch({type: DELETE_CLIENT_FAIL, payload: error.message})
    }
}