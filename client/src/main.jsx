import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import PrivateRoute from './Components/PrivateRoute';

// Auth
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

import AdminRoutes from './Pages/Admin/AdminRoutes';
import Profile from './Pages/User/Profile';
import UserList from './Pages/Admin/UserList';

import CategoryList from './Pages/Admin/CategoryList';

import ProductList from './Pages/Admin/ProductList';
import AllProducts from './Pages/Admin/AllProducts';
import ProductUpdate from './Pages/Admin/ProductUpdate';

import Home from './Pages/Home.jsx';
import Favorites from './Pages/Products/Favorites.jsx';
import ProductDetails from './Pages/Products/ProductDetails.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route index={true} path='/' element={<Home />} />
      <Route path='/favorite' element={<Favorites />} />
      <Route path='/product/:id' element={<ProductDetails />} />

      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
      </Route>

      <Route path='/admin' element={<AdminRoutes />}>
        <Route path='userlist' element={<UserList />} />
        <Route path='categorylist' element={<CategoryList />} />
        <Route path='productlist' element={<ProductList />} />
        <Route path='allproductslist' element={<AllProducts />} />
        <Route path='productlist/:pageNumber' element={<ProductList />} />
        <Route path='product/update/:_id' element={<ProductUpdate />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
