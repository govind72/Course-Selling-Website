import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState } from "react";
function Signin() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  return (
    <div>
      <div
        style={{
          paddingBottom: 10,
          paddingTop: 150,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>Welcome back. Signin below</Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            id="outlined-basic"
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
            id="outlined-basic"
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
              fetch("http://localhost:3000/admin/login",{
                method:"POST",
                headers:{
                  'Content-Type': 'application/json',
                  'username':email,
                  'password': password
                }
              }).then(
                (res)=>{
                  return res.json()
                }
              ).then(
                (data)=>{
                  localStorage.setItem("token","Bearer "+data.token);
                  window.location='/'
                  console.log(data);
                }
              )
            }}
            >
            Sign in
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
