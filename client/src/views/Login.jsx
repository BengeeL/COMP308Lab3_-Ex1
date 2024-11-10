import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/Login.css";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await auth.login(email, password);

      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  };

  if (auth.user) {
    navigate("/dashboard");
  }

  return (
    <div className='App'>
      <Form>
        <h2>Login</h2>
        <Form.Group size='lg'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group size='lg'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <p className='mt-3'>
          {error && <span style={{ color: "red" }}>{error}</span>}
        </p>

        <p className='mt-3'>
          Don&apos;t have an account? <a href='/register'>Register</a>
        </p>

        <Button
          className='mt-3'
          size='lg'
          variant='primary'
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
