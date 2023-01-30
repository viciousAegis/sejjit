
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import TopBar from './TopBar';

function Profile() {

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);

    return (
        <div className="container">
            <div className="header container mt-4 p-3 rounded shadow">
                <div className="row">
                    <div className="col-12">
                        <h1>Profile</h1>
                    </div>
                </div>
                <hr />
                <div className="row content-container align-items-center">
                    <div className="img-container col-4 border border-4 shadow m-3 rounded border-info">
                        <img className="card-img-top" src={require("./logo512.png")} />
                    </div>
                    <div className="col"></div>
                    <div className="col-6 info-container m-3">
                        <div className="row user-email">
                            <div className="col">
                                <h5>Username</h5>
                                <span>admin</span>
                            </div>
                            <div className="col">
                                <h5>Password</h5>
                                <span>*******</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row user-info">
                            <div className="col">
                                <h5>First Name</h5>
                                <span>Admin</span>
                            </div>
                            <div className="col">
                                <h5>Last Name</h5>
                                <span>Admin</span>
                            </div>
                            <div className="col">
                                <h5>Age</h5>
                                <span>18</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row user-info2">
                            <div className="col">
                                <h5>Contact Number</h5>
                                <span>1234567890</span>
                            </div>
                            <div className="col">
                                <h5>Email</h5>
                                <span>admin@admin.com</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" >
                    <div className="col-4 offset-md-11">
                        <button className="btn btn-primary">Edit</button>
                    </div>
                </div>
            </div>

            <div className="profile-container container mt-4 p-0">
                <div className="row justify-content-center">
                    <div className="col-4 rounded shadow p-3">
                        <div className="row justify-content-center">
                            <h1 className="col-12">Followers</h1>

                            <button className="col-3 btn btn-outline-info btn-lg"
                                onClick={handleShow}>439</button>
                        </div>
                    </div>
                    <div className="col-4 rounded shadow p-3 offset-md-1">
                        <div className="row justify-content-center">
                            <h1 className="col-12">Following</h1>

                            <button type="button" className="col-3 btn btn-outline-info btn-lg"
                                onClick={handleShow1}>439</button>
                        </div>
                    </div>
                </div>
            </div>


            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Followers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <ListGroup>
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show1} onHide={handleClose1} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Following</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <ListGroup>
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose1}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default function ProfilePage() {
    return (
        <div>
            <TopBar />
            <Profile />
        </div>
    )
}