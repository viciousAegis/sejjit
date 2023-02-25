import axios from "axios";
import { SUB_REGISTER_REQUEST, SUB_REGISTER_SUCCESS, SUB_REGISTER_FAIL } from "../constants/subConstants";
import { MY_SUBS_GET_FAIL, MY_SUBS_GET_REQUEST, MY_SUBS_GET_SUCCESS } from "../constants/subConstants";
import { SUB_DELETE_REQUEST, SUB_DELETE_SUCCESS, SUB_DELETE_FAIL } from "../constants/subConstants";
import { SUBS_GET_REQUEST, SUBS_GET_SUCCESS, SUBS_GET_FAIL } from "../constants/subConstants";
import { ONE_SUB_GET_REQUEST, ONE_SUB_GET_SUCCESS, ONE_SUB_GET_FAIL } from "../constants/subConstants";
import { SUB_REQUEST_FOLLOW_REQUEST, SUB_REQUEST_FOLLOW_SUCCESS, SUB_REQUEST_FOLLOW_FAIL } from "../constants/subConstants";
import { SUB_ACCEPT_FOLLOW_REQUEST, SUB_ACCEPT_FOLLOW_SUCCESS, SUB_ACCEPT_FOLLOW_FAIL } from "../constants/subConstants";
import { GET_NUM_POSTS_REQUEST, GET_NUM_POSTS_SUCCESS, GET_NUM_POSTS_FAIL } from "../constants/subConstants";
import { SUB_LEAVE_REQUEST, SUB_LEAVE_SUCCESS, SUB_LEAVE_FAIL } from "../constants/subConstants";
import { REJECT_FOLLOW_REQUEST, REJECT_FOLLOW_SUCCESS, REJECT_FOLLOW_FAIL } from "../constants/subConstants";

export const subRegister = (name, description, tags, banned_words) => async (dispatch, getState) => {
    try {
        dispatch({ type: SUB_REGISTER_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.post(
            "http://127.0.0.1:4000/api/subsejjits/create",
            { name, description, moderator: userInfo._id, tags, banned_words },
            config
        );

        dispatch({ type: SUB_REGISTER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: SUB_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const getOneSub = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ONE_SUB_GET_REQUEST });

        const { data } = await axios.get(
            `http://127.0.0.1:4000/api/subsejjits/${id}`
        );

        dispatch({ type: ONE_SUB_GET_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: ONE_SUB_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const getAllMySubs = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_SUBS_GET_REQUEST });


        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.get(
            "http://127.0.0.1:4000/api/subsejjits/subs",
            config
        );

        dispatch({ type: MY_SUBS_GET_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: MY_SUBS_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const deleteSub = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SUB_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.delete(
            `http://127.0.0.1:4000/api/subsejjits/${id}`, config
        );

        dispatch({ type: SUB_DELETE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: SUB_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const getAllSubs = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SUBS_GET_REQUEST });

        const { data } = await axios.get(
            "http://127.0.0.1:4000/api/subsejjits/"
        );

        dispatch({ type: SUBS_GET_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: SUBS_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const requestFollow = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SUB_REQUEST_FOLLOW_REQUEST, payload: id });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.put(
            `http://127.0.0.1:4000/api/subsejjits/request/${id}`, {}, config
        );

        dispatch({ type: SUB_REQUEST_FOLLOW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SUB_REQUEST_FOLLOW_FAIL,
            payload: [(error.response && error.response.data.message ? error.response.data.message : error.message), id]
        });
    }
}

export const acceptFollow = (sub_id, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SUB_ACCEPT_FOLLOW_REQUEST, payload: id });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const { data } = await axios.put(
            `http://127.0.0.1:4000/api/subsejjits/follow/${sub_id}`,
            { user_id: id },
            config
        );

        dispatch({ type: SUB_ACCEPT_FOLLOW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SUB_ACCEPT_FOLLOW_FAIL,
            payload: [error.response && error.response.data.message ? error.response.data.message : error.message, id]
        });
    }
}

export const getNumPosts = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_NUM_POSTS_REQUEST });

        const { data } = await axios.get(
            `http://127.0.0.1:4000/api/subsejjits/posts/${id}`
        );

        dispatch({ type: GET_NUM_POSTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_NUM_POSTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const leaveSub = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SUB_LEAVE_REQUEST, payload: id });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.put(
            `http://127.0.0.1:4000/api/subsejjits/unfollow/${id}`, {}, config
        );

        dispatch({ type: SUB_LEAVE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SUB_LEAVE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const rejectFollow = (sub_id, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: REJECT_FOLLOW_REQUEST, payload: id });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.put(
            `http://127.0.0.1:4000/api/subsejjits/reject/${sub_id}`,
            { user_id: id },
            config
        );

        dispatch({ type: REJECT_FOLLOW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REJECT_FOLLOW_FAIL,
            payload: [error.response && error.response.data.message ? error.response.data.message : error.message, id]
        });
    }
}
