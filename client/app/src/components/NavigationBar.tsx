import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useAuth } from "../hooks/AuthProvider";

function NavigationBar() {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <Navbar expand='lg' bg='light'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          LA3 - Vital Solutions
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/home'>
              Home
            </Nav.Link>

            {auth.token && (
              <>
                <Nav.Link as={Link} to='/list-vitals'>
                  Vital Signs
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {!auth.token ? (
              <>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/register'>
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to='/dashboard'>
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={handleLogout} href='#'>
                  Log out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
