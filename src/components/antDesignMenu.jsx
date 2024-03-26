import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";

import {
  AppstoreOutlined,
  ProfileOutlined,
  InfoCircleOutlined,
  ControlOutlined,
  UserAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  CrownOutlined,
  KeyOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserLogin } from '../features/userloginSlice';

const { SubMenu } = Menu;

const App = () => {
  const userLogin=useSelector(selectUserLogin);
  if (userLogin != null && userLogin.user != null && userLogin.user.token != null) {
    var decodedUser = jwtDecode(userLogin.user.token);
  }
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (e) => {
    setSelectedKeys([e.key]);
  };


  const dispatch=useDispatch();
  const navigate=useNavigate();


  function  handleLogout(){
    dispatch(logout());
    setTimeout(()=>{
      toast("Logged In",{
        icon:"✅"
      });
      navigate("/login");
    },1000)
      }
  useEffect(()=>{
if(decodedUser?.user==null){
  toast("Logged Out",{
    icon:"✅"
  })
}},[userLogin])
// console.log(decodedUser?.user?.role)
const menuusernamecollapsed={content: '',width: "7px",height: "7px",
// background: userLogin.user.role=="administrator"?'#FF004D':"#000000",
background:'#FF004D',
borderRadius: "13px",position: "absolute",left: "2.2rem", top: "1rem",display: "block"}
const menuusername ={content: '',width: "7px",height: "7px",
// background: userLogin.user.role=="administrator"?'#FF004D':"#000000",
background:'#FF004D',
borderRadius: "13px",marginRight: "1.5rem"} 
return (
    <div className='antmenu'>
      <Menu
        className='menu-container'
        selectedKeys={selectedKeys}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        onClick={handleClick}
      >
        {/* <Menu.Item className="menuusername" > */}
        <Menu.Item className={collapsed ? {menuusernamecollapsed}:{menuusername}} >
          {!collapsed && decodedUser && decodedUser.user &&<span>Welcome! {decodedUser.user.name}</span>}
        </Menu.Item>
        <Menu.Item key="1" icon={<DashboardOutlined style={{fontSize:"22px"}}/>} >
          <NavLink to="/" activeClassName="active">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<InfoCircleOutlined style={{fontSize:"22px"}}/>}>
          <NavLink to="/about" activeClassName="active">About</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<ProfileOutlined style={{fontSize:"22px"}}/>}>
          <NavLink to="/profile" activeClassName="active">Profile</NavLink>
        </Menu.Item>
        {decodedUser && decodedUser.user && decodedUser.user.role==="administrator" &&

        <SubMenu key="sub1" icon={<ControlOutlined style={{fontSize:"22px"}}/>} title="Admin Controls">
          <Menu.Item key="5" icon={<UserAddOutlined style={{fontSize:"22px"}}/>}>
            <NavLink to="/admin/adduser" activeClassName="active">Add Users</NavLink>
          </Menu.Item>
          <Menu.Item key="6" icon={<CrownOutlined style={{fontSize:"22px"}}/>}>
            <NavLink to="/admin/assignroles" activeClassName="active">Assign User Roles</NavLink>
          </Menu.Item>
          <Menu.Item key="7" icon={<KeyOutlined style={{fontSize:"22px"}}/>}>
            <NavLink to="/admin/usercontols" activeClassName="active">User Controls</NavLink>
          </Menu.Item>
        </SubMenu>
        }
        <Menu.Item key="8" icon={<LogoutOutlined style={{fontSize:"22px"}}/>} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
      <Button
        className='buttonMenu'
        type="default"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
};

export default App;
