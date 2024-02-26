import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {loginStart, loginSuccess, logout,loginFailure, selectUserLogin} from "../features/userloginSlice"
import { useNavigate } from "react-router-dom"; 
import toast, { Toaster } from 'react-hot-toast';




const Login = () => {
    const userLogin=useSelector(selectUserLogin);
    const dispatch=useDispatch();
    const userNameRef=useRef();
    const userAgeRef=useRef();
    const [disabledbtn,setDisabledbtn] = useState(false);
  const navigate = useNavigate();

  const [loginErr,setLoginErr]=useState('');
  

    
useEffect(()=>{ 
if(userLogin.isFetching==true) setDisabledbtn(true);
else setDisabledbtn(false);
if(loginErr!=false){
  toast(loginErr,{
    icon:"❌"
  });
}
if(userLogin.user!=null){
  toast("Logged In",{
    icon:"✅"
  });
}

},[userLogin,loginErr])

useEffect(()=>{
    if(userLogin.user!=null){
      setTimeout(()=>{
        navigate("/");

      },2000)
    }
    },[userLogin])

    const handleSubmit = async(event) => {
        event.preventDefault();
        dispatch(loginStart())

        try{
        const res=await axios.post('http://localhost:4000/api/users/login',{
            email:userNameRef.current.value,
            password:userAgeRef.current.value
        })
        dispatch(loginSuccess({res}));
        console.log(res.data);
    }catch(err){
        
        dispatch(loginFailure());
            console.log(err.response.data);
            setLoginErr()
            setLoginErr(err.response.data)
        }
    }
    const handleRegister=(e)=>{
      e.preventDefault();
      setTimeout(()=>{
        navigate("/register");

      })
    }
    
    
  return (
    <div>
      <div className='form'>
            <span>Login</span>
            <form onSubmit={handleSubmit}>
                <div className='inputContainer'>
                <label>Email Id: </label>
                <input type="email" ref={userNameRef} required/></div>
                
                <div className='inputContainer'><label>Password: </label>
                <input type="text" ref={userAgeRef} required/></div>
                <button type="submit" className='submitBtnForm' disabled={disabledbtn}>Submit</button>
            </form>
            <div className='registerDiv'><p>New User? </p><button onClick={handleRegister}>Register</button></div>
            <Toaster />     
        </div>
 
    </div>
    
  )
}

export default Login