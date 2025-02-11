import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCalendarDays, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const NewsItemFeature = () => {
    return (
        <div className="flex rounded-[10px] overflow-hidden h-[300px]">
            <div className="w-[45%]">
                <img className="w-full h-full object-cover" src="https://static.fbshop.vn/wp-content/uploads/2025/01/469379050_1047825237143953_2006640164848395000_n.gif" alt="" />
            </div>
            <div className="w-[65%] bg-[#FEEFE8] py-[20px] px-[15px]">
                <div className="">
                    <div className="text-[#7f8080] text-[12px] font-[300] flex items-center gap-[20px] pb-[10px]">
                        <div className="flex items-center gap-[6px]">
                            <span><FontAwesomeIcon className="" icon={faCalendarDays} /> </span>
                            <span>15 Tháng Một, 2025</span>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <span><FontAwesomeIcon className="" icon={faEye} /> </span>
                            <span>15 </span>
                        </div>
                    </div>
                    <Link to="*" className="font-[700] text-[20px] text-main mb-[12px] leading-[1.5] line-clamp-2 hover:text-[#000000]">So Sánh Vợt Lining 6000 và Lining 9000. Đâu là sự lựa chọn tốt hơn cho bạn?</Link>
                    <p className="font-[300] text-[14px] text-[#000000] mb-[16px] leading-[1.5] line-clamp-5 ">
                    Với sự nổi bật trong dòng vợt cầu lông của thương hiệu Yonex, Astrox 77 Đỏ đã trở thành lựa chọn yêu thích của nhiều tay vợt chuyên nghiệp và nghiệp dư. Tuy nhiên, liệu giá thành của chiếc vợt này có thực sự xứng đáng với hiệu năng và trải nghiệm mà nó
                    </p>
                </div>
                <Link to="*" className="font-[400] text-[16px] text-[#000000] flex items-center gap-[8px] hover:text-main">
                    Xem chi tiết
                    <FontAwesomeIcon className="arrow-rotota" icon={faArrowUp} />
                </Link>
            </div>
        </div>
    )
}

export default NewsItemFeature;