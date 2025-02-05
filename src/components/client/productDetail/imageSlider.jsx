import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Viewer from "viewerjs";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "viewerjs/dist/viewer.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ImageSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const viewerRef = useRef(null);
    const images = [
        "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-yonex-shb-39ex-wt-bl-chinh-hang-1_1694661710.webp",
        "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-yonex-shb-39ex-wt-bl-chinh-hang-2_1694717690.webp",
        "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-yonex-shb-39ex-wt-bl-chinh-hang-3_1694718054.webp",
        "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-yonex-shb-39ex-wt-bl-chinh-hang-4_1694718060.webp",
    ];

    // Khởi tạo Viewer.js khi component được render
    useEffect(() => {
        if (viewerRef.current) {
            const viewer = new Viewer(viewerRef.current, {
                navbar: true,
                title: true,
                toolbar: true,
                zoomable: true,
                scalable: true,
                movable: true,
                fullscreen: true,
                initialViewIndex: 0, // Đảm bảo ảnh đầu tiên hiển thị đúng
            });

            return () => viewer.destroy(); // Dọn dẹp Viewer.js khi component unmount
        }
    }, []);


    return (
        <>
            <Swiper
                ref={viewerRef}
                style={{
                    "--swiper-navigation-color": "#E95221",
                    "--swiper-pagination-color": "#E95221",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image}
                            alt=""
                            data-src={image}
                            ref={viewerRef}
                            className="swiper-slide-image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default ImageSlider;