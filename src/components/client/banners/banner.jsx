import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const BannerMain = () => {
    const banners = [
        "https://cdn.shopvnb.com/img/1920x640/uploads/slider/astrox88-sd-key-visual-2880x1120-_1718650445.webp",
        "https://cdn.shopvnb.com/img/1920x640/uploads/slider/thiet-ke-chua-co-ten-12_1727137763.webp",
        "https://cdn.shopvnb.com/img/1920x640/uploads/slider/65z3ltd-launch-website_1695177820.webp",
        "https://cdn.shopvnb.com/img/1920x640/uploads/slider/1000z-launch-website-banner_1695177885.webp",
        "https://cdn.shopvnb.com/img/1920x640/uploads/slider/ynx-eclp-banner_1695178004.webp",
    ];

    return (
        <div className="banner-main">
            <Swiper
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <img className="w-full" src={banner} alt={`Banner ${index + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default BannerMain;