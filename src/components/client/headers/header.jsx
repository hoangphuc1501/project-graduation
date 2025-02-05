import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faMagnifyingGlass,
    faMapLocationDot,
    faCartPlus,
    faReceipt,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useContext  } from "react";
import { toast } from 'react-toastify';
import { UserContext } from "../../../middleware/UserContext";
import { useNavigate } from 'react-router-dom';


const Header = () => {

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
        <header className="">
            <div className="container mx-auto px-[16px]">
                <div className="flex justify-between h-[90px] items-center gap-[40px]">
                    <Link to="/" className="w-[100px] h-[60px]">
                        <img
                            className="w-full h-full"
                            src="https://cdn.shopvnb.com/themes/images/logo.svg"
                            alt=""
                        />
                    </Link>
                    <p className="flex gap-[10px] text-[16px] font-[500] uppercase">
                        <span className="text-main">
                            <FontAwesomeIcon icon={faMapLocationDot} />
                        </span>
                        Hệ thống cửa hàng
                    </p>
                    <form
                        action=""
                        className="flex-1 flex py-[10px] px-[15px] rounded-[8px] bg-[#f3f3f3]"
                    >
                        <input
                            type="text"
                            placeholder="Tìm sản phẩm..."
                            className="flex-1 bg-transparent"
                        />
                        <button className="text-main text-[16px] px-[5px]">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                    <div className="flex gap-[20px]">
                        <div className="relative group">
                            <div
                                className="flex flex-col justify-center items-center gap-y-[4px] hover:text-main ">
                                <span className="border border-[#dddddd] py-[4px] px-[8px] text-main  rounded-[50%]">
                                    <FontAwesomeIcon
                                        icon={faReceipt}
                                        style={{ fontSize: "18px" }}
                                    />
                                </span>
                                <span className="text-[14px] font-[500] text-[#231f20]">
                                    Tra cứu
                                </span>
                            </div>
                            <ul className="absolute w-[180px] bg-white text-black rounded-[10px] top-[60px] left-[-50px] hidden group-hover:block shadow-[0_0_5px_rgba(35,31,32,0.5)] z-[999]">
                                <li>
                                    <Link to="*"
                                        className="text-[14px] text-center text-black block py-[5px] rounded-[8px] hover:bg-main hover:!text-white">
                                        Kiểm tra đơn hàng
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="*"
                                        className="text-[14px] text-center text-black block py-[5px] rounded-[8px] hover:bg-main hover:!text-white"
                                    >
                                        Kiểm tra bảo hành
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="relative group">
                            <div
                                className="flex flex-col justify-center items-center gap-y-[4px] hover:text-main "
                            >
                                <span className="border border-[#dddddd] py-[4px] px-[8px] text-main  rounded-[50%]">
                                    <FontAwesomeIcon icon={faUser} style={{ fontSize: "18px" }} />
                                </span>
                                <span className="text-[14px] font-[500] text-[#231f20]">
                                    Tài khoản
                                </span>
                            </div>
                            <ul className="absolute w-[180px] bg-white text-black rounded-[10px] top-[60px] left-[-50px] hidden group-hover:block shadow-[0_0_5px_rgba(35,31,32,0.5)] z-[999]">
                            {!user ? (
                                <>
                                    <li>
                                        <Link
                                            to="/login"
                                            className="text-[14px] text-center text-black block py-[5px] rounded-[8px] hover:bg-main hover:!text-white">
                                            Đăng nhập
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/register"
                                            className="text-[14px] text-center text-black block py-[5px] rounded-[8px] hover:bg-main hover:!text-white">
                                            Đăng ký
                                        </Link>
                                    </li>
                                </>
                                ):(
                                    <>
                                    <li>
                                        <Link
                                            to="/profile"
                                            className="text-[14px] text-center text-black block py-[5px] rounded-[8px] hover:bg-main hover:!text-white">
                                            {user.fullname}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            onClick={handleLogout}
                                            className="text-[14px] text-center text-black block py-[5px] rounded-[8px] hover:bg-main hover:!text-white">
                                            Đăng xuất
                                        </Link>
                                    </li>
                                </>
                                )}
                            </ul>
                        </div>
                        <div className="relative group">
                            <Link
                                to="*"
                                className="flex flex-col justify-center items-center gap-y-[4px] hover:text-main ">
                                <span className="border border-[#dddddd] py-[4px] px-[8px] text-main  rounded-[50%]">
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        style={{ fontSize: "18px" }}
                                    />
                                </span>
                                <span className="text-[14px] font-[500] text-[#231f20]">
                                    Yêu thích
                                </span>
                            </Link>
                        </div>
                        <div className="relative group">
                            <Link
                                to="*"
                                className="flex flex-col justify-center items-center gap-y-[4px] hover:text-main ">
                                <span className="border border-[#dddddd] py-[4px] px-[8px] text-main  rounded-[50%]">
                                    <FontAwesomeIcon
                                        icon={faCartPlus}
                                        style={{ fontSize: "18px" }}
                                    />
                                </span>
                                <span className="text-[14px] font-[500] text-[#231f20]">
                                    Giỏ hàng
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <button className="text-[16px] text-white bg-[linear-gradient(30deg,_#f57f20,_#d62b08_100%)] rounded-[45px] font-[500] py-[10px] px-[20px]">
                            Tư vấn ngay
                        </button>
                    </div>
                </div>
            </div>
            <nav className="bg-main">
                <div className="container mx-auto px-[16px]">
                    <ul className="flex items-center gap-[40px] justify-center">
                        <li><Link to="*" className="py-[10px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]" >Trang chủ</Link></li>
                        <li><Link to="*" className="py-[10px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]" >Giới thiệu</Link></li>
                        <li><Link to="/product" className="py-[10px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]" >Sản phẩm</Link></li>
                        <li><Link to="*"  className="py-[10px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]" >Chính sách nhượng quyền</Link></li>
                        <li><Link to="*"  className="py-[10px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]" >Hướng dẫn</Link></li>
                        <li><Link to="/news"  className="py-[10px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]">Tin tức</Link></li>
                        <li><Link to="/contact" className="py-[10px] inline-block text-white font-[500] text-[14px] uppercase px-[10px]" >Liên hệ</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
