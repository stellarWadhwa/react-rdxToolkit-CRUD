import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { registerFailure, registerStart, registerSuccess } from '../features/userlRegisterSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [registerSuccesss,setRegisterSuccesss] = useState(false);
    const [registerFailuree,setRegisterFailuree] = useState(false);
    const [registerErr,setRegisterErr] = useState();
    const [showPassword,setShowPassword] = useState(false)

const userNameRef=useRef();
const userEmailRef=useRef();
const userPasswordRef=useRef();
const navigate=useNavigate();
const dispatch=useDispatch();
    const handleSubmit = async(event) => {
        event.preventDefault();
        dispatch(registerStart());
        try{
            const result=await axios.post('http://localhost:4000/api/users/register',{
                name: userNameRef.current.value,
                email: userEmailRef.current.value,
                password: userPasswordRef.current.value                  
            })
            console.log(result);
            dispatch(registerSuccess());
            setRegisterSuccesss(true);
        }catch(err){
            console.log(err.response.data);
            dispatch(registerFailure());
            setRegisterFailuree(true);
            setRegisterErr(err.response.data)
}
    }
    const handleLogin=(e)=>{
        e.preventDefault();
        navigate("/login")
    }
useEffect(()=>{
    console.log('ran')
    if(registerSuccesss==true){
        toast("Registration Successfull",{
          icon:"✅"
        })
        setRegisterSuccesss(false);
    setTimeout(()=>{
navigate('/login')
    },1000)
    };
    if(registerFailuree==true)  {
        toast(registerErr,{
            icon:"❌"
        })
        setRegisterFailuree(false);
    }
},[registerSuccesss,registerFailuree])
const handlePasswordToggle=()=>{
    setShowPassword(!showPassword)
  }
  

  return (
    <div className='form'>
    <span>Register</span>
    <form onSubmit={handleSubmit}>
        <div className='inputForm'>
        <div className='inputContainer'>
        <label>Name: </label>
        <input type="name" ref={userNameRef} required/></div>
        
        <div className='inputContainer'><label>Email: </label>
        <input type="email" ref={userEmailRef} required/></div>

        <div className='inputContainer'><label>Password: </label>
        <input type={showPassword?'text':'password'} ref={userPasswordRef}/>
        {showPassword?
        <svg style={{width:"20px", cursor:"pointer"}}  onClick={handlePasswordToggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 passwordIcon">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
 :<svg style={{width:"20px", cursor:"pointer"}}  onClick={handlePasswordToggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 passwordIcon" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
}
        </div></div>
        <button type="submit" className='submitBtnForm'>Submit</button>
    </form>
    <div className='loginDiv'><p>Already Registered? </p><button onClick={handleLogin}>Login</button></div>
    <Toaster />     
</div>
  )
}

export default Register