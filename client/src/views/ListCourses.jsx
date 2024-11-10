import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useAuth } from "../hooks/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Login from "./Login";

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      courseCode
      courseName
      section
      semester
      students {
        _id
        firstName
        lastName
      }
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
    }
  }
`;

function ListCourses({ isEnrolled }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  const [deleteCourse] = useMutation(DELETE_COURSE, {
    onError: (error) => {
      setError(error.message);
    },
    onCompleted: () => {
      console.log("Course deleted successfully");
      setRefresh((prev) => !prev);
      getCourses();
    },
  });

  const [getCourses] = useLazyQuery(GET_COURSES, {
    onCompleted: (data) => {
      setCourses(data.courses);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  useEffect(() => {
    getCourses();
  }, [getCourses, location, refresh]);

  useEffect(() => {
    if (isEnrolled) {
      setFilteredCourses(
        courses.filter((course) =>
          course.students.some((student) => student._id === auth.user?._id)
        )
      );
    } else {
      setFilteredCourses(courses);
    }
  }, [isEnrolled, courses, auth.user?._id]);

  const showDetail = (id) => {
    navigate(`/show-course/${id}`);
  };

  const editCourse = (id) => {
    navigate(`/edit-course/${id}`);
  };

  const deleteCourseData = async (id) => {
    await deleteCourse({ variables: { id } });
    setRefresh(!refresh);
  };

  if (!auth.user) {
    return <Login />;
  }

  return (
    <Container>
      <div>
        <h1>{isEnrolled ? "List of Courses Enrolled" : "List of Courses"}</h1>
        {error && <Alert variant='danger'>{error}</Alert>}
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Course Section</th>
                <th>Course Semester</th>
                <th>Students</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, idx) => (
                <tr key={idx} style={{ cursor: "pointer" }}>
                  <td onClick={() => showDetail(course.id)}>
                    {course.courseCode}
                  </td>
                  <td onClick={() => showDetail(course.id)}>
                    {course.courseName}
                  </td>
                  <td onClick={() => showDetail(course.id)}>
                    {course.section}
                  </td>
                  <td onClick={() => showDetail(course.id)}>
                    {course.semester}
                  </td>
                  <td onClick={() => showDetail(course.id)}>
                    {course.students?.map((student, idx) => (
                      <p key={idx}>
                        {student?.firstName} {student?.lastName}
                      </p>
                    ))}
                  </td>
                  <td>
                    <button
                      className='btn btn-warning'
                      onClick={() => editCourse(course.id)}
                    >
                      Edit
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => deleteCourseData(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className='btn btn-primary mt-3'
            onClick={() => {
              navigate("/create-course");
              setRefresh(!refresh);
              getCourses();
            }}
          >
            Create Course
          </button>
        </div>
      </div>
    </Container>
  );
}

ListCourses.propTypes = {
  isEnrolled: PropTypes.bool,
};

export default ListCourses;
