
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import TopBar from './TopBar';

function UserInfo() {
    return(
        <div className="card-body">
        <div className="row">
            <div className="col-sm-4">
                <p className="mb-0">Full Name</p>
            </div>
            <div className="col-sm-8">
                <p className="text-muted mb-0">Johnatan Smith</p>
            </div>
        </div>
        <hr />
        <div className="row">
            <div className="col-sm-4">
                <p className="mb-0">Email</p>
            </div>
            <div className="col-sm-8">
                <p className="text-muted mb-0">example@example.com</p>
            </div>
        </div>
        <hr />
        <div className="row">
            <div className="col-sm-4">
                <p className="mb-0">Phone</p>
            </div>
            <div className="col-sm-8">
                <p className="text-muted mb-0">(097) 234-5678</p>
            </div>
        </div>
        <hr />
        <div className="row">
            <div className="col-sm-4">
                <p className="mb-0">Mobile</p>
            </div>
            <div className="col-sm-8">
                <p className="text-muted mb-0">(098) 765-4321</p>
            </div>
        </div>
        <hr />
        <div className="row">
            <div className="col-sm-4">
                <p className="mb-0">Address</p>
            </div>
            <div className="col-sm-8">
                <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
            </div>
        </div>
    </div>
    )
}

function FollowersCardPart(props) {
    const handleShow = () => {
        props.onChange(true);
    }

    return (
        <div className="row justify-content-between">
            <div className="col-4">
                <p className='card-heading'>
                    Followers
                </p>
            </div>
            <div className="col-3 d-flex justify-content-center">
                <button onClick={handleShow} className='btn follow-number'>
                    1234
                </button>
            </div>
        </div>
    )
}

function FollowingCardPart(props) {
    const handleShow = () => {
        props.onChange(true);
    }

    return (
        <div className="row justify-content-between">
            <div className="col-4">
                <p className='card-heading'>
                    Following
                </p>
            </div>
            <div className="col-3 d-flex justify-content-center">
                <button onClick={handleShow} className='btn follow-number' >
                    1234
                </button>
            </div>
        </div>
    )
}

function FollowerList(props) {

    const handleClose = () => {
        props.onChange(false);
    }

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-4 d-flex justify-content-center">
                            <p className='card-heading'>
                                Followers
                            </p>
                        </div>
                        <div className="col-3 d-flex justify-content-center">
                            <button className='btn btn-outline-primary close-button' onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    lorem ipsom
                </div>
            </div>
        </div>
    )
}

function FollowingList(props) {

    const handleClose = () => {
        props.onChange(false);
    }

    return (
        <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-4 d-flex justify-content-center">
                            <p className='card-heading'>
                                Following
                            </p>
                        </div>
                        <div className="col-3 d-flex justify-content-center">
                            <button className='btn btn-outline-primary close-button' onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    lorem ipsom
                </div>
            </div>
    )
}

function Profile() {

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 d-flex justify-content-center align-self-center">
                    <div>
                        <div className='profile-highlight'>
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                            <span className='profile-name mb-3'>Akshit Sinha</span>
                        </div>
                        <div className="card mb-4 profile-details">
                            <UserInfo />
                        </div>
                        <div>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <FollowersCardPart show={show} onChange={handleShow} />
                                    <hr />
                                    <FollowingCardPart show={show1} onChange={handleShow1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 d-flex justify-content-center align-items-center">
                    <div className='lists'>
                        {show && <FollowerList show={show} onChange={handleClose} />}
                        {show1 && <FollowingList show={show1} onChange={handleClose1} />}
                    </div>
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