import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function TopBar() {
  let navigate = useNavigate();
  // logout the user
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    alert("Successfully logged out")
  };

  return (
    <Navbar fixed='top' expand="sm" className='top-bar'>
      <Container className='w-100 ph-1'>
        <Navbar.Brand className='top-bar-title'>Sejjit</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav m-0" >
            <Nav className="me-auto">
              <Nav.Link className='top-bar-content' href="#home">Home</Nav.Link>
              <Nav.Link className='top-bar-content' href="#link">Link</Nav.Link>
            </Nav>
            <div className='ms-auto'>
              <button className="top-bar-btn btn btn-outline-primary" onClick={handleLogout}>Logout</button>
              </div>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}