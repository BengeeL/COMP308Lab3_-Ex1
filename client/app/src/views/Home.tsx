import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => (
  <Container>
    <Row className='my-5'>
      <Col>
        <h1 className='text-center'>
          Welcome to LA3 - Vital Signs Microservices
        </h1>
        <p className='text-center'>
          The purpose of this website is to provide software engineering
          students with an opportunity to develop a vital signs system using the
          MERN stack and microservices architecture.
        </p>
      </Col>
    </Row>

    <Row>
      <Col md={6}>
        <Card className='mb-4'>
          <Card.Body>
            <Card.Title>Authentication Features</Card.Title>
            <ul>
              <li>
                User - Authentication System using JWT and HTTPOnly cookies
              </li>
              <li>Admins can register</li>
              <li>Admins can login</li>
              <li>Admins can logout</li>
              <li>Students can register</li>
              <li>Students can login</li>
              <li>Students can logout</li>
            </ul>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6}>
        <Card className='mb-4'>
          <Card.Body>
            <Card.Title>Vital Signs Features</Card.Title>
            <ul>
              <li>Add Vital Signs</li>
              <li>Update Vital Signs</li>
              <li>View Vital Signs</li>
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className='my-5'>
      <Col>
        <h2 className='text-center'>
          Lab Assignment #3 – Micro-Frontends and Microservices with GraphQL
        </h2>
        <p>
          <strong>Due Date:</strong> Week 10, Thursday, 2:30pm.
        </p>
        <p>
          <strong>Purpose:</strong> The purpose of this assignment is to:
          <ul>
            <li>
              Extend the existing micro-frontends and microservices architecture
              to develop user – vital signs system.
            </li>
            <li>
              Utilize GraphQL for communication between micro-frontends and
              microservices.
            </li>
          </ul>
        </p>
        <p>
          <strong>References:</strong> Read the reference textbooks, lecture
          slides, and class examples. This material provides the necessary
          information that you need to complete the exercises.
        </p>
        <p>
          <strong>General Instructions:</strong>
          <ul>
            <li>
              This assignment may be completed using the pair programming
              technique.
            </li>
            <li>
              See the naming and submission rules at the end of this document.
            </li>
            <li>
              You will have to provide a demonstration for your solution and
              upload the solution on eCentennial through the assignment link.
            </li>
          </ul>
        </p>
      </Col>
    </Row>
  </Container>
);

export default Home;
