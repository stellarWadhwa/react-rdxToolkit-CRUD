import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../features/userloginSlice';
import toast, { Toaster } from 'react-hot-toast';



const AddUser = () => {
  const [formOpen,setFormOpen] =useState(false);
  const[registerSuccess,setRegisterSuccess]=useState(false);
  const[registerFailure,setRegisterfailure]=useState(false);
  const[userIsAdmin,setUserIsAdmin]=useState(true);
  const[err,setErr]=useState('')
  const userNameref=useRef();
  const userPasswordref=useRef();
const userEmailref=useRef();
const userLogin=useSelector(selectUserLogin);
console.log(userLogin.user.role)
useEffect(()=>{
if(userLogin.user.role!='administrator') setUserIsAdmin(false);
// if(userLogin.user.role!='administrator') setUserIsAdmin(false)

if(registerSuccess==true){
  toast("Registration Successfull",{
    icon:"✅"
  })
  setRegisterSuccess(false)
}

  if(registerFailure==true){
    toast(err.response.data,{
      icon:"❌"
    })
    setRegisterfailure(false)
    // console.log(err.response.data)
  }

},[registerSuccess,registerFailure,userLogin])
  const  showAddForm = ()=>{
    setFormOpen(true);
  }
  const handleSubmit=async(e)=>{
   e.preventDefault();
   try{
   const res=await axios.post("http://localhost:4000/api/admin/adduser",{
           name:userNameref.current.value,
           email:userEmailref.current.value,
           password:userPasswordref.current.value,
           creatorId:userLogin.user._id,
           creatorEmail:userLogin.user.email
   }
   )
   
   setRegisterSuccess(true)
   setFormOpen(false)
  }
   catch(err){
    setRegisterfailure(true)
    setErr(err)
    console.log(err)
   }
  }

  return (
  <>
  {userIsAdmin ?   <div className='wrapperSidebar'>
  <Sidebar />
  <div className='addUserDiv'>
    <h2>Add a New User:</h2>
    <button className='submitBtnForm' onClick={showAddForm}>Add</button>
    {formOpen && 
    
    <div className='form'>
    <span>Add User</span>
    <form onSubmit={handleSubmit}>
        <div className='inputContainer'>
        <label>Name: </label>
        <input type="text" ref={userNameref} required /></div>
        <div className='inputContainer'>
        <label>Email: </label>
        <input type="text" ref={userEmailref} required /></div>
        <div className='inputContainer'><label>Password: </label>
        <input type="text" ref={userPasswordref} maxlength="4"/></div>
        <button type="submit" className='submitBtnForm'>Submit</button>
    </form>
</div>}
  </div></div>
  :
  <h2>Forbidden Page!!!!</h2>
  }

  </>
  )
}

export default AddUser