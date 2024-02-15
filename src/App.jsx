
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, deleteUser, selectUsers, updateUser } from './features/usersSlice';
import { useEffect,useState } from 'react';
import FormUser from './components/formUser';
import EditFormUser from './components/editFormUser';

function App() {
  const dispatch = useDispatch();
  const [showedEditForm,setShowEditForm]= useState(false);
  const [editUserData,setEditUserData]=useState([]);
  const [showAddForm, setShowAddForm]= useState(false);
  // dispatch(addUser({ name: 'koko', age: 12 }));
useEffect(()=>{
  setShowEditForm(false);
 },[dispatch])

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
  console.log(user)
}

function editSucces(){
  setShowEditForm(false);
}
function addSucces(){
  setShowAddForm(false);
}

const users=useSelector(selectUsers);

  return (
    <>
    <div className='mainApp'>
    <button className='addUserBtn' onClick={handleAddUserButton}>Add Users</button>
        {showAddForm && <FormUser onFormSubmit={addSucces}/>}
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
)):<p>😥😥There are no users right now, please add!</p>}
       
        
        </div>
        </div>
        </div>
    </>
  )
}

export default App