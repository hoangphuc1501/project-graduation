import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const NewsItem = () => {
    return(
        <div className="relative box-hidden">
            <div className="rounded-[20px] truncate h-[312px] animation">
                <img className="w-full h-full object-cover" src="https://static.fbshop.vn/wp-content/uploads/2025/01/469379050_1047825237143953_2006640164848395000_n.gif" alt="" />
            </div>
            <div className="absolute bottom-[-200px]  py-[10px] px-[15px] w-full h-[312px] rounded-[20px] hover:bg-[#FEEFE8]  animation hover:bottom-[0px]">
                <div className="w-full mb-[180px]">
                    <p className="font-[400] text-[14px] text-[#FFFFFF] pb-[12px]">15 Tháng Một, 2025</p>
                    <h3 className="font-[700] text-[20px] text-[#FFFFFF] mb-[12px] leading-[1.3] line-clamp-2">
                        <Link to="*" className="hover:text-main">So Sánh Vợt Lining 6000 và Lining 9000. Đâu là sự lựa chọn tốt hơn cho bạn?</Link>
                        </h3>
                </div>
                <button className="flex gap-x-[8px] items-center font-[500] text-main text-[16px] hover:text-black ">
                    Xem chi tiết 
                    <FontAwesomeIcon className="arrow-rotota" icon={faArrowUp} />
                </button>
            </div>
        </div>
    )
}

export default NewsItem;