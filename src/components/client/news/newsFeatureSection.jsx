import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import NewsItemFeature from './newsItemfeature';


const NewsFeatureSection = () => {
    return (
        <div className="pt-[70px] pb-[120px] news-section-feature">
            <h2 className='font-[700] text-[40px] text-[#000000] text-center pb-[30px]'>
                Tin tức nổi bật
            </h2>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                spaceBetween={20}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                // pagination={true}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <NewsItemFeature/>
                </SwiperSlide>
                <SwiperSlide>
                <NewsItemFeature/>
                </SwiperSlide>
                <SwiperSlide>
                <NewsItemFeature/>
                </SwiperSlide>
                <SwiperSlide>
                <NewsItemFeature/>
                </SwiperSlide>
                <SwiperSlide>
                <NewsItemFeature/>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default NewsFeatureSection;