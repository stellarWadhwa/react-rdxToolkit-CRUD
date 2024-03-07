import React from 'react'
import { selectUserLogin } from '../features/userloginSlice';
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';

const Headerr = () => {
    const userLogin=useSelector(selectUserLogin);
    const decodedUser = jwtDecode(userLogin?.user?.token);

  return (
    <div className='header'>
        <span>Admin Panel</span>
        <span>Hi {decodedUser.user.name}</span>
    </div>
  )
}

export default Headerr