import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

// GRAPHQL QUERY
import { gql, useLazyQuery } from "@apollo/client";
import { useAuth } from "../hooks/AuthProvider";
import Login from "./Login";

const GET_STUDENTS = gql`
  query GetStudents {
    users {
      studentNumber
      firstName
      lastName
      address
      city
      phoneNumber
      email
      program
    }
  }
`;

function ListStudent() {
  const auth = useAuth();

  const [users, setUsers] = useState([]);

  const [getStudents] = useLazyQuery(GET_STUDENTS, {
    onCompleted: (data) => {
      setUsers(data.users);
    },
  });

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  if (!auth.user) {
    return <Login />;
  }

  return (
    <Container>
      <div>
        <h1>List of Students</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>Student Number</th>
              <th>Student Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Program</th>
            </tr>
          </thead>
          <tbody>
            {users.map((student, idx) => (
              <tr
                key={idx}
                // onClick={() => showDetail(student._id)}
                style={{ cursor: "pointer" }}
              >
                <td>{student.studentNumber}</td>
                <td>{`${student.firstName} ${student.lastName}`}</td>
                <td>{`${student.address}, ${student.city}`}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.email}</td>
                <td>{student.program}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default ListStudent;
