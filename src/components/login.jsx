import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {loginStart, loginSuccess, logout,loginFailure, selectUserLogin} from "../features/userloginSlice"
import { useNavigate } from "react-router-dom"; 


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
},[userLogin])

useEffect(()=>{
    if(userLogin.user!=null){
      navigate("/");
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
    
    
  return (
    <div>
      <div className='form'>
            <span>Login</span>
            <form onSubmit={handleSubmit}>
                <div className='inputContainer'>
                <label>Name: </label>
                <input type="email" ref={userNameRef} required/></div>
                
                <div className='inputContainer'><label>Password: </label>
                <input type="text" ref={userAgeRef} required/></div>
                <button type="submit" className='submitBtnForm' disabled={disabledbtn}>Submit</button>
            </form>
            {userLogin.error && <p>{loginErr}</p>}
        </div>
    </div>
  )
}

export default Login