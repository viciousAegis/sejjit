
import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from './actions/userActions';
import { Alert, Spinner } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Loading from './Components/Loading';
import { getFollowers, getFollowing, removeFollowerFromUser, removeFollowingFromUser } from './actions/userActions';

const moment = require('moment');


function ProfileHighlight() {

    const [username, setUsername] = useState('');
    const [pic, setPic] = useState();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username);
            setPic(userInfo.pic);
        }
    })

    return (
        <div className='profile-highlight'>
            <img src={pic} alt="Admin" className="rounded mt-2 mb-0" width="150" />
            <span className='profile-name mt-0 mb-0'>{username}</span>
        </div>
    )
}

function UpdateUserInfo(props) {

    const user = props.user;

    const [username, setUsername] = useState(user.username);
    const [password, setPass] = useState('');
    const [fname, setFname] = useState(user.fname);
    const [lname, setLname] = useState(user.lname);
    const [email, setEmail] = useState(user.email);
    const [dob, setDob] = useState(user.dob.split('T')[0]);
    const [contact, setContact] = useState(user.contact);

    const dispatch = useDispatch();

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

    const handleEdit = () => {
        props.onChange(false);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submit');
        dispatch(updateUserProfile({
            fname, lname, email, username, dob, contact, password
        }));
        props.onChange(false);
    }

    return (
        <div className="card-body">
            <form onSubmit={submitHandler}>
                <div className="form-group-name row">
                    <div className="form-group mt-3 col-sm">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Jane"
                            value={fname}
                            onChange={e => setFname(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3 col-sm">
                        <label>Last Name</label>
                        <input
                            type="input"
                            className="form-control mt-1"
                            placeholder="e.g Doe"
                            value={lname}
                            onChange={e => setLname(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group mt-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Email Address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group mt-3">
                    <label>Contact Number</label>
                    <input
                        type="tel"
                        className="form-control mt-1"
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        className="form-control mt-1"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                    />
                </div>

                <div className="form-group mt-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control mt-1"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPass(e.target.value)}
                    />
                </div>
                <div className="row gap-2 mt-3 justify-content-between">
                    <div className="col-sm-4">
                        <button type="submit" className="btn btn-primary">
                            {!loading && <p className='m-0'>Confirm</p>}
                            {loading && <Loading />}
                        </button>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-end" onClick={handleEdit}>
                        <button type="close" className="btn btn-primary">
                            Close
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

function UserInfo(props) {
    const user = props.user;
    console.log(user);

    const handleEdit = () => {
        props.onChange(true);
    }

    const dob = moment(user.dob).format('YYYY-MM-DD');
    const age = moment().diff(dob, 'years');

    return (
        <div className="card-body">
            <div className="row">
                <div className="col-sm-4">
                    <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-8">
                    <p className="text-muted mb-0">{user.fname} {user.lname}</p>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-4">
                    <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-8">
                    <p className="text-muted mb-0">{user.email}</p>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-4">
                    <p className="mb-0">Contact</p>
                </div>
                <div className="col-sm-8">
                    <p className="text-muted mb-0">{user.contact}</p>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-4">
                    <p className="mb-0">Age</p>
                </div>
                <div className="col-sm-8">
                    <p className="text-muted mb-0">{age}</p>
                </div>
            </div>
            <hr />
            <div className="row mt-3 justify-content-end">
                <div className="col-sm-3 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary" onClick={handleEdit}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
}

const FollowerItem = ({ follower, setChangeSuccess }) => {

    const dispatch = useDispatch();
    const userRemoveFollower = useSelector(state => state.userRemoveFollower);

    const { loading, error, data } = userRemoveFollower;

    const handleRemove = () => {
        dispatch(removeFollowerFromUser(follower._id));
        console.log(follower._id);
    }

    useEffect(() => {
        if (data) {
            console.log(data);
            setChangeSuccess(true);
        }
    },[data])

    return (
        <li className='list-group-item' key={follower.username}>
            <div className='row justify-content-between'>
                <div className='col-4 text-muted'>
                    {follower.username}
                </div>
                <span className='col-3 remove-btn' onClick={handleRemove}>
                    Remove
                </span>
            </div>
        </li>
    )
}

const FollowingItem = ({ following, setChangeSuccess }) => {

    const dispatch = useDispatch();
    const userUnfollow = useSelector(state => state.userUnfollow);

    const { loading, error, data } = userUnfollow;

    const handleUnfollow = () => {
        dispatch(removeFollowingFromUser(following._id));
        console.log(following._id);
    }
    
    useEffect(() => {
        if (data) {
            console.log(data);
            setChangeSuccess(true);
        }
    },[data])

    return (
        <li className='list-group-item' key={following.username}>
            <div className='row justify-content-between'>
                <div className='col-4 text-muted'>
                    {following.username}
                </div>
                <span className='col-3 remove-btn' onClick={handleUnfollow}>
                    Unfollow
                </span>
            </div>
        </li>
    )
}

const Card = () => {
    const [selectedTab, setSelectedTab] = useState("followers");
    const followers = [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }];
    const following = [{ name: "User A" }, { name: "User B" }, { name: "User C" }];

    const [changeSuccess, setChangeSuccess] = useState(false);

    const dispatch = useDispatch();
    const userGetFollowers = useSelector(state => state.userGetFollowers);
    const { loading: loadingFollower, error: errorFollower, followers: followersList } = userGetFollowers;

    const userGetFollowing = useSelector(state => state.userGetFollowing);
    const { loading: loadingFollowing, error: errorFollowing, following: followingList } = userGetFollowing;

    useEffect(() => {
        dispatch(getFollowers());
        dispatch(getFollowing());
    }, [dispatch, changeSuccess]);

    return (
        <div style={{ backgroundColor: "white" }} >
            {followersList && followingList && (
                <>
                    <div
                        className="row justify-content-between"
                        style={{
                            borderStyle: "none none solid",
                            borderWidth: "3px",
                            borderColor: "#b8c1ec",
                        }}
                    >
                        <div
                            style={{
                                padding: "10px",
                                backgroundColor: selectedTab === "followers" ? "#b8c1ec" : "",
                                color: selectedTab === "followers" ? "white" : "",
                                cursor: "pointer",
                                borderRadius: "10px 0px 0px 0px",
                                fontSize: "20px",
                                alignItems: "center",
                            }}
                            onClick={() => setSelectedTab("followers")}

                            className='col-6 d-flex justify-content-between'
                        >
                            <p className='m-0'>Followers</p>
                            <Badge bg={selectedTab === "followers" ? "light" : "dark"} text={selectedTab === "followers" ? "dark" : "lighty"} alignItems="center">
                                {followersList.listToReturn.length}
                            </Badge>
                        </div>
                        <div
                            style={{
                                padding: "10px",
                                backgroundColor: selectedTab === "following" ? "#b8c1ec" : "",
                                color: selectedTab === "following" ? "white" : "",
                                cursor: "pointer",
                                borderRadius: "0px 10px 0px 0px",
                                fontSize: "20px",
                            }}
                            onClick={() => setSelectedTab("following")}
                            className='col-6 d-flex justify-content-between'
                        >
                            <p className='m-0'>Following</p>
                            <Badge bg={selectedTab === "following" ? "light" : "dark"} text={selectedTab === "following" ? "dark" : "lighty"} alignItems="center">
                                {followingList.listToReturn.length}
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <ul className='list-group list-group-flush'>
                            {selectedTab === "followers"
                                ? followersList.listToReturn.map((follower) => (
                                    <FollowerItem follower={follower}
                                        setChangeSuccess={setChangeSuccess}
                                    />
                                ))
                                : followingList.listToReturn.map((following) => (
                                    <FollowingItem following={following}
                                        setChangeSuccess={setChangeSuccess}
                                    />
                                ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

function Profile() {

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);

    const handleEdit = () => setEdit(true);
    const handleEditFalse = () => setEdit(false);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 d-flex justify-content-center align-self-center">
                    <div>
                        <div className="card mb-4 profile-details">
                            <div>
                                < ProfileHighlight />
                            </div>
                            {edit && <UpdateUserInfo edit={edit} onChange={handleEditFalse} user={userInfo} />}
                            {!edit && <UserInfo edit={edit} onChange={handleEdit} user={userInfo} />}
                        </div>
                        <div>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <Card />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 d-flex justify-content-center align-items-center">
                </div>
            </div>
        </div>
    )
}

export default function ProfilePage() {
    return (
        <div>
            <TopBar />
            <div className="Page-container">
                <Profile />
            </div>
        </div>
    )
}