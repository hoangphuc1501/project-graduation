import NewsItem from "./newsItem";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import { laravelAPI, nodeAPI } from "../../../utils/axiosCustom";

const NewsSection = () => {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        fetchHomedNews();
    }, []);

    const fetchHomedNews = async () => {
        try {
            const response = await laravelAPI.get("/api/newsHomePage");
            // console.log(response)
            setNewsList(response.newsList);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tin tức:", error);
        }
    };


    return (
        <div className="my-[80px] bg-main w-full h-[500px] py-[20px]">
            <div className="container mx-auto px-[16px]">
                <div className="relative">
                    <div className="absolute top-[0px] left-[-240px] ">
                        <img className="h-[500px] object-cover" src="https://static.fbshop.vn/template/assets/images/snews-decor.webp" alt="" />
                    </div>
                    <div className="absolute top-[0px] right-[-240px] ">
                        <img className="h-[500px] object-cover" src="https://static.fbshop.vn/template/assets/images/snews-decor-2.webp" alt="" />
                    </div>
                </div>
                <div className="">
                    <div className="flex justify-between items-center gap-x-[20px] pb-[40px] pt-[10px]">
                        <h3 className="text-[40px] font-[700] text-white">Tin tức</h3>
                        <button className="text-[16px] font-[700] text-main bg-white rounded-[62px] px-[30px] py-[10px]">Xem tất cả</button>
                    </div>
                    {/* <div className="grid grid-cols-4 gap-[20px]">
                        <NewsItem/>
                        <NewsItem/>
                        <NewsItem/>
                        <NewsItem/>
                    </div> */}
                    <div className="news-swiper">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={30}
                            freeMode={true}
                            // pagination={{
                            // clickable: true,
                            // }}
                            navigation={true}
                            modules={[FreeMode, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {newsList?.length > 0 ? (
                                newsList.map((news) => (
                                    <SwiperSlide key={news.id}>
                                        <NewsItem key={news.id} news={news} />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <p className="text-center">Không có tin tức nổi bật.</p>
                            )}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsSection;