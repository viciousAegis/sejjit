import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getBannedUsers } from "../actions/userActions";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import moment from "moment";

const User = ({ user, banned }) => {
    return (
        <div className="container m-0 p-1"
            style={{
                //pastel red: #ffcccc
                backgroundColor: banned ? "#ffcccc" : "#ffffff",
                color: banned ? "#ff0000" : "#000000"
            }}
        >
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
                </div>
            </div>
        </div>)
}

export default function UsersPage({ sub }) {
    const dispatch = useDispatch();

    const userGetAll = useSelector((state) => state.userGetAll);
    const { users, loading, error } = userGetAll;

    const userGetBanned = useSelector((state) => state.userGetBanned);
    const { bannedUsers, loading: loadingBanned, error: errorBanned } = userGetBanned;

    useEffect(() => {
        dispatch(getUsers(sub.followers));
        dispatch(getBannedUsers(sub._id));
    }, [dispatch, sub]);

    if(bannedUsers) {
        console.log(bannedUsers);
    }

    return (
        <div >
            {loading && <Loading />}
            {users &&
                <ul className="list-group list-group-flush">
                    {users.users.map(user =>
                        <li className="list-group-item">
                            <User user={user}
                                banned={false}
                            />
                        </li>
                    )}
                </ul>}
            <hr />
            {bannedUsers &&
                <ul className="list-group list-group-flush">
                    {bannedUsers.blockedUsers.map(user =>
                        <li className="list-group-item">
                            <User user={user} banned={true} />
                        </li>
                    )}
                </ul>}
        </div>
    );
}