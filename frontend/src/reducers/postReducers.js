import {CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL} from '../constants/postConstants'
import {GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAIL} from '../constants/postConstants'
import {UPVOTE_POST_REQUEST, UPVOTE_POST_SUCCESS, UPVOTE_POST_FAIL} from '../constants/postConstants'
import {DOWNVOTE_POST_REQUEST, DOWNVOTE_POST_SUCCESS, DOWNVOTE_POST_FAIL} from '../constants/postConstants'
import {COMMENT_POST_REQUEST, COMMENT_POST_SUCCESS, COMMENT_POST_FAIL} from '../constants/postConstants'
import {SAVE_POST_REQUEST, SAVE_POST_SUCCESS, SAVE_POST_FAIL} from '../constants/postConstants'
import {UNSAVE_POST_REQUEST, UNSAVE_POST_SUCCESS, UNSAVE_POST_FAIL} from '../constants/postConstants'
import {GET_SAVED_POSTS_REQUEST, GET_SAVED_POSTS_SUCCESS, GET_SAVED_POSTS_FAIL} from '../constants/postConstants'
import {DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAIL} from '../constants/postConstants'

export const createPostReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
            return {loading: true}
        case CREATE_POST_SUCCESS:
            return {loading: false, post: action.payload}
        case CREATE_POST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const getPostsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return {loading: true}
        case GET_POSTS_SUCCESS:
            return {loading: false, posts: action.payload}
        case GET_POSTS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const upvotePostReducer = (state = {}, action) => {
    switch (action.type) {
        case UPVOTE_POST_REQUEST:
            return {loading: true}
        case UPVOTE_POST_SUCCESS:
            return {loading: false, post: action.payload}
        case UPVOTE_POST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const downvotePostReducer = (state = {}, action) => {
    switch (action.type) {
        case DOWNVOTE_POST_REQUEST:
            return {loading: true}
        case DOWNVOTE_POST_SUCCESS:
            return {loading: false, post: action.payload}
        case DOWNVOTE_POST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const commentPostReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT_POST_REQUEST:
            return {loading: true}
        case COMMENT_POST_SUCCESS:
            return {loading: false, comment: action.payload}
        case COMMENT_POST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const savePostReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_POST_REQUEST:
            return {loading: true, id: action.payload}
        case SAVE_POST_SUCCESS:
            return {loading: false, post: action.payload}
        case SAVE_POST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const unsavePostReducer = (state = {}, action) => {
    switch (action.type) {
        case UNSAVE_POST_REQUEST:
            return {loading: true, id: action.payload}
        case UNSAVE_POST_SUCCESS:
            return {loading: false, post: action.payload}
        case UNSAVE_POST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const getSavedPostsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SAVED_POSTS_REQUEST:
            return {loading: true}
        case GET_SAVED_POSTS_SUCCESS:
            return {loading: false, posts: action.payload}
        case GET_SAVED_POSTS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const deletePostReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_POST_REQUEST:
            return {loading: true}
        case DELETE_POST_SUCCESS:
            return {loading: false, success: action.payload}
        case DELETE_POST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
