import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import EditUser from "./views/EditUser";
import ListCourses from "./views/ListCourses";
import Home from "./views/Home";
import { Footer } from "./components/Footer";
import Register from "./views/Register";
import CreateCourse from "./views/CreateCourse";
import AuthProvider from "./hooks/AuthProvider";
import NavigationBar from "./components/NavigationBar";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import ListStudent from "./views/ListStudents";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavigationBar />

        <div>
          <Container>
            <Routes>
              <Route index element={<Home />} />
              <Route path='home' element={<Home />} />

              {/* AUTH MODULE */}
              <Route path='register' element={<Register />} />
              <Route path='login' element={<Login />} />
              <Route path='dashboard' element={<Dashboard />} />

              {/* STUDENT MODULE */}
              <Route path='list-students' element={<ListStudent />} />
              <Route path='edit-profile' element={<EditUser />} />
              {/* <Route path='show/:id' element={<ShowUser />} /> */}

              {/* COURSE MODULE */}
              <Route
                path='list-courses'
                element={<ListCourses isEnrolled={false} />}
              />
              <Route
                path='list-enrolled'
                element={<ListCourses isEnrolled={true} />}
              />

              {/* <Route path='show-course/:id' element={<ShowCourse />} /> */}
              <Route
                path='edit-course/:id'
                element={<CreateCourse isEdit={true} />}
              />
              <Route
                path='create-course'
                element={<CreateCourse isEdit={false} />}
              />
            </Routes>
          </Container>
        </div>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
