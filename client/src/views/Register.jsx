import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

function Register() {
  const [student, setStudent] = useState({
    studentNumber: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phoneNumber: "",
    program: "",
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      auth.register(student);

      setStudent({
        studentNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        phoneNumber: "",
        program: "",
      });
    } catch (error) {
      setError("Error adding user: " + error.message);
    }
  };

  if (auth.user) {
    navigate("/dashboard");
  }

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <Form.Group>
            <Form.Label>Student Number</Form.Label>
            <Form.Control
              type='text'
              name='studentNumber'
              placeholder='Enter student number'
              value={student.studentNumber}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              name='firstName'
              placeholder='Enter first name'
              value={student.firstName}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              name='lastName'
              placeholder='Enter last name'
              value={student.lastName}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              value={student.email}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              name='address'
              placeholder='Enter address'
              value={student.address}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              name='city'
              placeholder='Enter city'
              value={student.city}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Program</Form.Label>
            <Form.Control
              type='text'
              name='program'
              placeholder='Enter program'
              value={student.program}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type='text'
              name='phoneNumber'
              placeholder='Enter phone'
              value={student.phoneNumber}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Enter password'
              value={student.password}
              onChange={onChange}
              required
            />
          </Form.Group>

          <p className='mt-3'>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </p>

          <p className='mt-3'>
            Already have an account? <a href='/login'>Login</a>
          </p>

          <Button variant='primary' type='submit' className='mt-3'>
            Save
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Register;
