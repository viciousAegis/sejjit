import { Navigate, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './actions/userActions';
import { BsPersonFill, BsReddit, BsFillBookmarksFill } from "react-icons/bs";
import { GiPointySword } from "react-icons/gi";

export default function TopBar() {
  let navigate = useNavigate();
  // logout the user

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  };

  return (
    <Navbar fixed='top' expand="sm" className='top-bar'>
      <Container className='w-100 ph-1'>
        <Navbar.Brand
          href='/subsejjits'
          className='top-bar-title'>
          <span>
            <GiPointySword /> Sejjit
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav m-0" >
          <Nav className="me-auto">
            <Nav.Link className='top-bar-content' href="/profile">
              <span>
                <BsPersonFill /> Profile
              </span>
            </Nav.Link>
            <Nav.Link className='top-bar-content' href="/mysubsejjits">
              <span>
                <BsReddit /> My SubSejjits
              </span>
            </Nav.Link>
            <Nav.Link className='top-bar-content' href="/saved">
              <span>
                <BsFillBookmarksFill /> Saved
              </span>
            </Nav.Link>
          </Nav>
          <div className='ms-auto'>
            <button className="top-bar-btn btn btn-outline-primary" onClick={handleLogout}>Logout</button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}