import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Login () {
  const navigate=useNavigate();
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: ""
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setloginInfo(copyLoginInfo);
  };
  console.log("login info =>", loginInfo);

  const handleLoginSubmitt = async(e) => {
    e.preventDefault();
    const {email, password}=loginInfo;
    if(!email || !password){
      handleError("Email and Password are required");
    }
    try{
      const url = "https://auth-mern-gc54iv08x-muhammad-naveeds-projects-3f16895f.vercel.app/login";
      const response= await fetch(url,{
        method: "POST",
        headers: {
          'content-type': 'Application/json'
        },
        body: JSON.stringify(loginInfo)

      });
      const result = await response.json()
      console.log(result);
      const{success, message,jwtoken, name}=result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token', jwtoken);
        localStorage.setItem('loggedInUser', name)
        setTimeout(()=>{
          navigate('/home')
        }, 1000)
      }else if(!success){
        // const details=error?.details[0].message;
        handleError(message);
      }else if(!message){
        handleError(message);
      }
    }catch(err){
      handleError(err);
    }

  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmitt}>
        <div>
          <label htmlFor="Email"></label>
          <input
            onChange={handleInput}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="Password"></label>
          <input
            onChange={handleInput}
            type="password"
            name="password"
            placeholder="Enter your Paswword..."
              value={loginInfo.password}
          />
        </div>
        <button>Login</button>
        <span>
          Don't have an account? <Link to="/signup">SignUp</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
