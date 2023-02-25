import { SUB_REGISTER_REQUEST, SUB_REGISTER_SUCCESS, SUB_REGISTER_FAIL } from '../constants/subConstants'

import { MY_SUBS_GET_FAIL, MY_SUBS_GET_REQUEST, MY_SUBS_GET_SUCCESS } from '../constants/subConstants'

import { SUBS_GET_REQUEST, SUBS_GET_SUCCESS, SUBS_GET_FAIL } from '../constants/subConstants'

import { SUB_DELETE_REQUEST, SUB_DELETE_SUCCESS, SUB_DELETE_FAIL } from '../constants/subConstants'

import { ONE_SUB_GET_REQUEST, ONE_SUB_GET_SUCCESS, ONE_SUB_GET_FAIL } from '../constants/subConstants'

import { SUB_REQUEST_FOLLOW_REQUEST, SUB_REQUEST_FOLLOW_SUCCESS, SUB_REQUEST_FOLLOW_FAIL } from '../constants/subConstants'

import {SUB_ACCEPT_FOLLOW_REQUEST, SUB_ACCEPT_FOLLOW_SUCCESS, SUB_ACCEPT_FOLLOW_FAIL} from '../constants/subConstants'

import {GET_NUM_POSTS_REQUEST, GET_NUM_POSTS_SUCCESS, GET_NUM_POSTS_FAIL} from '../constants/subConstants'

import {SUB_LEAVE_REQUEST, SUB_LEAVE_SUCCESS, SUB_LEAVE_FAIL} from '../constants/subConstants'

import {REJECT_FOLLOW_REQUEST, REJECT_FOLLOW_SUCCESS, REJECT_FOLLOW_FAIL} from '../constants/subConstants'

export const subRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case SUB_REGISTER_REQUEST:
            return { loading: true }
        case SUB_REGISTER_SUCCESS:
            return { loading: false, subInfo: action.payload }
        case SUB_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getOneSubReducer = (state = {}, action) => {
    switch (action.type) {
        case ONE_SUB_GET_REQUEST:
            return { loading: true }
        case ONE_SUB_GET_SUCCESS:
            return { loading: false, sub: action.payload }
        case ONE_SUB_GET_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getAllMySubsReducer = (state = {}, action) => {
    switch (action.type) {
        case MY_SUBS_GET_REQUEST:
            return { loading: true }
        case MY_SUBS_GET_SUCCESS:
            return { loading: false, subs: action.payload }
        case MY_SUBS_GET_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getAllSubsReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBS_GET_REQUEST:
            return { loading: true }
        case SUBS_GET_SUCCESS:
            return { loading: false, subs: action.payload }
        case SUBS_GET_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const subDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SUB_DELETE_REQUEST:
            return { loading: true }
        case SUB_DELETE_SUCCESS:
            return { loading: false, success: action.payload }
        case SUB_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const requestFollowReducer = (state = {}, action) => {
    switch (action.type) {
        case SUB_REQUEST_FOLLOW_REQUEST:
            return { loading: true, id: action.payload }
        case SUB_REQUEST_FOLLOW_SUCCESS:
            return { loading: false, success: action.payload }
        case SUB_REQUEST_FOLLOW_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const acceptFollowReducer = (state = {}, action) => {
    switch (action.type) {
        case SUB_ACCEPT_FOLLOW_REQUEST:
            return { loading: true}
        case SUB_ACCEPT_FOLLOW_SUCCESS:
            return { loading: false, success: action.payload }
        case SUB_ACCEPT_FOLLOW_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getNumPostsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_NUM_POSTS_REQUEST:
            return { loading: true}
        case GET_NUM_POSTS_SUCCESS:
            return { loading: false, numPosts: action.payload }
        case GET_NUM_POSTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const leaveSubReducer = (state = {}, action) => {
    switch (action.type) {
        case SUB_LEAVE_REQUEST:
            return { loading: true, id: action.payload}
        case SUB_LEAVE_SUCCESS:
            return { loading: false, success: action.payload }
        case SUB_LEAVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const rejectFollowReducer = (state = {}, action) => {
    switch (action.type) {
        case REJECT_FOLLOW_REQUEST:
            return { loading: true, id: action.payload}
        case REJECT_FOLLOW_SUCCESS:
            return { loading: false, success: action.payload }
        case REJECT_FOLLOW_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
