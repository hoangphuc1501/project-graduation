import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMagnifyingGlass, faMapLocationDot   } from '@fortawesome/free-solid-svg-icons';
import React from "react";

const Header = () => {
    return (
        <header className="">
            <div className="container mx-auto px-[16px]">
                <div className="flex justify-between h-[90px] items-center">
                    <a href="" className="w-[100px] h-[60px]">
                        <img className="w-full h-full" src="https://cdn.shopvnb.com/themes/images/logo.svg" alt="" />
                    </a>
                    <p className="flex gap-[10px] text-[16px] font-[300] uppercase">
                        <span className='text-main'>
                            <FontAwesomeIcon icon={faMapLocationDot} />
                        </span>
                        Hệ thống cửa hàng
                        </p>
                    <form action="" className="">
                        <input type="text" placeholder="Tìm kiếm" className="" />
                        <button className=""><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </form>
                    <div className="">
                        <div className="">
                            <a href="">
                                <span className=""> <FontAwesomeIcon icon={faUser} /></span>
                                <span className="">Tài khoản</span>
                            </a>
                            <ul>
                                <li><a href=""> Kiểm tra đơn hàng</a></li>
                                <li><a href="">Kiểm tra bảo hành</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;