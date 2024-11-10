import { Container } from "react-bootstrap";

const Home = () => (
  <Container>
    <div>
      <h1>Welcome to LA2 - Course System</h1>
      <p>
        The purpose of this website is to provide software engineering students
        with an opportunity to develop a student/course system using the MERN
        stack.
      </p>

      <h3>Student Features</h3>
      <ul>
        <li>User - Authentication System using JWT and HTTPOnly cookies</li>

        <li>Add Courses</li>
        <li>Update Courses</li>
        <li>Drop Courses</li>
        <li>Courses Taken Overview</li>
      </ul>

      <h3>Admin Features</h3>
      <ul>
        <li>Admin - Authentication System using JWT and HTTPOnly cookies</li>

        <li>List all Students</li>
        <li>Add Student</li>
        <li>List all Courses</li>
        <li>List all Students enrolled in specific course</li>
      </ul>

      <h3>Other Features</h3>
      <ul>
        <li>Admins can register</li>
        <li>Admins can login</li>
        <li>Admins can logout</li>
        <li>Students can be registered by admin</li>
        <li>Students can login</li>
        <li>Students can logout</li>
      </ul>
    </div>
  </Container>
);

export default Home;
