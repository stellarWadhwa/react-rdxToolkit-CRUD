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
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/about",
    element: <About />,
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
