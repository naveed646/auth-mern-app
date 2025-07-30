import {Navigate, Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Singup from './pages/Singup';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';

function App() {

  const [isAuthenticated, setIsAuthenticated ]= useState(false)


  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }


  return (
    
   <div className='app'>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Singup/>}/>
       <Route path="/home" element={<PrivateRoute element={<HomePage/>}/> }/>
      
    </Routes>
   </div>
  );
}

export default App;
