import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/login/login'
import UserDashboard from './components/userDashboard/userDashboard';
import ViewItems from './components/viewItemsPage/viewItems';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import Cart from './components/cart/cart';
import RiderDashboard from './components/RiderDashboard/RiderDashboard';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CompletedOrders from './components/CompletedOrders/CompletedOrders';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path : "/login" , 
    element : <Login/>,
  },
  {
    path : "/userDashboard",
    element : <UserDashboard/>,
  },
  {
    path : "/userDashboard/viewItems",
    element : <ViewItems />
  },
  {
    path : "/userDashboard/viewItems/:ItemId",
    element : <ProductDetailPage />
  },{
    path :"/userDashboard/viewCart",
    element : <Cart/> 
  },
  {
    path : "/RiderDashboard",
    element : <RiderDashboard/>,
  },
  {
    path : "/CompletedOrders",
    element : <CompletedOrders/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
