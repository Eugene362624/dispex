import axios from 'axios'
import { COMPANIES_NAMES_FAIL, COMPANIES_NAMES_REQUEST, COMPANIES_NAMES_SUCCESS, COMPANY_CLIENTS_FAIL, COMPANY_CLIENTS_REQUEST, COMPANY_CLIENTS_SUCCESS } from '../constants/companyConst'
import { baseUrl } from '../config'

export const getListOfCompanies = () => async (dispatch) => {
    dispatch({type: COMPANIES_NAMES_REQUEST})
    try {
        const {data} = await axios.get(baseUrl + '/Request/companies')
        dispatch({type: COMPANIES_NAMES_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: COMPANIES_NAMES_FAIL, payload: error.message})
    }
}

export const getCompanyClients = (id) => async (dispatch) => {
    dispatch({type: COMPANY_CLIENTS_REQUEST})
    try {
        const {data} = await axios.get(baseUrl + `/HousingStock?companyId=${id}`)
        dispatch({type: COMPANY_CLIENTS_SUCCESS, payload: data, selectedCompany: id, noData: data.length>0? false: true})
    } catch (error) {
        dispatch({type: COMPANY_CLIENTS_FAIL, payload: error.message})
    }
}