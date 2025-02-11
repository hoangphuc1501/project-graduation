
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation, FreeMode } from 'swiper/modules';
import ProductItem from './productItem';

const ProductSale = () => {
    return (
        <div className="my-[60px] bg-[url('https://golfgroup.com.vn/wp-content/themes/ggc/images/background/bg-black.jpg')] bg-no-repeat bg-center bg-cover h-[600px] flex items-center">
            <div className="container px-[16px] mx-auto">
                <div className=''>
                    <h2 className='text-[#ffffff]'>Ưu đãi hấp dẫn</h2>
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
                            <SwiperSlide><ProductItem /></SwiperSlide>
                            <SwiperSlide><ProductItem /></SwiperSlide>
                            <SwiperSlide><ProductItem /></SwiperSlide>
                            <SwiperSlide><ProductItem /></SwiperSlide>
                            <SwiperSlide><ProductItem /></SwiperSlide>
                            <SwiperSlide><ProductItem /></SwiperSlide>
                            <SwiperSlide><ProductItem /></SwiperSlide>
                            <SwiperSlide><ProductItem /></SwiperSlide>
                            <SwiperSlide><ProductItem /></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSale;