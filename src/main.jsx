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

// const userLogin=useSelector(selectUserLogin)

const router = createBrowserRouter([
  
  {

    path: "/",
    
    element: <App />,
    
  }
  ,{
    path: "/login",
    element: <Login />,
  }
  
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={reduxStore}>
 <RouterProvider router={router} />
    </Provider>,
)
