import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../features/userloginSlice';
import Menuu from './antDesignMenu'

const Profile = () => {
    const userLogin=useSelector(selectUserLogin);
    const navigate=useNavigate();
        useEffect(() => {
    if(userLogin.user==null) navigate('/login')
        },[])
  return (
    <>
    <div className='wrapperSidebar'>
    {/* <Sidebar /> */}
    <Menuu />
    {userLogin.user && 
    <div className='profileComponent'>
      <img src={userLogin.user.img} />
      <span>Email ID: {userLogin.user.email}</span>
      </div>}
      </div>
    </>
  )
}

export default Profile