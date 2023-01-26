import React from "react"
import { useState } from "react"
import Login from "./GoogleLoginButton"
import { useNavigate } from "react-router-dom"
import TopBar from "./TopBar"

const checkAuth = (username, value2) => {
    if (username == "admin" && value2 == "admin") {
        return true
    } else {
        return false
    }
}

export default function LoginScreen(props) {
    let [authMode, setAuthMode] = useState("login")

    const navigate = useNavigate();

    const changeAuthMode = () => {
        setAuthMode(authMode === "login" ? "signup" : "login")
    }

    const handleSubmit = async e => {
        alert("Submitted")
        let res = checkAuth(username, password)
        if (res) {
            const user = {username, password}
            localStorage.setItem("user", JSON.stringify(user));
            alert(user.username + " " + user.password)
            navigate("/profile")
        } else {
            alert("Invalid username or password")
        }
    }

    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [value5, setValue5] = useState('');
    const [value6, setValue6] = useState('');
    const [value7, setValue7] = useState('');

    const handleChange = (event) => {
        setUsername(event.target.value);
    }
    const handleChange2 = (event) => {
        setPass(event.target.value);
    }
    const handleChange3 = (event) => {
        setValue3(event.target.value);
    }
    const handleChange4 = (event) => {
        setValue4(event.target.value);
    }
    const handleChange5 = (event) => {
        setValue5(event.target.value);
    }
    const handleChange6 = (event) => {
        setValue6(event.target.value);
    }
    const handleChange7 = (event) => {
        setValue7(event.target.value);
    }


    if (authMode === "login") {
        return (
            <div>
                <TopBar loginPage={true}/>
                <div className="Auth-form-container">
                    <form onSubmit={handleSubmit} className="Auth-form">
                        <div className="form-content">
                            <h2 className="form-title">Login</h2>
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
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={handleChange2}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary"
                                    disabled={username.length == 0 || password.length == 0}>
                                    Submit
                                </button>
                            </div>
                            <div className="google_auth mt-3" align="center">
                                {/* <Login /> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    let submit_bool = username.length > 0 && password.length > 0 && value3.length > 0 && value4.length > 0 && value5.length > 0 && value6.length > 0 && value7.length > 0

    return (
        <div>
            <TopBar />
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="form-content">
                        <h3 className="form-title">Sign In</h3>
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
                                    value={value3}
                                    onChange={handleChange3}
                                />
                            </div>
                            <div className="form-group mt-3 col-sm">
                                <label>Last Name</label>
                                <input
                                    type="input"
                                    className="form-control mt-1"
                                    placeholder="e.g Doe"
                                    value={value7}
                                    onChange={handleChange7}
                                />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                value={username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group-name row">
                            <div className="form-group mt-3 col-4">
                                <label>Age</label>
                                <input
                                    type="number"
                                    className="form-control mt-1"
                                    value={value4}
                                    onChange={handleChange4}
                                />
                            </div>
                            <div className="form-group mt-3 col-8">
                                <label>Contact Number</label>
                                <input
                                    type="tel"
                                    className="form-control mt-1"
                                    value={value5}
                                    onChange={handleChange5}
                                />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Email Address"
                                value={value6}
                                onChange={handleChange6}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Password"
                                value={password}
                                onChange={handleChange2}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary"
                                disabled={!submit_bool}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

