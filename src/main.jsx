import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { reduxStore } from './store/store.js';
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/login.jsx';
import Profile from './components/Profile.jsx';
import About from './components/about.jsx';
import PageNotFound from './components/pageNotFound.jsx';
import Register from './components/register.jsx';
import AddUser from './components/addUser.jsx';
import UserControls from './components/userControls.jsx';
import AssignRole from './components/assignRole.jsx';
// const userLogin=useSelector(selectUserLogin)

const router = createBrowserRouter([  
  {
    path: "/",
    element: <App />,
  }
  ,{
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/admin/adduser",
    element: <AddUser />,
  },
    {
    path: "/admin/usercontols",
    element: <UserControls />,
  },
  {
    path:"/admin/assignroles",
    element:<AssignRole />
  },
  {  path:"*",
  element: <PageNotFound />}

  ]);
  let persistor=persistStore(reduxStore);
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={reduxStore}>
    <PersistGate persistor={persistor}>
 <RouterProvider router={router} />
 </PersistGate>
    </Provider>,
)
