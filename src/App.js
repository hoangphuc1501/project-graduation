
import {Routes, Route } from "react-router-dom";
import './App.css';
import ClientLayout from './layouts/ClientLayout';
import Contact from './pages/client/contacts/contact';
import HomePage from './pages/client/home/homePage';
import Product from './pages/client/product/product';
import ProductDetail from './pages/client/product/productDetail';
import ForgotPassword from './pages/client/users/forgotPassword';
import Login from './pages/client/users/login';
import Register from './pages/client/users/register';
import AdminLayout from "./layouts/AdminLayout";
import Profile from "./pages/client/users/profile";
import Page404 from "./pages/client/errors/404";
import News from "./pages/client/news/news";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Favorite from "./pages/client/product/favorite";
import Cart from "./pages/client/cart/cart";
import ConfirmOtp from "./pages/client/users/confirmOtp";
import { Info } from "./components/client/users/info";
import { ShoppingHistory } from "./components/client/users/shoppingHistory";
import { ChangePass } from "./components/client/users/changePass";
import { Discount } from "./components/client/users/discount";
import Comparison from "./pages/client/comparison/comparison";


function App() {
  return (
    <div>
    
      <Routes>
      {/* Client Layout */}
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="profile/" element={<Profile />} /> */}
        <Route path="profile" element={<Profile />}>
          <Route index element={<Info />} />
          <Route path="history" element={<ShoppingHistory />} />
          <Route path="changePass" element={<ChangePass />} />
          <Route path="discount" element={<Discount />} />
        </Route>
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="confirmOtp" element={<ConfirmOtp />} />
        <Route path="contact" element={<Contact />} />
        <Route path="news" element={<News/>} />
        <Route path="product" element={<Product />} />
        <Route path="productDetail" element={<ProductDetail />} />
        <Route path="wishList" element={<Favorite/>} />
        <Route path="comparison" element={<Comparison/>} />
        <Route path="cart" element={<Cart/>} />
      </Route>

    
      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="dashboard" element={<Dashboard/>} />
        {/* <Route path="users" element={<Users />} /> */}
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Page404/>} />
    </Routes>
    </div>

  )
}

export default App;
