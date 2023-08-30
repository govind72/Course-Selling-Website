import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState } from "react";
function Signup() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  return (
    <div>
      <div
        style={{
          paddingBottom: 15,
          paddingTop: 150,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Signup below
        </Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            id="username"
            label="Email"
            variant="outlined"
            fullWidth={true}
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            
            id="password"
            label="Password"
            variant="outlined"
            fullWidth={true}
            type="password"
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
           variant="contained" 
           size="large"
           onClick={()=>{
            fetch("http://localhost:3000/admin/signup",
              {
                method:"POST",
                body: JSON.stringify({
                  username : email,
                  password :password
                }),
                headers:{
                  "Content-type":"application/json"
                }
              }
            ).then((res)=>{
              return res.json();
            }).then((data)=>{
              localStorage.setItem("token","Bearer "+data.token);
              console.log(data);
              window.location="/"
            })
           }}
           >
            Sign up
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
