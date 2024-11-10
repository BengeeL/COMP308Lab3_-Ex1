import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth } from "../hooks/AuthProvider";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Login from "./Login";

const ADD_COURSE = gql`
  mutation AddCourse(
    $courseCode: String!
    $courseName: String!
    $section: String!
    $semester: String!
    $students: [userInput]
  ) {
    createCourse(
      courseCode: $courseCode
      courseName: $courseName
      section: $section
      semester: $semester
      students: $students
    ) {
      id
      courseCode
      courseName
      section
      semester
      students {
        _id
        firstName
        lastName
        email
        address
        city
        phoneNumber
        program
      }
    }
  }
`;

const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $courseCode: String!
    $courseName: String!
    $section: String!
    $semester: String!
    $students: [userInput]
  ) {
    updateCourse(
      id: $id
      courseCode: $courseCode
      courseName: $courseName
      section: $section
      semester: $semester
      students: $students
    ) {
      id
      courseCode
      courseName
      section
      semester
      students {
        _id
        firstName
        lastName
        email
        address
        city
        phoneNumber
        program
      }
    }
  }
`;

const GET_COURSE = gql`
  query GetCourse($id: String!) {
    course(id: $id) {
      courseCode
      courseName
      section
      semester
      students {
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
  }
`;

function CreateCourse({ isEdit }) {
  // Get id from URL
  const { id } = useParams();

  const auth = useAuth();
  const navigate = useNavigate();

  const [addCourse] = useMutation(ADD_COURSE);

  const [course, setCourse] = useState({
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
    students: [auth.user],
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const [getCourseData] = useLazyQuery(GET_COURSE, {
    variables: { id: id },
    onCompleted: (data) => {
      setCourse(data.course);
    },
    onError: (error) => {
      console.error("Error fetching course data:", error);
    },
  });

  useEffect(() => {
    if (isEdit) {
      console.log("Course ID: ", id);

      getCourseData();
    }
  }, [isEdit, getCourseData, id]);

  const saveCourse = async (e) => {
    e.preventDefault();

    try {
      setError("");

      // Remove __typename from students
      const students = course.students.map(
        // eslint-disable-next-line no-unused-vars
        ({ __typename, token, ...student }) => student
      );

      await addCourse({
        variables: {
          ...course,
          students,
        },
      });

      navigate("/list-courses");
    } catch (error) {
      setError(error);
    }
  };

  const [updateCourse] = useMutation(UPDATE_COURSE);

  const updateCourseData = async (e) => {
    e.preventDefault();

    try {
      setError("");

      // Remove __typename from students
      const students = course.students.map(
        // eslint-disable-next-line no-unused-vars
        ({ __typename, token, ...student }) => student
      );

      await updateCourse({
        variables: {
          id: id,
          ...course,
          students,
        },
      });

      navigate("/list-courses");
    } catch (error) {
      setError(error);
    }
  };

  if (!auth.user) {
    return <Login />;
  }

  return (
    <Container>
      <div>
        <Form onSubmit={isEdit ? updateCourseData : saveCourse}>
          <h2>{isEdit ? "Edit Course" : "Create a Course"}</h2>

          <Form.Group>
            <Form.Label>Course Code</Form.Label>
            <Form.Control
              type='text'
              name='courseCode'
              id='courseCode'
              placeholder='Enter course code'
              value={course.courseCode}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type='text'
              name='courseName'
              id='courseName'
              placeholder='Enter course name'
              value={course.courseName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Section</Form.Label>
            <Form.Control
              type='text'
              name='section'
              id='section'
              placeholder='Enter section'
              value={course.section}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Semester</Form.Label>
            <Form.Control
              type='text'
              name='semester'
              id='semester'
              placeholder='Enter semester'
              value={course.semester}
              onChange={onChange}
            />
          </Form.Group>

          <p className='mt-3'>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </p>

          <Button variant='primary' type='submit' className='mt-3'>
            Save Course
          </Button>
        </Form>
      </div>
    </Container>
  );
}

CreateCourse.propTypes = {
  isEdit: PropTypes.bool,
};

export default CreateCourse;
