import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom"

const checkLogin = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        return foundUser
    }
    return null
}

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!checkLogin()) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children

};

export default ProtectedRoute;