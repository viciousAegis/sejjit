import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userGetReducer, userLoginReducer, userRegisterReducer, userUpdateReducer, userGetAllReducer, userGetFollowersReducer, userGetFollowingReducer, userFollowReducer, userRemoveFollowerReducer, userUnfollowReducer, userGetBannedReducer } from './reducers/userReducers';
import { subRegisterReducer, getAllMySubsReducer, subDeleteReducer, getAllSubsReducer, getOneSubReducer, requestFollowReducer, acceptFollowReducer, getNumPostsReducer, leaveSubReducer, rejectFollowReducer } from './reducers/subReducers';
import { createPostReducer, getPostsReducer, upvotePostReducer, downvotePostReducer, commentPostReducer, savePostReducer, unsavePostReducer, getSavedPostsReducer, deletePostReducer } from './reducers/postReducers';
import { createReportReducer, getReportsReducer, blockUserReducer, ignoreReportReducer, deleteReportReducer } from './reducers/reportReducers';

const reducers = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userGet: userGetReducer,
    userFollow: userFollowReducer,
    userGetFollowers: userGetFollowersReducer,
    userGetFollowing: userGetFollowingReducer,
    userRemoveFollower: userRemoveFollowerReducer,
    userUnfollow: userUnfollowReducer,
    userGetAll: userGetAllReducer,
    userGetBanned: userGetBannedReducer,

    subRegister: subRegisterReducer,
    subGetAll: getAllMySubsReducer,
    subDelete: subDeleteReducer,
    subGetAllPublic: getAllSubsReducer,
    subGetOne: getOneSubReducer,
    subRequestFollow: requestFollowReducer,
    subAcceptFollow: acceptFollowReducer,
    subGetNumPosts: getNumPostsReducer,
    subLeave: leaveSubReducer,
    subRejectFollow: rejectFollowReducer,

    postCreate: createPostReducer,
    postsGetBySub: getPostsReducer,
    postUpvote: upvotePostReducer,
    postDownvote: downvotePostReducer,
    postComment: commentPostReducer,
    postSave: savePostReducer,
    postUnsave: unsavePostReducer,
    postsGetSaved: getSavedPostsReducer,
    postDelete: deletePostReducer,

    reportCreate: createReportReducer,
    reportsGet: getReportsReducer,
    reportBlockUser: blockUserReducer,
    reportIgnore: ignoreReportReducer,
    reportDelete: deleteReportReducer,
});

const userInfoFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;