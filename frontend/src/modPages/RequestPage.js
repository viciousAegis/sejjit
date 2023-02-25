import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/userActions";
import { useEffect } from "react";
import Loading from "../Components/Loading";
import moment from "moment";
import { Button } from "react-bootstrap";
import { acceptFollow, rejectFollow } from "../actions/subActions";

const User = ({ user, sub_id, setUpdate }) => {

    const dispatch = useDispatch();
    const subAcceptFollow = useSelector((state) => state.subAcceptFollow);
    const { loading, id, error, success } = subAcceptFollow;
    const subRejectFollow = useSelector((state) => state.subRejectFollow);
    const { loading: loadingReject, id: idReject, error: errorReject, success: successReject } = subRejectFollow;

    const acceptFollowHandler = (user_id) => {
        dispatch(acceptFollow(sub_id, user_id));
    };

    const rejectFollowHandler = (user_id) => {
        dispatch(rejectFollow(sub_id, user_id));
    };

    useEffect(() => {
        if (success) {
            console.log(success);
            setUpdate(true);
        }
    }, [success]);

    useEffect(() => {
        if (successReject) {
            console.log(successReject);
            setUpdate(true);
        }
    }, [successReject]);

    return (
        <div className="container m-0 p-1">
            <div className="row">
                <div className="col-md-2">
                    <img src={user.pic} alt="profile_pic" className="w-100 mw-50" />
                </div>
                <div className="col-md-5">
                    <div className="row">
                        <div className="col-12">
                            <b>Username:</b> {user.username}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <b>Name:</b> {user.fname} {user.lname}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <b>Age:</b> {moment().diff(user.dob, "years")}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <b>Email:</b> {user.email}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <b>Phone:</b> {user.contact}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <Button variant="success" size="sm" block onClick={() => acceptFollowHandler(user._id)}>
                                {loading && <>
                                    {id && id === user._id ? <Loading /> : <span>Accept</span>}
                                </>
                                }
                                {!id && id !== user._id ? <span>Accept</span> : null}
                            </Button>
                        </div>
                        <div className="col-6">
                            <Button variant="danger" size="sm" block onClick={() => rejectFollowHandler(user._id)}>
                                {loadingReject && <>
                                    {idReject && idReject === user._id ? <Loading /> : <span>Reject</span>}
                                </>
                                }
                                {!idReject && idReject !== user._id ? <span>Reject</span> : null}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RequestPage({ sub, update, setUpdate }) {

    const dispatch = useDispatch();
    const userGetAll = useSelector((state) => state.userGetAll);
    const { users, loading, error } = userGetAll;

    useEffect(() => {
        dispatch(getUsers(sub.follow_requests));
    }, [dispatch, sub]);

    return (
        <div >
            {loading && <Loading />}
            {users &&
                <ul className="list-group list-group-flush">
                    {users.users.map(user =>
                        <li className="list-group-item">
                            <User
                                user={user}
                                sub_id={sub._id}
                                setUpdate={setUpdate}
                            />
                        </li>)}
                </ul>}
        </div>
    );
}