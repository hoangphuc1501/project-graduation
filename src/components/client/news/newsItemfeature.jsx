import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCalendarDays, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const NewsItemFeature = ({ news }) => {
    return (
        <div className="flex rounded-[10px] overflow-hidden h-[300px]">
            <div className="w-[45%]">
                <img className="w-full h-full object-cover" src={news.image} alt={news.title} />
            </div>
            <div className="w-[65%] bg-[#FEEFE8] py-[20px] px-[15px]">
                <div className="">
                    <div className="text-[#7f8080] text-[12px] font-[300] flex items-center gap-[20px] pb-[10px]">
                        <div className="flex items-center gap-[6px]">
                            <span><FontAwesomeIcon className="" icon={faCalendarDays} /> </span>
                            <span>{new Date(news.createdAt).toLocaleDateString("vi-VN")}</span>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <span><FontAwesomeIcon className="" icon={faEye} /> </span>
                            <span>{news.Views} </span>
                        </div>
                    </div>
                    <Link to={`/news/${news.slug}`} className="font-[700] text-[20px] text-main mb-[12px] leading-[1.5] line-clamp-2 hover:text-[#000000]">  {news.title}</Link>
                    <p className="font-[300] text-[14px] text-[#000000] mb-[16px] leading-[1.5] line-clamp-5 "
                    dangerouslySetInnerHTML={{ __html: news?.content || "" }}
                    >
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