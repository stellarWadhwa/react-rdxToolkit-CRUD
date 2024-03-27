import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from "axios"
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../features/userloginSlice';
import Menuu from './antDesignMenu'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const AssignRole = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const userlogin=useSelector(selectUserLogin);
    const [fetchedData,setFetchedData]=useState([])
  const[userIsAdmin,setUserIsAdmin]=useState(true);
    const [currEmail,setCurrEmail]=useState('');
    const [submitShow,setSubmitShow]=useState(false);
    const navigate=useNavigate();

const userRoleToast = () => toast("User Role Updated!");

    useEffect(() => {
if(userlogin.user==null) navigate('/login')
    },[])
    const fetchData=async(userEmail)=>{
        try{
    const res=await axios.post("http://localhost:4000/api/admin/getcreateduser",{
    email:userEmail
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
userRoleToast();
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
  const decodedUser = userlogin.user !== null ? jwtDecode(userlogin.user.token) : null;
  if(decodedUser.user.role!='administrator') setUserIsAdmin(false);

  fetchData(decodedUser.user.email)
        },[])
  return (
    <>
     {userIsAdmin ?
    <div className='wrapperSidebar'>
    {/* <Sidebar /> */}
    <Menuu />
  <div className="assignRoleWrapper">
    <div className='assignRoleTable my-[5rem] ml-[1rem]'>
      <div className='tableTop flex'>
        <span className='flex ml-[2rem] text-gray-500 font-semibold'>User</span>
        <span className='flex ml-[2rem] text-gray-500 font-semibold'>User Mail</span>
        <span className='flex ml-[2rem] text-gray-500 font-semibold'>User Role</span>
        <span className='flex ml-[2rem] text-gray-500 font-semibold'>Select New Role</span>
      </div>
      <div className='roleTableContent'>
      {fetchedData.length !== 0 ? 
      (
        fetchedData.map((data) => {
          
          return (
            
    <div key={data._id} className='flex mt-[2rem] pb-[2rem]'>
      <span className='valTableData flex ml-[2rem] text-gray-400 font-semibold'>{data.name}</span>
      <span className='valTableData flex ml-[2rem] text-gray-400 font-semibold'>{data.email}</span>
      <span className='valTableData flex ml-[2rem] text-gray-400 font-semibold'>{data.role}</span>
      <div className='valTableData'>
      <select name="roles" id="userroles"  onChange={(e)=>handleRoleChange(e,data.email)} className=' flex ml-[2rem] text-gray-400 font-semibold' >
  <option value="employee">Employee</option>
  <option value="intern">Intern</option>
  <option value="subadmin">Sub-admin</option>
  <option value="administrator">Admin</option>
      </select>
{(submitShow && (currEmail==data.email)) && <button onClick={updateRole} className='mt-[0.8rem] bg-blueColor hover:bg-blue-800 text-white text-xs font-bold py-1 px-2 rounded'>change</button>}
</div>
      
    </div>
          );
        })
      ) : (
        <p className='text-gray-400 my-[2rem]'>There are no users created by you.</p>
      )
    }
      </div>
    </div>
  </div>
  </div> :<h2>Forbidden Page!!!</h2>
}
<ToastContainer />
</>
  )
}

export default AssignRole