import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Appbar from "./Appbar";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
import Course from "./Course";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#F3F6F9" }}
    >
      <RecoilRoot>
        <Router>
          <Appbar></Appbar>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<Course />} />
            {/* <Route path="/" element={<Landing />} /> */}
          </Routes>
        </Router>
      </RecoilRoot>
    </div> 
  );
}

export default App;
