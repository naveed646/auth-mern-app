import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from "../utils";

function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProduct]=useState('')
  
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogOut = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess('User Loggedout...')
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProduct= async()=>{
    try{
      const url="https://auth-mern-app-fh4u.vercel.app/product"
      const header={
        headers: {
          'Authorization': localStorage.getItem("token"),
        }
      }
      const response= await fetch(url, header)
      const result= await response.json()
      console.log('result is', result);
      setProduct(result);

    }catch (err){
      handleError(err)
    }
  }

  useEffect((e)=>{
    fetchProduct();
  },[])

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogOut}>Logout</button>
      <div>
        {
         products && products.map((item, index)=>(
            <ul key={index}>
             <span>{item.name}:{item.price}</span>
            </ul>
          ))
        }
      </div>
      <ToastContainer/>
    </div>
  );
}

export default HomePage;
