import { FaHouseUser, FaChevronDown } from "react-icons/fa";
import { MdDashboardCustomize, MdInventory  } from "react-icons/md";
import { FaRegTrashAlt, FaRegNewspaper,  FaUser } from "react-icons/fa";
import { CiSettings, CiLogout, CiViewTable } from "react-icons/ci";
import { LiaJediOrder } from "react-icons/lia";
import { TbBrand4Chan } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./sidebar.css";
const SidebarAdmin = () => {
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
                            <Link to="/admin/user" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Danh sách khách hàng
                            </Link>
                            <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Liên hệ
                            </Link>
                            <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Bình luận
                            </Link>
                            <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
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
                <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><MdInventory  /></span> Tồn kho
                </Link>
                <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><LiaJediOrder  /></span> Đơn hàng
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
                            <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Nhóm quyền
                            </Link>
                            <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Phân quyền
                            </Link>
                            <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-main px-[5px] flex items-center pl-[30px] hover:bg-[rgba(255,255,255,0.3)] rounded-l-[12px]">
                                Tài khoản
                            </Link>
                        </div>
                    </div>
                </div>
                <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><FaRegTrashAlt /></span> Thùng rác
                </Link>
                <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px] mt-[150px]">
                    <span><CiLogout /></span> Đăng xuất
                </Link>
            </div>


        </div>
    )
}

export default SidebarAdmin;