import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserLogin } from '../features/userloginSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';


const Sidebar = () => {
  const [dashboardurl,setDashboardUrl]=useState('');
  const currentWin=window.location.href.split('/')[3];
  useEffect(()=>{
    if(currentWin==about){
      
    }
  })
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const userLogin=useSelector(selectUserLogin);
  function handleLogout(){
    dispatch(logout());
    setTimeout(()=>{
      toast("Logged In",{
        icon:"✅"
      });
      navigate("/login");
    },1000)
      }
  useEffect(()=>{
if(userLogin.user==null){
  toast("Logged Out",{
    icon:"✅"
  })
}},[userLogin])

return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', position: 'absolute', top:0, left:0 }}>
      <CDBSidebar textColor="#fff" backgroundColor="#E78895">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
               <CDBSidebarMenuItem icon="user-circle">    {userLogin.user && 
          <span class="userNameDashboard">Welcome! {userLogin.user.name}</span>}
</CDBSidebarMenuItem> 
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/about" activeClassName="activeClicked">
              <CDBSidebarMenuItem>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style={{width:'1.5rem', marginRight:'1rem'}}>
  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg>
About</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <CDBSidebarMenuItem onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style={{width:'1.5rem', marginRight:'1rem'}}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
</svg>
Logout</CDBSidebarMenuItem>

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <Toaster />     
    </div>

  );
};

export default Sidebar;