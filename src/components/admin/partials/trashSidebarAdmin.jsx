import { FaHouseUser, FaRegTrashAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { BiSolidDiscount } from "react-icons/bi";
import { TbBrand4Chan } from "react-icons/tb";
import { FaNewspaper } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { IoIosResize, IoIosColorPalette } from "react-icons/io";
import { Link } from "react-router-dom";
import "./sidebar.css";
const trashsSidebarAdmin = () => {
    return (
        <div className=" w-full h-full py-[20px] pl-[20px] sidebar">
            <h2 className="flex items-center py-[15px] gap-[30px] text-[20px] text-[#fff] font-[500] pt-[20px] pb-[60px]"><span><FaRegTrashAlt /></span> Trang thùng rác</h2>
            <div className="">
                <Link to="/admin/trashs/categoryProduct" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><MdCategory /></span> Danh mục sản phẩm
                </Link>
                <Link to="/admin/trashs/brands" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><TbBrand4Chan /></span> Thương hiệu
                </Link>
                <Link to="/admin/trashs/products" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><AiFillProduct /></span> Sản phẩm
                </Link>
                <Link to="/admin/trashs/colors" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><IoIosColorPalette /></span> Màu sắc
                </Link>
                <Link to="/admin/trashs/sizes" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><IoIosResize /></span> Kích thước
                </Link>
                <Link to="/admin/trashs/vouchers" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><BiSolidDiscount /></span> Mã giảm giá
                </Link>
                <Link to="/admin/trashs/newsCategory" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><MdCategory /></span> Danh mục bài viết
                </Link>
                <Link to="/admin/trashs/news" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><FaNewspaper /></span> Bài viết
                </Link>
                <Link to="/admin/dashboard" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px]">
                    <span><FaHouseUser /></span> Trang quản trị
                </Link>
                <Link to="" className="text-[16px] text-[#fff] font-[500] py-[15px] hover:text-[#fff] hover:bg-[rgba(255,255,255,0.3)] px-[5px] flex items-center gap-[20px] rounded-l-[12px] mt-[150px]">
                    <span><CiLogout /></span> Đăng xuất
                </Link>
            </div>


        </div>
    )
}

export default trashsSidebarAdmin;