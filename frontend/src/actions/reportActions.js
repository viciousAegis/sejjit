import axios from "axios";

import { CREATE_REPORT_REQUEST, CREATE_REPORT_SUCCESS, CREATE_REPORT_FAIL, IGNORE_REPORT_REQUEST, IGNORE_REPORT_SUCCESS, IGNORE_REPORT_FAIL } from "../constants/reportConstants";
import { GET_REPORTS_REQUEST, GET_REPORTS_SUCCESS, GET_REPORTS_FAIL } from "../constants/reportConstants";
import { BLOCK_USER_REQUEST, BLOCK_USER_SUCCESS, BLOCK_USER_FAIL } from "../constants/reportConstants";
import { DELETE_REPORT_REQUEST, DELETE_REPORT_SUCCESS, DELETE_REPORT_FAIL } from "../constants/reportConstants";

export const createReport = (post_id, concern) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_REPORT_REQUEST, payload: post_id });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `http://127.0.0.1:4000/api/reports/create/${post_id}`,
            { concern },
            config
        );

        dispatch({ type: CREATE_REPORT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_REPORT_FAIL,
            payload: [error.response && error.response.data.message ? error.response.data.message : error.message, post_id]
        });
    }
};

export const getReports = (sub) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_REPORTS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `http://127.0.0.1:4000/api/reports/${sub}`,
            config
        );

        dispatch({ type: GET_REPORTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_REPORTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const blockUser = (sub_id, user_id, report_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BLOCK_USER_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `http://127.0.0.1:4000/api/reports/block/${sub_id}`,
            { user_id, report_id },
            config
        );

        dispatch({ type: BLOCK_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BLOCK_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const ignoreReport = (report_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: IGNORE_REPORT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `http://127.0.0.1:4000/api/reports/ignore/${report_id}`,
            {},
            config
        );
        
        dispatch({ type: IGNORE_REPORT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: IGNORE_REPORT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deleteReport = (report_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_REPORT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(
            `http://127.0.0.1:4000/api/reports/delete/${report_id}`,
            config
        );

        dispatch({ type: DELETE_REPORT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_REPORT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};