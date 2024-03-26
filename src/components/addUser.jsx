import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../features/userloginSlice';
import Menuu from './antDesignMenu'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const AddUser = () => {
  const [formOpen,setFormOpen] =useState(false);
  const [showPassword,setShowPassword] = useState(false)
  const[registerSuccess,setRegisterSuccess]=useState(false);
  const[registerFailure,setRegisterfailure]=useState(false);
  const[userIsAdmin,setUserIsAdmin]=useState(true);
  const[decodedUser,setDecodedUser]=useState(null);
  const[err,setErr]=useState('')
  const userNameref=useRef();
  const userPasswordref=useRef();
const userEmailref=useRef();
const userLogin=useSelector(selectUserLogin);

const createdUserToast = () => toast("User Created!");

const navigate=useNavigate();
    useEffect(() => {
if(userLogin.user==null) navigate('/login')
    },[])
useEffect(()=>{
const decodedUser = userLogin.user !== null ? jwtDecode(userLogin.user.token) : null;
setDecodedUser(decodedUser);
if(decodedUser.user.role!='administrator') setUserIsAdmin(false)


if(registerSuccess==true){
  createdUserToast();
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
           creatorId:decodedUser.user._id,
           creatorEmail:decodedUser.user.email
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
const handlePasswordToggle=()=>{
  setShowPassword(!showPassword)
}
  return (
  <>
  {userIsAdmin ?   <div className='wrapperSidebar'>
  {/* <Sidebar /> */}
  <Menuu />

  <div className='addUserDiv'>
    <h2 className='text-gray-500 font-semibold'>Add a New User:</h2>
    {/* <button className='submitBtnForm' onClick={showAddForm}>Add</button> */}
    
    
    <div className='roleTableContent'>
    <form onSubmit={handleSubmit}>
      <div className='inputForm'>
        <div className='inputContainer text-gray-400'>
        <label className=''>Name: </label>
        <input   className='text-gray-400' type="text" ref={userNameref} required /></div>
        <div className='inputContainer text-gray-400'>
        <label className=''>Email: </label>
        <input className='text-gray-400' type="text" ref={userEmailref} required /></div>
        <div className='inputContainer text-gray-400'>
        <label className=''>Password: </label>
        <input  className='text-gray-400' type={showPassword?'text':'password'} ref={userPasswordref}/>
        {showPassword?
        <svg style={{width:"20px", cursor:"pointer"}}   onClick={handlePasswordToggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 passwordIcon text-gray-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
 :<svg style={{width:"20px", cursor:"pointer"}}  onClick={handlePasswordToggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 passwordIcon text-gray-400" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
}
        </div>
        </div>
        <button type="submit" className='submitBtnForm'>Create User</button>
    </form>
</div>
  </div></div>
  :
  <h2>Forbidden Page!!!!</h2>
  }
  <ToastContainer />
  </>
  )
}

export default AddUser