
import { Routes, Route } from "react-router-dom";
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
import ProductList from "./pages/admin/products/productList";
import ProducDetailAdmin from "./pages/admin/products/productDetail";
import SearchProduct from "./pages/client/product/searchProduct";
import Category from "./pages/admin/category/Category";
import Khachhang from "./pages/admin/users/Khachhang";
import NewsCategoryAdmin from "./pages/admin/news/newsCategoryadmin";
import AdminNews from "./pages/admin/news/newsAdmin";
import Detailnew from "./pages/client/news/detailnew";
import ColorList from "./pages/admin/products/colorList";
import SizeList from "./pages/admin/products/sizeList";
import Order from "./pages/client/cart/order";
import OrderSuccessfully from "./pages/client/cart/orderSuccess";
import OrderDetail from "./pages/client/order/orderDetail";
import OrderList from "./pages/admin/orders/orderList";
import TestVnpay from "./pages/client/order/testVnpay";
import OrderDetailAdmin from "./pages/admin/orders/orderDetail";
import ZaloPayButton from "./pages/client/cart/zaloPayTest";
import PaymentSuccess from "./pages/client/cart/PaymentSuccess";
import ListRoles from "./pages/admin/roles/ListRole";
import ListPermission from "./pages/admin/permissions/ListPermission";
import Account from "./pages/admin/accounts/listAccount";
import PrivateRoute from "./middleware/PrivateRoute";
import { UserProvider } from "./middleware/UserContext";
import LoginLayout from "./layouts/loginLayout";
import ListBrand from "./pages/admin/brand/listBrand";





function App() {
  return (
    <div>
      <UserProvider>
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
            <Route path="news" element={<News />} />
            {/* <Route path="product" element={<Product />} /> */}
            <Route path="/products/category/:slug" element={<Product />} />
            <Route path="productDetail/:slug" element={<ProductDetail />} />
            <Route path="wishList" element={<Favorite />} />
            <Route path="comparison" element={<Comparison />} />
            <Route path="search" element={<SearchProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Order />} />
            <Route path="orderSuccess" element={<OrderSuccessfully />} />
            <Route path="orderDetail/:orderId" element={<OrderDetail />} />
            <Route path="orderpayment" element={<TestVnpay />} />
            <Route path="newsDeatail" element={<Detailnew />} />
            <Route path="/paymentzalo" element={<ZaloPayButton amount={100000} />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Route>


          {/* Admin Layout */}
          {/* <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product" element={<ProductList />} />
          <Route path="product/:id" element={<ProducDetailAdmin />} />
          <Route path="user" element={<Khachhang />} />
          <Route path="account" element={<Account />} />
          <Route path="category" element={<Category />} />
          <Route path="color" element={<ColorList />} />
          <Route path="size" element={<SizeList />} />
          <Route path="brand" element={<BrandAdmin />} />
          <Route path="newsCategory" element={<NewsCategoryAdmin />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="roles" element={<ListRoles />} />
          <Route path="permissions" element={<ListPermission />} />
          <Route path="orderDetail/:id" element={<OrderDetailAdmin />} />
          
        </Route> */}
          <Route path="loginAdmin" element={<LoginLayout />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="product" element={<ProductList />} />
              <Route path="product/:id" element={<ProducDetailAdmin />} />
              <Route path="user" element={<Khachhang />} />
              <Route path="account" element={<Account />} />
              <Route path="category" element={<Category />} />
              <Route path="color" element={<ColorList />} />
              <Route path="size" element={<SizeList />} />
              <Route path="brand" element={<ListBrand />} />
              <Route path="newsCategory" element={<NewsCategoryAdmin />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="orders" element={<OrderList />} />
              <Route path="roles" element={<ListRoles />} />
              <Route path="permissions" element={<ListPermission />} />
              <Route path="orderDetail/:id" element={<OrderDetailAdmin />} />
            </Route>
          </Route>;

          {/* Catch-all */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </UserProvider>
    </div>

  )
}

export default App;
