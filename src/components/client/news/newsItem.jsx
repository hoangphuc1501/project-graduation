import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const NewsItem = ({ news }) => {
    return (
        <div className="relative box-hidden">
            <div className="rounded-[20px] truncate h-[312px] animation">
                <img className="w-full h-full object-cover" src={news?.image} alt={news?.title} />
            </div>
            <div className="absolute bottom-[-200px]  py-[10px] px-[15px] w-full h-[312px] rounded-[20px] hover:bg-[#FEEFE8]  animation hover:bottom-[0px]">
                <div className="w-full mb-[60px]">
                    {/* <p className="font-[400] text-[14px] text-[#FFFFFF] pb-[12px]"><span><FontAwesomeIcon className="" icon={faCalendarDays} /> </span>{new Date(news?.createdAt).toLocaleDateString("vi-VN")}</p> */}

                    <p className="flex items-center gap-[6px] font-[400] text-[14px] text-[#FFFFFF] pb-[12px]">
                        <span><FontAwesomeIcon className="" icon={faCalendarDays} /> </span>
                        <span>{new Date(news.createdAt).toLocaleDateString("vi-VN")}</span>
                    </p>
                    <h3 className="font-[700] text-[20px] text-[#FFFFFF] mb-[20px] leading-[1.3] line-clamp-2">
                        <Link to={`/news/${news?.slug}`} className="hover:text-main">{news?.title}</Link>
                    </h3>
                    <p
                        className="font-[300] text-[14px] text-[#000000] mb-[16px] leading-[1.5] line-clamp-5 "
                        dangerouslySetInnerHTML={{ __html: news?.content || "" }}
                    >
                    </p>
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