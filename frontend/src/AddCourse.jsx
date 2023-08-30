import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { useState } from "react";
function AddCourse() {
    const [title,setTitle] = useState("")
    const [description ,setDescription] = useState("")
    const [image ,setImage] = useState("")
  return (
    <div>
      <div
        style={{
          paddingBottom: 15,
          paddingTop: 100,
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
            onChange={(e)=>{
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
            onChange={(e)=>{
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
            onChange={(e)=>{
                setImage(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
           variant="contained"
            size="large"
            onClick={
                ()=>{
                    fetch("http://localhost:3000/admin/courses",{
                        method:"POST",
                        body : JSON.stringify({
                            title:title,
                            description:description,
                            price:500,
                            imageLink:image,
                            published:true
                        }),
                        headers:{
                            "Content-type":"application/json",
                            "Authorization" : localStorage.getItem("token")
                        }
                    }).then(
                        (res)=>{
                            return res.json();
                        }
                    ).then(
                        (data)=>{
                            alert("course added sucessfully!")
                        }
                    )
                }
            }
            >
            Add Course
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
