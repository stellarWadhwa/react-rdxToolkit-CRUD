import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/usersSlice';

const EditFormUser = ({userData, onFormSubmit}) => {
    const nameRef = useRef(userData.name || ''); 
    const ageRef = useRef(userData.age || '');   

const dispatch=useDispatch();
const UpdateForm=(e)=>{
    e.preventDefault();
    const userId=userData.id;
    const nameValue=nameRef.current.value;
    const ageValue=ageRef.current.value;
    console.log(nameValue,ageValue);
    dispatch(updateUser({id:userId,name:nameValue,age:ageValue}));
    onFormSubmit();
}
  return (
    <div>
      <div className='form'>
        <span>Update Form</span>
        <form onSubmit={UpdateForm}>
        <div className='inputContainer'>
            <label>Name: </label><input type="text" ref={nameRef} defaultValue={userData.name}></input></div>
            <div className='inputContainer'>            <label>Age: </label><input type="number" ref={ageRef} defaultValue={userData.age}></input></div>
            <button type='submit' className='submitBtnForm'>Update</button>
        </form>
        </div>
    </div>
  )
}

export default EditFormUser