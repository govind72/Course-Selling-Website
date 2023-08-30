import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Appbar() {
  const navigate =useNavigate()
  const [userEmail,setUserEmail] =useState(null);

  useEffect(()=>{
    fetch("http://localhost:3000/admin/me",{
      method:"GET",
      headers:{
        "Content-type":"application/json",
        "Authorization": localStorage.getItem("token")
      }
    }).then(
      (res)=>{
        return res.json();
      }
    ).then(
      (data)=>{
        if(data.username){
          setUserEmail(data.username)
        }
        
      }
    )
  },[]);
  if(userEmail){
    return(
      <div
      style={{ display: "flex", justifyContent: "space-between", padding: 4 }}
    >
      <div>
        <Typography variant={"h6"} onClick={()=> navigate("/")}>Coursera</Typography>
      </div> 

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
         <Typography variant="h6">{userEmail}</Typography>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.setItem("token",null);
              window.location="/"
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
    );
  }
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", padding: 4 }}
    >
      <div>
        <Typography variant={"h6"}>Coursera</Typography>
      </div> 

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signup")
              // window.location = "/signup";
            }}
          >
            Sign up
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signin")
              // window.location = "/login";
            }}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Appbar;
