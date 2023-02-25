import React, { useEffect } from "react"
import { useState } from "react"
import Login from "./GoogleLoginButton"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Alert, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { login, register } from "./actions/userActions"
import Loading from "./Components/Loading"
import { GiPointySword } from "react-icons/gi";


function InvalidLogin() {
    return (
        <div className="invalid-alert mt-3 mb-0" role="alert">
            Invalid username or password!
        </div>
    )
}

function LoginForm(props) {
    let [authMode, setAuthMode] = useState("login")

    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [contact, setContact] = useState('');

    const changeAuthMode = () => {
        setAuthMode(authMode === "login" ? "signup" : "login")
    }

    const navigate = useNavigate()


    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const userRegister = useSelector((state) => state.userRegister);
    const { loading: loading_r, error: error_r, userinfo: userInfo_r } = userRegister;

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/subsejjits")
        }
    }, [userInfo])

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/subsejjits")
        }
    }, [userInfo_r])


    const handleSubmit = async e => {
        e.preventDefault()

        dispatch(login(username, password));
    }

    const handleRegister = async e => {
        e.preventDefault()

        dispatch(register(fname, lname, email, username, dob, contact, password));
    }


    if (authMode === "login") {
        return (
            <form onSubmit={handleSubmit} className="Auth-form">
                <div className="form-header">
                    <h2 className="form-title">Login</h2>
                </div>
                <div className="form-content">
                    <div className="text-center">
                        Not registered yet?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign Up
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPass(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary"
                            disabled={username.length == 0 || password.length == 0}>
                            {!loading && <p className="m-0">Submit</p>}
                            {loading && <Loading />}
                        </button>
                    </div>
                    {error && <InvalidLogin />}
                    <div className="google_auth mt-3" align="center">
                        {/* <Login /> */}
                    </div>
                </div>
            </form>
        )
    }

    let submit_bool = username.length > 0 && password.length > 0 && fname.length > 0 && lname.length > 0 && email.length > 0 && dob.length > 0 && contact.length > 0

    return (
        <form className="Auth-form" onSubmit={handleRegister}>
            <div className="form-header">
                <h2 className="form-title">Sign Up</h2>
            </div>
            <div className="form-content">
                <div className="text-center">
                    Already registered?{" "}
                    <span className="link-primary" onClick={changeAuthMode}>
                        Login
                    </span>
                </div>
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
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control mt-1"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group-name row">
                    <div className="form-group mt-3 col-6">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            className="form-control mt-1"
                            value={dob}
                            onChange={e => setDob(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3 col-6">
                        <label>Contact Number</label>
                        <input
                            type="tel"
                            className="form-control mt-1"
                            value={contact}
                            onChange={e => setContact(e.target.value)}
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
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPass(e.target.value)}
                    />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary"
                        disabled={!submit_bool}>
                        {!loading_r && <p className="m-0">Submit</p>}
                        {loading_r && <Loading />}
                    </button>
                </div>
                <div className="mt-2">
                {error_r && <Alert variant="danger">{error_r}</Alert>}
                </div>
            </div>
        </form>
    )
}

function IntroParagraph() {
    return (
        <div className="intro-paragraph ">
            <h1 className="intro-title mb-4">Welcome to <span className="intro-title-highlight">Sejjit <GiPointySword /></span></h1>
            <p className="intro-text">
                Sejjit is a platform that allows you to connect with people around the world and share your ideas. build your own community and find others that spark your interest.
            </p>
        </div>
    )
}

export default function LoginScreen() {
    return (
        <div>
            <div className="Page-container-login">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-2 d-flex justify-content-center">
                            <IntroParagraph />
                        </div>
                        <div className="col-lg-6 mb-2 d-flex justify-content-center">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}