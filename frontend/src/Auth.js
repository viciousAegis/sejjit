import React from "react"
import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"

export default function Auth(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    alert("auth user: " + user.username)

    if (user.username) {
        return (
            <Navigate to="/profile" replace/>
        )
    }

    return (
            <Navigate to="/login" replace/>
        )
}

