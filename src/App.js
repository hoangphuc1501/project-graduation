
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


function App() {
  return (
    <div>
    
      <Routes>
      {/* Client Layout */}
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="contact" element={<Contact />} />
        <Route path="news" element={<News/>} />
        <Route path="product" element={<Product />} />
        <Route path="productDetail" element={<ProductDetail />} />
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
