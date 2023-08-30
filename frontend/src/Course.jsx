import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Course() {
  let { courseId } = useParams();
//   const [courses, setCourses] = useState([]);
    const setCourses = useSetRecoilState(coursesState);


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

  
  return<div style={{display:"flex", justifyContent:"center"}}>
    <CourseCard courseId={courseId}/>
    <UpdateCard courseId={courseId}/>
    </div>
}

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  let course =props.course;
  const [courses, setCourses]= useRecoilState(coursesState);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth={true}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            fullWidth={true}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="image"
            label="image link"
            variant="outlined"
            fullWidth={true}
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              fetch("http://localhost:3000/admin/courses/" + props.courseId, {
                method: "PUT",
                body: JSON.stringify({
                  title: title,
                  description: description,
                  price: 500,
                  imageLink: image,
                  published: true,
                }),
                headers: {
                  "Content-type": "application/json",
                  Authorization: localStorage.getItem("token"),
                },
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                    let updatedCourses=[];
                    for(let i=0;i<courses.length;i++){
                        if(courses[i].id  == props.courseId){
                            updatedCourses.push({
                                id : props.courseId ,
                                title:title,
                                description:description,
                                price:500,
                                imageLink :image,
                                published:true
                            })
                        }
                        else{
                            updatedCourses.push(courses[i]);
                        }
                    }
                    setCourses(updatedCourses);
                //   alert("course updated sucessfully!");
                });
            }}
          >
            Update Course
          </Button>
        </Card>
      </div>
    </div>
  );
}
function CourseCard(props) {
  const courses = useRecoilValue(coursesState)
  let course =null;

  for(let i=0;i<courses.length;i++){
    if(courses[i].id== props.courseId){
        course =courses[i];
    }
  }
  if(!course) return "loading..."
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
      <Card style={{ width: 300, margin: 10, minHeight: 200 }}>
        <Typography textAlign={"center"} variant="h5">
          {course.title}
        </Typography>
        <Typography textAlign={"center"}>{course.description}</Typography>
        <img src={course.imageLink} style={{ width: 300 }} />
      </Card>
    </div>
  );
}
export default Course;

const coursesState = atom({
    key: 'coursesState', 
    default: '', 
  }); 