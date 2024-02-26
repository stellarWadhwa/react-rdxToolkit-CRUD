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


  return (
    <div className='form'>
    <span>Register</span>
    <form onSubmit={handleSubmit}>
        <div className='inputContainer'>
        <label>Name: </label>
        <input type="name" ref={userNameRef} required/></div>
        
        <div className='inputContainer'><label>Email: </label>
        <input type="email" ref={userEmailRef} required/></div>

        <div className='inputContainer'><label>Password: </label>
        <input type="text" ref={userPasswordRef} required/></div>

        <button type="submit" className='submitBtnForm'>Submit</button>
    </form>
    <div className='loginDiv'><p>Already Registered? </p><button onClick={handleLogin}>Login</button></div>
    <Toaster />     
</div>
  )
}

export default Register