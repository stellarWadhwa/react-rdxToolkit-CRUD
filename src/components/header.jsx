import React from 'react'
import { selectUserLogin } from '../features/userloginSlice';
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';

const Headerr = () => {
    const userLogin=useSelector(selectUserLogin);
    const decodedUser = userLogin.user !== null ? jwtDecode(userLogin.user.token) : null;

  return (
    <div className='header'>
        <span>Admin Panel</span>
        {userLogin.user!=null ?(
           <span> Hi {decodedUser.user.name}</span>
        ):(
          <span>Hi</span>
        )}
    </div>
  )
}

export default Headerr