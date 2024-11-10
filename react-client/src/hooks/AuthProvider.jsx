import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

// MUTATIONS
const ADD_USER = gql`
  mutation AddUser(
    $studentNumber: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $address: String!
    $city: String!
    $phoneNumber: String!
    $program: String!
  ) {
    createUser(
      studentNumber: $studentNumber
      password: $password
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
      city: $city
      phoneNumber: $phoneNumber
      program: $program
    ) {
      _id
      studentNumber
      firstName
      lastName
      email
      address
      city
      phoneNumber
      program
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      studentNumber
      firstName
      lastName
      email
      address
      city
      phoneNumber
      program
      token
    }
  }
`;

const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
      message
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $studentNumber: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $address: String!
    $city: String!
    $phoneNumber: String!
    $program: String!
  ) {
    updateUser(
      _id: $id
      studentNumber: $studentNumber
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
      city: $city
      phoneNumber: $phoneNumber
      program: $program
    ) {
      _id
      studentNumber
      firstName
      lastName
      email
      address
      city
      phoneNumber
      program
    }
  }
`;

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(_id: $id) {
      _id
      studentNumber
      firstName
      lastName
      email
      address
      city
      phoneNumber
      program
    }
  }
`;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // AUTH USER
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState("");

  // MUTATIONS
  const [addUser] = useMutation(ADD_USER);
  const [loginUser] = useMutation(LOGIN_USER);
  const [logoutUser] = useMutation(LOGOUT_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  // QUERIES
  const [getUser] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      console.log("User data fetched:", data.user);
      setUser(data.user);
    },
    onError: (error) => {
      console.error("Error fetching user data:", error);
    },
  });

  // NAVIGATION
  const navigate = useNavigate();

  // Initialize state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUserId = localStorage.getItem("LA2id");
      const storedToken = localStorage.getItem("LA2token");

      if (storedUserId && storedToken) {
        console.log("Initializing user from localStorage...");
        console.log("User ID:", storedUserId);
        console.log("Token:", storedToken);
        setUserId(storedUserId);
        setToken(storedToken);

        await getUser({ variables: { id: storedUserId } });
      }
    };

    initializeAuth();
  }, [getUser]);

  // Log user state whenever it changes
  useEffect(() => {
    console.log("user:", user);
  }, [user]);

  // REGISTER
  const register = async (student) => {
    try {
      // 1 - Create User
      const response = await addUser({
        variables: {
          studentNumber: student.studentNumber,
          password: student.password,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          address: student.address,
          city: student.city,
          phoneNumber: student.phoneNumber,
          program: student.program,
        },
      });

      // 2 - Login User
      if (response.data.createUser) {
        await login(student.email, student.password);
      }

      navigate("/login");
    } catch (err) {
      throw new Error(err.message || "Error creating user");
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      // Login User
      const response = await loginUser({
        variables: {
          email,
          password,
        },
      });

      // Check if user logged in successfully
      if (response.data.loginUser) {
        // Set user and token session
        setUser(response.data.loginUser);
        setUserId(response.data.loginUser._id);
        setToken(response.data.loginUser.token);

        localStorage.setItem("LA2id", response.data.loginUser._id);
        localStorage.setItem("LA2token", response.data.loginUser.token);

        return;
      }

      // force refresh browser
      window.location.reload();
    } catch (err) {
      throw new Error(err.message || "Error logging in user");
    }
  };

  // LOGOUT
  const logout = async () => {
    console.log("Logging out user...");
    try {
      const response = await logoutUser();

      if (response.data.logoutUser) {
        setUser(null);
        setUserId(null);
        setToken("");

        localStorage.removeItem("LA2id");
        localStorage.removeItem("LA2token");

        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  // UPDATE USER
  const updateUserData = async (user) => {
    try {
      await updateUser({
        variables: {
          id: user._id,
          studentNumber: user.studentNumber,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address,
          city: user.city,
          phoneNumber: user.phoneNumber,
          program: user.program,
        },
      });

      setUser(user);
    } catch (error) {
      throw new Error(error.message || "Error updating the user");
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, userId, register, login, logout, updateUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
