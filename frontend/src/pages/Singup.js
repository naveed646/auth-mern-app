import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Singup() {
  const navigate=useNavigate();
  const [singnUpInfo, setSingnUpInfo] = useState({
    name: "",
    email: "",
    password: ""
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    const copySignUpInfo = { ...singnUpInfo };
    copySignUpInfo[name] = value;
    setSingnUpInfo(copySignUpInfo);
  };
  console.log("login info =>", singnUpInfo);

  const handleSubmitt = async(e) => {
    e.preventDefault();
    const {name, email, password}=singnUpInfo;
    if(!name || !email || !password){
      handleError("name email and password are required");
    }
    try{
      const url = "http://localhost:5000/auth/signup";
      const response= await fetch(url,{
        method: "POST",
        headers: {
          'content-type': 'Application/json'
        },
        body: JSON.stringify(singnUpInfo)

      });
      const result = await response.json()
      console.log(result);
      const{success, message, error}=result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
        }, 1000)
      }else if(error){
        // const details=error?.details[0].message;
        handleError(error);
      }else if(!message){
        handleError(message);
      }
    }catch(err){
      handleError(err);
    }

  };


  return (
    <div className="container">
      <h1>SignUp</h1>
      <form onSubmit={handleSubmitt}>
        <div>
          <label htmlFor="Name"></label>
          <input
            onChange={handleInput}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your Name..."
            value={singnUpInfo.name}
          />
        </div>
        <div>
          <label htmlFor="Email"></label>
          <input
            onChange={handleInput}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={singnUpInfo.email}
          />
        </div>
        <div>
          <label htmlFor="Password"></label>
          <input
            onChange={handleInput}
            type="password"
            name="password"
            placeholder="Enter your Paswword..."
              value={singnUpInfo.password}
          />
        </div>
        <button>Sign Up</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Singup;
