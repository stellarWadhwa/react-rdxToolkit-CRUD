import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { selectUserLogin } from '../features/userloginSlice'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { jwtDecode } from "jwt-decode";

import Menuu from './antDesignMenu'
import { useNavigate } from 'react-router-dom'

const UserControls = () => {
    const userlogin=useSelector(selectUserLogin);
    const [decodedUser,setDecodedUser] = useState();
const [fetchedData,setFetchedData]=useState([])
const[userIsAdmin,setUserIsAdmin]=useState(true);
const navigate=useNavigate();

const userDeleteToast = () => toast("User Deleted Successfully!");


    useEffect(() => {
if(userlogin.user==null) navigate('/login')
    },[])

    const fetchData=async(value)=>{
        try{

        
        const res=await axios.post("http://localhost:4000/api/admin/getcreateduser",{
            email:value
        })
       
        setFetchedData(res.data);
    }catch(err){
        console.log(err)
    }
    }
    const handledelete=async(data)=>{
      console.log(data)
        try{
            
const res=await axios.post("http://localhost:4000/api/admin/deleteuser",{
    email:data
})
userDeleteToast();
fetchData(decodedUser.user.email);
}
catch(err){
    console.log(err);
}
    }
useEffect(()=>{
  const decodeduser = userlogin.user !== null ? jwtDecode(userlogin.user.token) : null;

if(decodeduser && decodeduser.user && decodeduser.user.role!='administrator') setUserIsAdmin(false);
setDecodedUser(decodeduser)
fetchData(decodeduser.user.email)
},[userlogin])

  return (
  <>
  {userIsAdmin ?
  <div className='wrapperSidebar'>
  {/* <Sidebar /> */}
  <Menuu />
 
  <div className="assignRoleWrapper">
    <div className='assignRoleTable mt-[5rem] ml-[1rem]'>
      <div className='tableTop flex'>
        <span className='flex ml-[2rem] text-gray-500 font-semibold'>User</span>
        <span className='flex ml-[2rem] text-gray-500 font-semibold'>User Mail</span>
        <span className='flex ml-[2rem] text-gray-500 font-semibold'>User Role</span>
  </div>
      <div className='roleTableContent mt-[2rem]'>
      {fetchedData.length !== 0 ? 
      (
        fetchedData.map((data) => {
          
          return (
            
    <div key={data._id} className='flex mt-[2rem] pb-[2rem]'>
      <span className='valTableData flex ml-[2rem] text-gray-400 font-semibold'>{data.name}</span>
      <span className='valTableData flex ml-[2rem] text-gray-400 font-semibold'>{data.email}</span>
      <span className='valTableData flex ml-[2rem] text-gray-400 font-semibold'>{data.role}</span>
      <button onClick={()=>handledelete(data.email)} className='text-sm  border-[1px] items-center border-red-500 flex bg-red-500 text-odd-white-color py-1  px-2 rounded-lg hover:bg-transparent hover:text-gray-400'>delete user<svg className='ml-[0.2rem]' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 deleteuserbtn" style={{width:"20px", cursor:"pointer"}}>
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg></button>

      
    </div>
          );
        })
      ) : (
        <p className='text-gray-400 my-[2rem]'>There are no users created by you.</p>
      )
    }
      </div>
    </div>
  </div>
</div> :<h2>Forbiden Page!!!</h2>}
<ToastContainer />
  </>
  )
}

export default UserControls