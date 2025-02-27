
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation, FreeMode } from 'swiper/modules';
import ServiceItem from './serviceItem';


const ServiceSection = () => {
    return (
        <>
            <div className='pt-[60px] bg-[#ffffff]'>
                <div className='container px-[16px] mx-auto'>
                    <div className="shadow-[0_0_10px_#ddd] rounded-[12px] py-[20px]">
                        <h2 className='font-[700] text-[28px] uppercase text-[#000000] py-[10px] text-center'>Dịch vụ hàng đầu tại SmashPro</h2>
                        <div className="news-swiper bg-[#ffffff] py-[10px] px-[10px] rounded-b-[12px]">
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={10}
                                freeMode={true}
                                // pagination={{
                                // clickable: true,
                                // }}
                                navigation={true}
                                modules={[FreeMode, Pagination, Navigation]}
                                className="mySwiper"
                            >
                                <SwiperSlide><ServiceItem /></SwiperSlide>
                                <SwiperSlide><ServiceItem /></SwiperSlide>
                                <SwiperSlide><ServiceItem /></SwiperSlide>
                                <SwiperSlide><ServiceItem /></SwiperSlide>
                                <SwiperSlide><ServiceItem /></SwiperSlide>
                                <SwiperSlide><ServiceItem /></SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceSection;