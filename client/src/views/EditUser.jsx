import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect, useState } from "react";

function EditUser() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [user, setUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phoneNumber: "",
    password: "",
    program: "",
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    } else {
      console.log("AuthUser: ", auth.user);
      setUser(auth.user);
    }
  }, [auth.user, navigate]);

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await auth.updateUserData(user);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <div>
        <Form onSubmit={updateUser}>
          <h2>Edit Student ({user.studentNumber})</h2>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              name='firstName'
              placeholder='Enter first name'
              value={user.firstName}
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
              value={user.lastName}
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
              value={user.email}
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
              value={user.address}
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
              value={user.city}
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
              value={user.phoneNumber}
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
              value={user.program}
              onChange={onChange}
              required
            />
          </Form.Group>

          <p className='mt-3'>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </p>

          <Button variant='primary' type='submit' className='mt-3'>
            Update
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default EditUser;
