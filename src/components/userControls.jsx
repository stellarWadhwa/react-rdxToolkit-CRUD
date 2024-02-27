import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { selectUserLogin } from '../features/userloginSlice'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

import Menuu from './antDesignMenu'

const UserControls = () => {
    const userlogin=useSelector(selectUserLogin);
const [fetchedData,setFetchedData]=useState([])
const[userIsAdmin,setUserIsAdmin]=useState(true);


    const fetchData=async(value)=>{
        console.log(value)
        try{

        
        const res=await axios.post("http://localhost:4000/api/admin/getcreateduser",{
            email:userlogin.user.email
        })
       
        setFetchedData(res.data);
    }catch(err){
        console.log(err)
    }
    }
    const handledelete=async(data)=>{
        try{
            
const res=await axios.post("http://localhost:4000/api/admin/deleteuser",{
    email:data
})
fetchData();
console.log(res)}
catch(err){
    console.log(err);
}
    }
useEffect(()=>{
if(userlogin && userlogin.user && userlogin.user.role!='administrator') setUserIsAdmin(false);
fetchData()
},[userlogin])

  return (
  <>
  {userIsAdmin ?
  <div className='wrapperSidebar'>
  {/* <Sidebar /> */}
  <Menuu />
  <div className='addedusercardwrapper'>
  {fetchedData.length !== 0 ? 
    (
      fetchedData.map((data) => {
        return (
          <div key={data._id} className='addedusercard'>
         <div><span>Name: </span>{data.name}</div>
         <div><span>Email: </span>{data.email}</div>
         <div><span>role: </span>{data.role}</div>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 deleteuserbtn" style={{width:"20px", cursor:"pointer"}} onClick={()=>handledelete(data.email)}>
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

          </div>
        );
      })
    ) : (
      <p>koko</p>
    )
  }
</div>
</div> :<h2>Forbiden Page!!!</h2>}
  </>
  )
}

export default UserControls