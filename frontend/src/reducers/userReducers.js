import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, } from '../constants/userConstants'

import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants'

import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from '../constants/userConstants'

import { GET_AUTHOR_REQUEST, GET_AUTHOR_SUCCESS, GET_AUTHOR_FAIL } from '../constants/userConstants'

import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL } from '../constants/userConstants'

import { GET_FOLLOWERS_REQUEST, GET_FOLLOWERS_SUCCESS, GET_FOLLOWERS_FAIL } from '../constants/userConstants'

import { GET_FOLLOWING_REQUEST, GET_FOLLOWING_SUCCESS, GET_FOLLOWING_FAIL } from '../constants/userConstants'

import { USER_FOLLOW_REQUEST, USER_FOLLOW_SUCCESS, USER_FOLLOW_FAIL } from '../constants/userConstants'

import { USER_REMOVE_FOLLOWER_REQUEST, USER_REMOVE_FOLLOWER_SUCCESS, USER_REMOVE_FOLLOWER_FAIL } from '../constants/userConstants'

import { USER_UNFOLLOW_REQUEST, USER_UNFOLLOW_SUCCESS, USER_UNFOLLOW_FAIL } from '../constants/userConstants'

import { GET_BANNED_USERS_REQUEST, GET_BANNED_USERS_SUCCESS, GET_BANNED_USERS_FAIL } from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT: 
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false }
        default:
            return state
    }
}

export const userGetReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_AUTHOR_REQUEST:
            return { loading: true }
        case GET_AUTHOR_SUCCESS:
            return { loading: false, author: action.payload }
        case GET_AUTHOR_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userGetAllReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return { loading: true }
        case GET_USERS_SUCCESS:
            return { loading: false, users: action.payload }
        case GET_USERS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userGetFollowersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_FOLLOWERS_REQUEST:
            return { loading: true }
        case GET_FOLLOWERS_SUCCESS:
            return { loading: false, followers: action.payload }
        case GET_FOLLOWERS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userGetFollowingReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_FOLLOWING_REQUEST:
            return { loading: true }
        case GET_FOLLOWING_SUCCESS:
            return { loading: false, following: action.payload }
        case GET_FOLLOWING_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const userFollowReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_FOLLOW_REQUEST:
            return { loading: true }
        case USER_FOLLOW_SUCCESS:
            return { loading: false, userInfoCombo: action.payload, success: true }
        case USER_FOLLOW_FAIL:
            return { loading: false, error: action.payload, success: false }
        default:
            return state
    }
}

export const userRemoveFollowerReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REMOVE_FOLLOWER_REQUEST:
            return { loading: true }
        case USER_REMOVE_FOLLOWER_SUCCESS:
            return { loading: false, data: action.payload}
        case USER_REMOVE_FOLLOWER_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const userUnfollowReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UNFOLLOW_REQUEST:
            return { loading: true }
        case USER_UNFOLLOW_SUCCESS:
            return { loading: false, data: action.payload}
        case USER_UNFOLLOW_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const userGetBannedReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BANNED_USERS_REQUEST:
            return { loading: true }
        case GET_BANNED_USERS_SUCCESS:
            return { loading: false, bannedUsers: action.payload }
        case GET_BANNED_USERS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}