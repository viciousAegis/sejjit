import axios from 'axios'
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants'

import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from '../constants/userConstants'

import { GET_AUTHOR_REQUEST, GET_AUTHOR_SUCCESS, GET_AUTHOR_FAIL } from '../constants/userConstants'

import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL } from '../constants/userConstants'

import { GET_FOLLOWERS_REQUEST, GET_FOLLOWERS_SUCCESS, GET_FOLLOWERS_FAIL } from '../constants/userConstants'

import { GET_FOLLOWING_REQUEST, GET_FOLLOWING_SUCCESS, GET_FOLLOWING_FAIL } from '../constants/userConstants'

import { USER_FOLLOW_REQUEST, USER_FOLLOW_SUCCESS, USER_FOLLOW_FAIL } from '../constants/userConstants'

import { USER_REMOVE_FOLLOWER_REQUEST, USER_REMOVE_FOLLOWER_SUCCESS, USER_REMOVE_FOLLOWER_FAIL } from '../constants/userConstants'

import { USER_UNFOLLOW_REQUEST, USER_UNFOLLOW_SUCCESS, USER_UNFOLLOW_FAIL } from '../constants/userConstants'

import { GET_BANNED_USERS_REQUEST, GET_BANNED_USERS_SUCCESS, GET_BANNED_USERS_FAIL } from '../constants/userConstants'

export const login = (username, password) => async (dispatch) => {

    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:4000/api/users/login',
            { username, password },
            config
        )

        localStorage.setItem("user", JSON.stringify(data));
        console.log(data)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('user')
    dispatch({ type: USER_LOGOUT })
}

export const register = (fname, lname, email, username, dob, contact, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:4000/api/users',
            { fname, lname, email, username, dob, contact, password },
            config
        )

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem("user", JSON.stringify(data));
        alert("User Registered Successfully")

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:4000/api/users/profile`,
            user,
            config
        )

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getUserProfile = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_AUTHOR_REQUEST });

        const { data } = await axios.get(
            `http://127.0.0.1:4000/api/users/${id}`
        )

        dispatch({ type: GET_AUTHOR_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: GET_AUTHOR_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getUsers = (userIds) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_USERS_REQUEST });

        console.log(userIds)

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.get(
            `http://127.0.0.1:4000/api/users/users`,
            { params: { userIds } },
            config
        )

        dispatch({ type: GET_USERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_USERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getBannedUsers = (sub_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_BANNED_USERS_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.get(
            `http://127.0.0.1:4000/api/users/users/b/${sub_id}`,
            config
        )

        dispatch({ type: GET_BANNED_USERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_BANNED_USERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const getFollowers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_FOLLOWERS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `http://127.0.0.1:4000/api/users/followers`,
            config
        )

        dispatch({ type: GET_FOLLOWERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_FOLLOWERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getFollowing = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_FOLLOWING_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `http://127.0.0.1:4000/api/users/following`,
            config
        )

        dispatch({ type: GET_FOLLOWING_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_FOLLOWING_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const followUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_FOLLOW_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.put(
            `http://127.0.0.1:4000/api/users/${id}`,
            { user_id: userInfo._id },
            config
        )

        dispatch({ type: USER_FOLLOW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_FOLLOW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const removeFollowerFromUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_REMOVE_FOLLOWER_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.delete(
            `http://127.0.0.1:4000/api/users/remove/${id}`,
            config
        )

        console.log(data)

        dispatch({ type: USER_REMOVE_FOLLOWER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_REMOVE_FOLLOWER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const removeFollowingFromUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UNFOLLOW_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.delete(
            `http://127.0.0.1:4000/api/users/unfollow/${id}`,
            config
        )

        dispatch({ type: USER_UNFOLLOW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_UNFOLLOW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}