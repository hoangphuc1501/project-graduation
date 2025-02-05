import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
const BannerMain = () => {
    return (
        <>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide><img className='w-full' src="https://static.fbshop.vn/wp-content/uploads/2024/12/Banner-Xa-kho-Fbshop-1920x685.png" alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full' src="https://static.fbshop.vn/wp-content/uploads/2024/12/Banner-Fbshop-1-1920x685.png" alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full' src="https://static.fbshop.vn/wp-content/uploads/2024/01/Banner-website-4-min.webp" alt="" /></SwiperSlide>
            </Swiper>
        </>
    )
}

export default BannerMain;