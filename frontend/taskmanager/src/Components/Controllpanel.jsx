import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context';
import { Container, Navbar, Button } from 'react-bootstrap';
import '../Style/nav.css';

function Controllpanel() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
        <Navbar.Brand as={Link} to="/" style={{marginLeft:"30px",paddingTop:"150px",fontSize:"25px"}}
          >Home</Navbar.Brand>
          <Navbar.Brand as={Link} to="/user" style={{marginLeft:"30px",fontSize:"25px"}}
          >Profile</Navbar.Brand>

            {user ? (
              <Button
                variant="primary"
                onClick={handleLogout}
                className="navbar-btn"
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="primary" className="navbar-btn">
                  Login
                </Button>
              </Link>
            )}
          
        </Container>
      </Navbar>
    </div>
  );
}

export default Controllpanel;
