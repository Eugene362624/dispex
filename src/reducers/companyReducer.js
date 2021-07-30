import { COMPANIES_NAMES_FAIL, COMPANIES_NAMES_REQUEST, COMPANIES_NAMES_SUCCESS, COMPANY_CLIENTS_FAIL, COMPANY_CLIENTS_REQUEST, COMPANY_CLIENTS_SUCCESS } from "../constants/companyConst";

export function getCompaniesReducer(state = {MC:[{}]}, action) {
    switch(action.type) {
        case COMPANIES_NAMES_REQUEST:
            return {loading: true}
        case COMPANIES_NAMES_SUCCESS:
            return {loading: false, MC: action.payload}
        case COMPANIES_NAMES_FAIL:
            return {loading: false, error: action.error}
        default: return state
    }
}

export function getCompanyReducer(state = {companyStreets: []}, action) {
    switch(action.type) {
        case COMPANY_CLIENTS_REQUEST: 
            return {companyLoading: true}
        case COMPANY_CLIENTS_SUCCESS: 
            let streets = []
            action.payload.map((e, i) => !streets.some(el => el.name == e.streetName) ? streets.push({name: e.streetName, id: e.streetId}) : '')
            return {companyLoading: false, companyStreets: streets, selectedCompany: action.selectedCompany}
        case COMPANY_CLIENTS_FAIL: 
            return {companyLoading: false, companyError: action.error}
        default: return state
    }
}