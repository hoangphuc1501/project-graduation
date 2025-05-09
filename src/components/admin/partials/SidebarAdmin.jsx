import { FaHouseUser, FaChevronDown } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegTrashAlt, FaRegNewspaper,  FaUser } from "react-icons/fa";
import { CiSettings, CiLogout, CiViewTable } from "react-icons/ci";
import { BiSolidDiscount } from "react-icons/bi";
import { TbBrand4Chan } from "react-icons/tb";
import { GiShoppingBag } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { toast } from "react-toastify";
// import { useContext } from "react";
// import { UserContext } from "../../../middleware/UserContext";
const SidebarAdmin = () => {
// const { user, setUser, setToken, fetchAccount  } = useContext(UserContext);
const navigate = useNavigate();
    const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('permissions');
            // setUser(null);
            navigate("/loginAdmin");
            toast.success("Đăng xuất thành công");
        };

    return (
        <div className=" w-full h-full py-[20px] pl-[20px] sidebar">
            <h2 className="flex items-center py-[15px] gap-[30px] text-[20px] text-[#fff] font-[500] pt-[20px] pb-[60px]"><span><FaHouseUser /></span> Trang quản trị</h2>
            <div className="">
                <Link to="/admin/dashboard" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><MdDashboardCustomize /></span> Tổng quan
                </Link>
                <div class="group block w-full" aria-disabled="false" data-dui-accordion-container data-dui-accordion-mode="exclusive">
                    <div class=" rounded-[12px]">
                        <div
                            class="flex items-center justify-between w-full text-left font-[400] text-[#ffffff] text-[16px] cursor-pointer py-[15px] pl-[5px] pr-[20px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]"
                            data-dui-accordion-toggle
                            data-dui-accordion-target="#customStylesAccordion1"
                            aria-expanded="false">
                            <div className="flex items-center gap-[20px] ">
                                <span><CiViewTable /></span> Sản phẩm
                            </div>
                            <FaChevronDown data-dui-accordion-icon />
                        </div>
                        <div id="customStylesAccordion1" class="overflow-hidden transition-all duration-500">
                            <Link to="/admin/category" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Danh mục sản phẩm
                            </Link>
                            <Link to="/admin/product" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Danh sách sản phẩm
                            </Link>
                            <Link to="/admin/color" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Màu sắc
                            </Link>
                            <Link to="/admin/size" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Kích thước
                            </Link>
                            <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Thông số kỹ thuật
                            </Link>
                        </div>
                    </div>

                </div>
                <Link to="/admin/brand" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><TbBrand4Chan /></span> Thương hiệu
                </Link>
                <div class="group block w-full" aria-disabled="false" data-dui-accordion-container data-dui-accordion-mode="exclusive">
                <div class=" rounded-[12px]">
                        <div
                            class="flex items-center justify-between w-full text-left font-[400] text-[#ffffff] text-[16px] cursor-pointer py-[15px] pl-[5px] pr-[20px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]"
                            data-dui-accordion-toggle
                            data-dui-accordion-target="#customStylesAccordion2"
                            aria-expanded="false">
                            <div className="flex items-center gap-[20px] ">
                                <span><FaUser  /></span> Khách hàng
                            </div>
                            <FaChevronDown data-dui-accordion-icon />
                        </div>
                        <div id="customStylesAccordion2" class="overflow-hidden transition-all duration-500">
                            <Link to="/admin/contacts" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Liên hệ
                            </Link>
                            <Link to="/admin/comments" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Bình luận
                            </Link>
                            <Link to="/admin/ratings" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Đánh giá
                            </Link>
                        </div>
                    </div>
                    <div class=" rounded-[12px]">
                        <div
                            class="flex items-center justify-between w-full text-left font-[400] text-[#ffffff] text-[16px] cursor-pointer py-[15px] pl-[5px] pr-[20px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]"
                            data-dui-accordion-toggle
                            data-dui-accordion-target="#customStylesAccordion3"
                            aria-expanded="false">
                            <div className="flex items-center gap-[20px] ">
                                <span><FaRegNewspaper /></span> Bài viết
                            </div>
                            <FaChevronDown data-dui-accordion-icon />
                        </div>
                        <div id="customStylesAccordion3" class="overflow-hidden transition-all duration-500">
                            <Link to="/admin/newsCategory" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Danh mục bài viết
                            </Link>
                            <Link to="/admin/news" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Danh sách bài viết
                            </Link>
                        </div>
                    </div>
                </div>
                <Link to="/admin/vouchers" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><BiSolidDiscount /></span> Mã khuyến mãi
                </Link>
                <Link to="/admin/orders" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><GiShoppingBag /></span> Đơn hàng
                </Link>
                <div class="group block w-full" aria-disabled="false" data-dui-accordion-container data-dui-accordion-mode="exclusive">
                    <div class=" rounded-[12px]">
                        <div
                            class="flex items-center justify-between w-full text-left font-[400] text-[#ffffff] text-[16px] cursor-pointer py-[15px] pl-[5px] pr-[20px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]"
                            data-dui-accordion-toggle
                            data-dui-accordion-target="#customStylesAccordion4"
                            aria-expanded="false">
                            <div className="flex items-center gap-[20px] ">
                                <span><CiSettings /></span> Cài đặt chung
                            </div>
                            <FaChevronDown data-dui-accordion-icon />
                        </div>
                        <div id="customStylesAccordion4" class="overflow-hidden transition-all duration-500">
                            <Link to="/admin/roles" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Nhóm vai trò
                            </Link>
                            <Link to="/admin/permissions" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Nhóm quyền
                            </Link>
                            <Link to="/admin/account" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Tài khoản
                            </Link>
                        </div>
                    </div>
                </div>
                <Link to="/admin/trashs/categoryProduct" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><FaRegTrashAlt /></span> Thùng rác
                </Link>
                <Link 
                onClick={handleLogout}
                className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px] mt-[150px]">
                    <span><CiLogout /></span> Đăng xuất
                </Link>
            </div>


        </div>
    )
}

export default SidebarAdmin;