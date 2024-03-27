import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../features/userloginSlice';
import Menuu from './antDesignMenu'
import { jwtDecode } from "jwt-decode";


const Profile = () => {

    const userLogin=useSelector(selectUserLogin);
  const decodedUser = userLogin.user !== null ? jwtDecode(userLogin.user.token) : null;
    const navigate=useNavigate();
        useEffect(() => {
    if(userLogin.user==null) navigate('/login')
        },[])

const handleSpanClick=(e)=>{
  if (e.target.classList.contains('spanCreatedUserByAdmin')) {
    // Access the text content of the clicked span
    const userName = e.target.textContent;
    // Perform your desired action with the username
    console.log('Clicked user:', userName);
  }
}

  return (
    <>
    <div className='wrapperSidebar'>
    {/* <Sidebar /> */}
    <Menuu />
    {decodedUser?.user && 
    <div className='profileComponent bg-white flex flex-col  mx-auto my-[5rem] py-[2rem] px-[3rem] rounded-lg'>
   <div className='flex'>
    <div className='pr-[3rem]'>
    <img src={decodedUser?.user?.profileImage} style={{width:"100px", height:"100px", objectFit:"contain", borderRadius:"50%"}} className='pb-3 cursor-pointer'/>
    <span className='text-gray-400'><span className='font-semibold'>Email ID:</span> {decodedUser.user.email}</span>

    </div>
    <div className='flex flex-col items-baseline'>
    <span className='text-gray-400 pb-1'><span className='font-semibold'>Name: </span>{decodedUser.user.name}</span>
    <span className='text-gray-400 pb-1'><span className='font-semibold'>Authorization Level:</span> {decodedUser.user.role}</span>
    <span className='text-gray-400 pb-1'><span className='font-semibold'>Created By:</span> {decodedUser.user.creatorEmail}</span>
    {decodedUser?.user?.usersCreated?.length==0 ? <></>:<>
    <span className='text-gray-400 pb-1'><span className='font-semibold'>Number of users created:</span> {decodedUser.user.usersCreated.length}</span>
    </>}
    </div>
    </div>
{ decodedUser?.user?.usersCreated?.length==0 ? <></>:<>
    <div className='flex flex-col pt-[2rem]'>
    <span className='text-gray-400 font-semibold text-left'>Users Created:</span>
    <div className='flex flex-col text-left' onClick={handleSpanClick}>
    {decodedUser.user.usersCreated.map((c,index)=>{
      return(
        <>
<span className='text-gray-400 py-3 border-b border-gray-200 last:border-none cursor-pointer spanCreatedUserByAdmin'>
<span className='font-semibold'>{index + 1+":"} </span>
 {c}
 </span>
</>
      )
    })}</div>
      
    </div>
    </>
}

      </div>}
      </div>
    </>
  )
}

export default Profile