import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
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
          LA2 - Schedule Builder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/home'>
              Home
            </Nav.Link>

            {auth.token && (
              <>
                <Nav.Link as={Link} to='/list-students'>
                  List of Students
                </Nav.Link>
                <Nav.Link as={Link} to='/list-courses'>
                  List of Courses
                </Nav.Link>
                <Nav.Link as={Link} to='/list-enrolled'>
                  Enrolled Courses
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
                <Nav.Link onClick={handleLogout} to='#'>
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
