import "../App.css"
import { useDispatch, useSelector } from 'react-redux'
import { addUser, deleteUser, selectUsers, updateUser } from '../features/usersSlice';
import { useEffect,useState } from 'react';
import FormUser from './formUser';
import EditFormUser from './editFormUser';
import {logout, selectUserLogin} from "../features/userloginSlice"
import { useNavigate } from "react-router-dom"; 

function CrudOperations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showedEditForm,setShowEditForm]= useState(false);
  const [editUserData,setEditUserData]=useState([]);
  const [showAddForm, setShowAddForm]= useState(false);
  const userLogin=useSelector(selectUserLogin);
  

useEffect(()=>{
  setShowEditForm(false);
 },[dispatch])

 useEffect(()=>{
  if(userLogin.user==null){
    navigate("/login");
  }
  },[])

function handleDelete(id){
console.log(id);
dispatch(deleteUser(id)); 
}
function handleAddUserButton(){
  setShowAddForm(true);
}

function handleUpdate(user){
  setEditUserData(user)
  setShowEditForm(true);
}


function editSucces(){
  setShowEditForm(false);
}
function closeForm(){
  setShowAddForm(false);
}
function addSucces(){
  setShowAddForm(false);
}

const users=useSelector(selectUsers);

return (
    <>


    <div className='mainApp'>
<button className='addUserBtn' onClick={handleAddUserButton} >Add Data</button>
        {showAddForm && <FormUser onFormSubmit={addSucces}  handleClose={closeForm}/>}
              {showedEditForm && <EditFormUser userData={editUserData} onFormSubmit={editSucces}/> }

    <div className='cardP'>
      <div className='card'>
        
{users.length!=0? users.map((user) => (
        <>

        
        <div className='carddiv'>
  <p>User Name: {user.name}</p>
  <span>User Age: {user.age}</span>
<div>
  <button className='cardBtn' onClick={()=>handleDelete(user.id)}>delete</button>
  <button className='cardBtn' onClick={()=>handleUpdate(user)}>update</button>
  </div>
  </div>
  
  </>
)):<h2>😥😥There is no data right now, please add!</h2>}
       
        
        </div>
        </div>
        </div>

    </>
  )
}

export default CrudOperations
