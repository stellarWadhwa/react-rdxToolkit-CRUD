import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/usersSlice';

const FormUser = ({onFormSubmit,handleClose}) => {
    const userNameRef = useRef();
    const userAgeRef = useRef();
    const dispatch=useDispatch();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const name = userNameRef.current.value;
        const age = userAgeRef.current.value;

        dispatch(addUser({name, age}));    

        // Clear the input fields if needed
        userNameRef.current.value = '';
        userAgeRef.current.value = '';
        onFormSubmit();
    };

    return (
        <div className='form'>
        <button onClick={handleClose} className='closeformbtn'>❌</button>
            <span>Add User</span>
            <form onSubmit={handleSubmit}>
                <div className='inputContainer'>
                <label>Name: </label>
                <input type="text" ref={userNameRef} required /></div>
                
                <div className='inputContainer'><label>Age: </label>
                <input type="number" ref={userAgeRef} maxlength="4"/></div>
                <button type="submit" className='submitBtnForm'>Submit</button>
            </form>
        </div>
    );
};

export default FormUser;
