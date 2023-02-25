import axios from "axios";

import { CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL } from "../constants/postConstants";
import { GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAIL } from "../constants/postConstants";
import { UPVOTE_POST_REQUEST, UPVOTE_POST_SUCCESS, UPVOTE_POST_FAIL } from "../constants/postConstants";
import { DOWNVOTE_POST_REQUEST, DOWNVOTE_POST_SUCCESS, DOWNVOTE_POST_FAIL } from "../constants/postConstants";
import { COMMENT_POST_REQUEST, COMMENT_POST_SUCCESS, COMMENT_POST_FAIL } from "../constants/postConstants";
import { SAVE_POST_REQUEST, SAVE_POST_SUCCESS, SAVE_POST_FAIL } from "../constants/postConstants";
import { UNSAVE_POST_REQUEST, UNSAVE_POST_SUCCESS, UNSAVE_POST_FAIL } from "../constants/postConstants";
import { GET_SAVED_POSTS_REQUEST, GET_SAVED_POSTS_SUCCESS, GET_SAVED_POSTS_FAIL } from "../constants/postConstants";
import { DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAIL } from "../constants/postConstants";

export const createPost = (title, content, sub) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_POST_REQUEST });

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
            "http://127.0.0.1:4000/api/posts/create",
            { title, content, posted_by: userInfo._id, sub },
            config
        );

        dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const getPosts = (sub) => async (dispatch) => {
    try {
        dispatch({ type: GET_POSTS_REQUEST });

        const { data } = await axios.get(
            `http://127.0.0.1:4000/api/posts/${sub}`
        );

        dispatch({ type: GET_POSTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_POSTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const upvotePost = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPVOTE_POST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const { data } = await axios.put(
            `http://127.0.0.1:4000/api/posts/upvote/${id}`,
            { user_id: userInfo._id }
        )

        dispatch({ type: UPVOTE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPVOTE_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const downvotePost = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DOWNVOTE_POST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const { data } = await axios.put(
            `http://127.0.0.1:4000/api/posts/downvote/${id}`,
            { user_id: userInfo._id }
        )

        dispatch({ type: DOWNVOTE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DOWNVOTE_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const commentPost = (id, content) => async (dispatch, getState) => {
    try {
        dispatch({ type: COMMENT_POST_REQUEST });

        console.log(id, content);

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:4000/api/posts/comment/${id}`,
            { comment: content },
            config
        )

        dispatch({ type: COMMENT_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COMMENT_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const savePost = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SAVE_POST_REQUEST, payload: id });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:4000/api/posts/save/${id}`,
            {},
            config
        )

        dispatch({ type: SAVE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SAVE_POST_FAIL,
            payload: [error.response && error.response.data.message ? error.response.data.message : error.message, id]
        });
    }
}

export const unsavePost = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: UNSAVE_POST_REQUEST, payload: id });
        
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.delete(
            `http://127.0.0.1:4000/api/posts/unsave/${id}`,
            config
        )

        dispatch({ type: UNSAVE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UNSAVE_POST_FAIL,
            payload: [error.response && error.response.data.message ? error.response.data.message : error.message, id]
        });
    }
}


export const getSavedPosts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_SAVED_POSTS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `http://127.0.0.1:4000/api/posts/saved`,
            config
        )

        dispatch({ type: GET_SAVED_POSTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_SAVED_POSTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const deletePost = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_POST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} =  await axios.delete(
            `http://127.0.0.1:4000/api/posts/delete/${id}`,
            config
        )

        dispatch({ type: DELETE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}