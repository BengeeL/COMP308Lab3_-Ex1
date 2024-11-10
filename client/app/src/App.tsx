import Container from "react-bootstrap/Container";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthProvider from "./hooks/AuthProvider";
import NavigationBar from "./components/NavigationBar";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import ListStudent from "./views/ListStudents";
import EditUser from "./views/EditUser";
import ListCourses from "./views/ListCourses";
import CreateCourse from "./views/CreateCourse";
import { Footer } from "./components/Footer";

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
