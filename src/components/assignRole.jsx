import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../features/userloginSlice';

const AssignRole = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const userlogin=useSelector(selectUserLogin);
    const [fetchedData,setFetchedData]=useState([])
  const[userIsAdmin,setUserIsAdmin]=useState(true);
    const [currEmail,setCurrEmail]=useState('');
    const [submitShow,setSubmitShow]=useState(false);
    const fetchData=async()=>{
        try{
    const res=await axios.post("http://localhost:4000/api/admin/getcreateduser",{
    email:userlogin.user.email
        })
       
        setFetchedData(res.data);
    }catch(err){
        console.log(err)
    }
    }
const updateRole=async()=>{
        try{
const res=await axios.post("http://localhost:4000/api/admin/updateuserrole",{
email:currEmail,
role:selectedRole
})
setSubmitShow(false)
toast(res.data,{
    icon:"✅"
  })
console.log(res)}
catch(err){
    console.log(err)
}
    }
const handleRoleChange = (e,data) => {
    
    setCurrEmail(data)
    setSubmitShow(true)
    setSelectedRole(e.target.value);
  };
  console.log(selectedRole)
    useEffect(()=>{
if(userlogin.user.role!='administrator') setUserIsAdmin(false);
        fetchData()
        },[])
  return (
    <>
     {userIsAdmin ?
    <div className='wrapperSidebar'>
    <Sidebar />
    <div className='assignrolecardcardwrapper'>
        <h2>Users created by you:</h2>
    {fetchedData.length !== 0 ? 
      (
        fetchedData.map((data) => {
          return (
            
            <div key={data._id} className='assignrolecard'>
           <div><span>Email: </span>{data.email}</div>
           <select name="roles" id="userroles" value={{selectedRole} || null} onChange={(e)=>handleRoleChange(e,data.email)}>

  <option value="intern">Intern</option>
  <option value="employee">Employee</option>
  <option value="sub-admin">Sub-admin</option>
  <option value="admin">Admin</option>
  
   </select>
{(submitShow && (currEmail==data.email)) && <button onClick={updateRole}>change</button>}
            </div>
          );
        })
      ) : (
        <p>koko</p>
      )
    }
  </div>
  </div> :<h2>Forbidden Page!!!</h2>
}</>
  )
}

export default AssignRole