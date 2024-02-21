import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { selectUserLogin } from '../features/userloginSlice'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const userLogin=useSelector(selectUserLogin);
const navigate=useNavigate();
    useEffect(() => {
if(userLogin.user==null) navigate('/login')
    },[])
  return (
    <>
    <Sidebar />
    <div>About</div></>

  )
}

export default About