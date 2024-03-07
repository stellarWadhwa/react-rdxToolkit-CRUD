import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../features/userloginSlice';
import Menuu from './antDesignMenu'
import { useNavigate } from 'react-router-dom';

const AssignRole = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const userlogin=useSelector(selectUserLogin);
    const [fetchedData,setFetchedData]=useState([])
  const[userIsAdmin,setUserIsAdmin]=useState(true);
    const [currEmail,setCurrEmail]=useState('');
    const [submitShow,setSubmitShow]=useState(false);
    const navigate=useNavigate();
    useEffect(() => {
if(userlogin.user==null) navigate('/login')
    },[])
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
toast("Logged In",{
  icon:"✅"
});
console.log(res.data)
setSubmitShow(false)
}
catch(err){
    console.log(err)
}
    }
const handleRoleChange = (e,data) => {
    setCurrEmail(data);
    setSubmitShow(true);
    setSelectedRole(e.target.value);
  };
    useEffect(()=>{
if(userlogin.user.role!='administrator') setUserIsAdmin(false);
        fetchData()
        },[])
  return (
    <>
     {userIsAdmin ?
    <div className='wrapperSidebar'>
    {/* <Sidebar /> */}
    <Menuu />
    <div className='assignrolecardcardwrapper'>
        <h2>Users created by you:</h2>
    {fetchedData.length !== 0 ? 
      (
        fetchedData.map((data) => {
          
          return (
            
            <div key={data._id} className='assignrolecard'>
            <div className='assignrolecarddiv'>
            <span>User: {data.name}</span>
            <span>Current Role: {data.role}</span>
           <div><span>Email: </span>{data.email}</div>
           <select name="roles" id="userroles"  onChange={(e)=>handleRoleChange(e,data.email)} 
                     >

  <option value="intern" >Intern</option>
  <option value="employee">Employee</option>
  <option value="subadmin">Sub-admin</option>
  <option value="administrator">Admin</option>
  
   </select>
{(submitShow && (currEmail==data.email)) && <button onClick={updateRole} style={{marginLeft:"0.5rem"}}>change</button>}
            </div>
            
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