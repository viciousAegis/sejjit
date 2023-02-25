import {CREATE_REPORT_REQUEST, CREATE_REPORT_SUCCESS, CREATE_REPORT_FAIL} from '../constants/reportConstants'
import {GET_REPORTS_REQUEST, GET_REPORTS_SUCCESS, GET_REPORTS_FAIL} from '../constants/reportConstants'
import {BLOCK_USER_REQUEST, BLOCK_USER_SUCCESS, BLOCK_USER_FAIL} from '../constants/reportConstants'
import {IGNORE_REPORT_REQUEST, IGNORE_REPORT_SUCCESS, IGNORE_REPORT_FAIL} from '../constants/reportConstants'
import {DELETE_REPORT_REQUEST, DELETE_REPORT_SUCCESS, DELETE_REPORT_FAIL} from '../constants/reportConstants'

export const createReportReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REPORT_REQUEST:
            return {loading: true, id: action.payload}
        case CREATE_REPORT_SUCCESS:
            return {loading: false, report: action.payload}
        case CREATE_REPORT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const getReportsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_REPORTS_REQUEST:
            return {loading: true}
        case GET_REPORTS_SUCCESS:
            return {loading: false, reports: action.payload}
        case GET_REPORTS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const blockUserReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOCK_USER_REQUEST:
            return {loading: true, id: action.payload}
        case BLOCK_USER_SUCCESS:
            return {loading: false, success: true}
        case BLOCK_USER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const ignoreReportReducer = (state = {}, action) => {
    switch (action.type) {
        case IGNORE_REPORT_REQUEST:
            return {loading: true, id: action.payload}
        case IGNORE_REPORT_SUCCESS:
            return {loading: false, success: true}
        case IGNORE_REPORT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const deleteReportReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REPORT_REQUEST:
            return {loading: true, id: action.payload}
        case DELETE_REPORT_SUCCESS:
            return {loading: false, success: true}
        case DELETE_REPORT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}