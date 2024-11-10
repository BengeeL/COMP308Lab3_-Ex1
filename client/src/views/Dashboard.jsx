import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    navigate("/login");
  }

  return (
    <Container className=''>
      <Row>
        <Col>
          <h1 className='mb-4'>
            {auth.user?.firstName} {auth.user?.lastName}- Student Dashboard
          </h1>
          <p>
            <strong>Student Number:</strong> {auth.user?.studentNumber}
          </p>
          <p>
            <strong>Email:</strong> {auth.user?.email}
          </p>
          <p>
            <strong>Address:</strong> {auth.user?.address}
          </p>
          <p>
            <strong>City:</strong> {auth.user?.city}
          </p>
          <p>
            <strong>Phone Number:</strong> {auth.user?.phoneNumber}
          </p>
          <p>
            <strong>Program:</strong> {auth.user?.program}
          </p>
        </Col>
      </Row>

      {/* Button to /edit/:id */}
      <Row>
        <Col>
          <button
            className='btn btn-primary mt-3'
            onClick={() => navigate(`/edit-profile`)}
          >
            Edit Profile
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
