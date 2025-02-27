import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useContext } from "react";
import { toast } from 'react-toastify';
import { UserContext } from "../../../middleware/UserContext";
import { useNavigate } from 'react-router-dom';
import CartModal from "../cart/cartModal";
import ContactModal from "../contact/contactModal";
import WishListModal from "../wishlist/wishListModal";
import { ListButtonAnimation } from "../buttons/listButtonAnimation";
import BrandList from "./brandList";
import CategoryList from "./categoryList";
import { FaChevronDown, FaHeart, FaMapLocationDot, FaCodeCompare,  } from "react-icons/fa6";
import { FaUserPlus, FaUser   } from "react-icons/fa";
import { BsBoxArrowLeft } from "react-icons/bs";
import { nodeAPI } from "../../../utils/axiosCustom";
import SearchForm from "./searchForm";
import { FaCartPlus } from "react-icons/fa";

const Header = (props) => {
    const [showModalCart, setShowModalCart] = useState(false);
    const [showModalContactForm, setShowModalContactForm] = useState(false);
    const [showModalWishList, setShowModalWishList] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    // hàm đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate("/");
        toast.success("Đăng xuất thành công");
    };

    return (
        <header className="z-[999]">
            <div className="container mx-auto px-[16px]">
                <div className="flex justify-between h-[90px] items-center gap-[40px]">
                    <Link to="/" className="w-[100px] h-[80px]">
                        <img
                            className="w-full h-full"
                            src="https://res.cloudinary.com/dyoestl0x/image/upload/v1740494788/hchpsyiqngpziwkfn83y.png"
                            alt=""
                        />
                    </Link>
                    <p className="flex items-center gap-[10px] text-[16px] font-[500] uppercase">
                        <span className="text-main text-[18px]">
                            <FaMapLocationDot/>
                        </span>
                        Hệ thống cửa hàng
                    </p>
                    <SearchForm />
                    <div className="flex gap-[20px]">
                        <div className="relative group">
                            <Link
                                to="/comparison"
                                className="flex flex-col justify-center items-center gap-y-[4px] hover:text-main ">
                                <span className="border border-[#dddddd] py-[4px] px-[8px] text-main  rounded-[50%] text-[18px]">
                                    <FaCodeCompare/>
                                </span>
                                <span className="text-[14px] font-[500] text-[#231f20]">
                                    So sánh
                                </span>
                            </Link>
                        </div>
                        <div className="relative group">
                            <div
                                className="flex flex-col justify-center items-center gap-y-[4px] hover:text-main "
                            >
                                <span className="border border-[#dddddd] py-[4px] px-[8px] text-main  rounded-[50%] text-[18px]">
                                <FaUser />
                                </span>
                                <span className="text-[14px] font-[500] text-[#231f20]">
                                    Tài khoản
                                </span>
                            </div>
                            <ul className="absolute w-[180px] bg-white text-black rounded-[10px] top-[55    px] left-[-50px] hidden group-hover:block shadow-[0_0_5px_rgba(35,31,32,0.5)] z-[999]">
                                {!user ? (
                                    <>
                                        <li>
                                            <Link
                                                to="/login"
                                                className="text-[14px] text-black py-[7px] rounded-[8px] hover:bg-main hover:!text-white flex items-center gap-[6px] justify-center">
                                                <span><FaUser /></span>
                                                Đăng nhập
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/register"
                                                className="text-[14px] text-center text-black py-[7px] rounded-[8px] hover:bg-main hover:!text-white flex items-center gap-[6px] justify-center">
                                                <span><FaUserPlus /></span>
                                                Đăng ký
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="text-[14px] text-center text-black block py-[7px] rounded-[8px] hover:bg-main hover:!text-white">
                                                {user.fullname}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                onClick={handleLogout}
                                                className="text-[14px] text-center text-black py-[7px] rounded-[8px] hover:bg-main hover:!text-white flex items-center gap-[6px] justify-center">
                                                <span><BsBoxArrowLeft /></span>
                                                Đăng xuất
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        <div className="relative group">
                            <Link
                                onClick={() => setShowModalWishList(true)}
                                className="flex flex-col justify-center items-center gap-y-[4px] hover:text-main ">
                                <span className="border border-[#dddddd] py-[4px] px-[8px] text-main  rounded-[50%] text-[18px]">
                                    <FaHeart />
                                </span>
                                <span className="text-[14px] font-[500] text-[#231f20]">
                                    Yêu thích
                                </span>
                            </Link>
                        </div>
                        <div className="relative group">
                            <Link
                                onClick={() => setShowModalCart(true)}
                                className="flex flex-col justify-center items-center gap-y-[4px] hover:text-main ">
                                <span className="border border-[#dddddd] py-[4px] px-[8px] text-main  rounded-[50%] text-[18px]">
                                    <FaCartPlus/>
                                </span>
                                <span className="text-[14px] font-[500] text-[#231f20] " >
                                    Giỏ hàng
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <ListButtonAnimation
                            type="button"
                            text="tư vấn ngay"
                            onClick={() => setShowModalContactForm(true)}
                        />
                    </div>
                </div>
            </div>
            <nav className="bg-main relative w-full">
                <div className="container mx-auto px-[16px]">
                    <ul className="flex items-center gap-[40px] justify-center w-full">
                        <li><Link to="/" className="py-[16px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]" >Trang chủ</Link></li>
                        <li><Link to="*" className="py-[16px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]" >Giới thiệu</Link></li>
                        <li className="group">
                            <Link to="/product" className="py-[16px] inline-flex gap-[10px] items-center text-white font-[500] text-[14px] uppercase px-[10px] " >
                                Sản phẩm
                                <FaChevronDown className="transition-transform duration-500 group-hover:rotate-[-180deg]" />
                            </Link>
                            <CategoryList />
                        </li>
                        <li className="relative group">
                            <Link to="*" className="py-[16px] inline-flex gap-[10px] items-center text-white font-[500] text-[14px] uppercase px-[10px] " >
                                Thương hiệu
                                <FaChevronDown className="transition-transform duration-500 group-hover:rotate-[-180deg]" />
                            </Link>
                            <BrandList />
                        </li>
                        <li><Link to="*" className="py-[16px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]" >Hướng dẫn</Link></li>
                        <li><Link to="/news" className="py-[16px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]">Tin tức</Link></li>
                        <li><Link to="/contact" className="py-[16px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]" >Liên hệ</Link></li>
                    </ul>
                </div>
            </nav>
            <CartModal
                showCart={showModalCart}
                setShowCart={setShowModalCart}
            />
            <ContactModal
                showContactForm={showModalContactForm}
                setShowContactForm={setShowModalContactForm}
            />
            <WishListModal
                showWishList={showModalWishList}
                setShowWishList={setShowModalWishList}
            />
        </header>
    );
};

export default Header;
