import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function TopBar() {
    let navigate = useNavigate();
      // logout the user
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
        alert("Successfully logged out")
    };

    const location = useLocation();
    let isLoginPage = false
    if(location.pathname === "/login") {
        isLoginPage = true
    }

    return (
        <div className="top-bar">
            <h1 className="top-bar-title">SEJJIT</h1>

            {!isLoginPage && <button className="top-bar-button btn btn-outline-primary" onClick={handleLogout}>Logout</button>}
        </div>
    )
}