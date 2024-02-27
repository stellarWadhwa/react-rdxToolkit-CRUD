import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { selectUserLogin } from '../features/userloginSlice'
import { useNavigate } from 'react-router-dom'
import Menuu from './antDesignMenu'


const About = () => {
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

    <div className='about'><h2>About</h2></div>
    </div></>

  )
}

export default About