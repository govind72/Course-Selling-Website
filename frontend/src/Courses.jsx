import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCourses(data.courses);
      });
  },[]);
  return (
    <div>
      <div> Courses</div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {courses.map((course) => {
          return <Course course={course} />;
        })}
      </div>
    </div>
  );
}
function Course(props) {
  return (
    <div>
      <Card style={{ width: 300, margin: 10, height: 300 }} onClick={
        ()=>window.location = "/course/"+ props.course.id
      } >
        <Typography textAlign={"center"} variant="h5">
          {props.course.title}
        </Typography>
        <Typography textAlign={"center"}>{props.course.description}</Typography>
        <img src={props.course.imageLink} style={{ width: 300 }} />
      </Card>
    </div>
  );
}

export default Courses;
