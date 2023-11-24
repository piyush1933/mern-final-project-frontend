import React, { useState } from "react";
import './loginstyle.css'; 
import {Link, useNavigate} from "react-router-dom"
function LoginPage() {
    const navigate=useNavigate();
  const [loginType, setLoginType] = useState("user");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [userpassword, setuserpassword] = useState("");

  const handleLogin = () => {
    const UsersUrl = "https://lla-backend.onrender.com/UserRoute";

    if (loginType === "admin") {
      if(userName==="admin" && password==="1234"){
            navigate("/AdminHome")
      }
      else{
        alert("invalid credentials")
      }
    } else if (loginType === "user") {
      fetch(UsersUrl)
        .then((response) => {
          if (!response.ok) {
            throw  Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((userCredentials) => {
          const foundUser = userCredentials.find(
            (user) => user.email === email && user.password===userpassword
          );

          if (foundUser) {
            window.location.href = window.location.origin+"/#/UserHome/" + foundUser._id;
          } else {
            alert("Invalid user credentials");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error occurred while fetching user data");
        });
    }

    setUserName("");
    setPassword("");
    setemail("");
    setuserpassword("");
  };

  return (
    <div className="app ">
      <div className="login-form " style={{fontFamily: "'Century Gothic', sans-serif",}}>
        <div className="title ">Sign In</div>
        <div className="button-container">
          <button
            className={`col-6 btn  ${loginType === "user" ? "active btn-info" : ""}`}
            onClick={() => setLoginType("user")}
          >
            User Login
          </button>
          <button
            className={`col-6 btn  ${loginType === "admin" ? "active btn-info" : ""}`}
            onClick={() => setLoginType("admin")}
          >
            Admin Login
          </button>
        </div>
        <div className="input-container">
          {loginType === "user" ? (
            <div>
              <div className="input-container ">
              <label >Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                
              /></div>
              <div className="input-container">
              <label >Password</label>
              <input
                type="password"
                value={userpassword}
                onChange={(e) => setuserpassword(e.target.value)}
                
              />
              <Link to="/NewUser" className="text-primary" style={{textDecoration:"none",textAlign:"center"}}><span style={{color: "black"}}>Click here to create a new account.</span></Link>
              
              </div>
            </div>
          ) : (
            <div>
              <div className="input-container" style={{ width: 280 }}>
              <label >Admin Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              </div>
              <div className="input-container">
              <label >Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </div>
              <span>&ensp;</span>
            </div>
          )}
        </div>
        <div className="button-container">
          <button className="btn btn-info"  onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
