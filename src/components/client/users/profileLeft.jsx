import { Link, useLocation, useNavigate  } from "react-router-dom";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser, CiMedal, CiBookmarkCheck, CiDiscount1    } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineFeedback } from "react-icons/md";
import { toast } from "react-toastify";

const ProfileLeft = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        navigate("/");
        toast.success("Đăng xuất thành công");
    };
    return (

        <>
            <div className="px-[20px] py-[12px] w-full shadow-[0_0px_10px_rgba(221,221,221)] rounded-[10px] overflow-hidden ">
                <ul>
                    <li>
                        <Link 
                        to=""
                        className={`flex items-center gap-[15px] text-[16px] py-[8px] px-[10px] font-[500] hover:text-main mb-[4px] hover:!bg-[#fee] rounded-[8px] ${location.pathname === "/profile" ? "profile-active" : "text-[#686868] bg-transparent border-none" }`}>
                            <span className="text-[20px]"><CiUser /></span>
                            Thông tin tài khoản
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to="history"

                        className={`flex items-center gap-[15px] text-[16px] py-[8px] px-[10px] font-[500] hover:text-main mb-[4px] hover:!bg-[#fee] rounded-[8px] ${location.pathname === "/profile/history" ? "profile-active" : "text-[#686868] bg-transparent border-none" }`}>
                            <span className="text-[20px]"><CiBookmarkCheck /></span>
                            Lịch sử mua hàng
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to="vouchers"
                        className={`flex items-center gap-[15px] text-[16px] py-[8px] px-[10px] font-[500] hover:text-main mb-[4px] hover:!bg-[#fee] rounded-[8px] ${location.pathname === "/profile/discount" ? "profile-active" : "text-[#686868] bg-transparent border-none" }`}>
                            <span className="text-[20px]"><CiDiscount1 /></span>
                            Ưu đãi của bạn
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to="*"
                        className={`flex items-center gap-[15px] text-[16px] py-[8px] px-[10px] font-[500] hover:text-main mb-[4px] hover:!bg-[#fee] rounded-[8px] ${location.pathname === "/" ? "profile-active" : "text-[#686868] bg-transparent border-none" }`}>
                            <span className="text-[20px]"><IoShieldCheckmarkOutline /></span>
                            Tra cứu bảo hành
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to="*"
                        className={`flex items-center gap-[15px] text-[16px] py-[8px] px-[10px] font-[500] hover:text-main mb-[4px] hover:!bg-[#fee] rounded-[8px] ${location.pathname === "/" ? "profile-active" : "text-[#686868] bg-transparent border-none" }`}>
                            <span className="text-[20px]"><CiMedal /></span>
                            Hạng thành viên
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to="*"
                        className={`flex items-center gap-[15px] text-[16px] py-[8px] px-[10px] font-[500] hover:text-main mb-[4px] hover:!bg-[#fee] rounded-[8px] ${location.pathname === "/" ? "profile-active" : "text-[#686868] bg-transparent border-none" }`}>
                            <span className="text-[20px]"><FiPhoneCall /></span>
                            Hỗ trợ
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to="*"
                        className={`flex items-center gap-[15px] text-[16px] py-[8px] px-[10px] font-[500] hover:text-main mb-[4px] hover:!bg-[#fee] rounded-[8px] ${location.pathname === "/" ? "profile-active" : "text-[#686868] bg-transparent border-none" }`}>
                            <span className="text-[20px]"><MdOutlineFeedback /></span>
                            Góp ý - Phản hồi
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to="changePass"
                        className={`flex items-center gap-[15px] text-[16px] py-[8px] px-[10px] font-[500] hover:text-main mb-[4px] hover:!bg-[#fee] rounded-[8px] ${location.pathname === "/profile/changePass" ? "profile-active" : "text-[#686868] bg-transparent border-none" }`}>
                            <span className="text-[20px]"><RiLockPasswordLine /></span>
                            Đổi mật khẩu
                        </Link>
                    </li>
                    <li>
                        <Link 
                        onClick={handleLogout}
                        className="flex items-center gap-[15px] text-[16px] text-[#686868] py-[8px] px-[10px] font-[500] hover:text-main mb-[4px] hover:bg-[#fee] rounded-[8px]">
                            <span className="text-[20px]"><HiMiniArrowLeftStartOnRectangle /></span>
                            Đăng xuất
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ProfileLeft;