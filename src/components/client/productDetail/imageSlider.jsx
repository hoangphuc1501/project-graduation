import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Viewer from "viewerjs";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "viewerjs/dist/viewer.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ImageSlider = ({ images = [] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const viewerRef = useRef(null);
    // const images = [
    //     "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-yonex-shb-39ex-wt-bl-chinh-hang-1_1694661710.webp",
    //     "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-yonex-shb-39ex-wt-bl-chinh-hang-2_1694717690.webp",
    //     "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-yonex-shb-39ex-wt-bl-chinh-hang-3_1694718054.webp",
    //     "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-yonex-shb-39ex-wt-bl-chinh-hang-4_1694718060.webp",
    // ];

    // Khởi tạo Viewer.js khi component được render
    useEffect(() => {
        if (viewerRef.current && images.length > 0) {
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
    }, [images]);
    // useEffect(() => {
    //     console.log("Images received:", images); // Debug kiểm tra dữ liệu
    // }, [images]);


    return (
        <>
            {images.length > 0 ? (
                <>
                    {/* Hiển thị ảnh lớn */}
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
                        {/* {images.map((imgObj, index) => (
                            <SwiperSlide key={imgObj.id || index}>
                                <img
                                    src={imgObj.image} // Lấy đúng đường dẫn ảnh từ đối tượng
                                    alt=""
                                    className="swiper-slide-image"
                                />
                            </SwiperSlide>
                        ))} */}
                        {images?.map((imgObj, index) => (
                            <SwiperSlide key={index}>
                                <img src={typeof imgObj === "string" ? imgObj : imgObj.image} alt="" className="swiper-slide-image" />
                            </SwiperSlide>
                        ))}

                    </Swiper>

                    {/* Hiển thị thumbnail */}
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={Math.min(images?.length, 4)} // Tự động theo số lượng ảnh, tối đa 4
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        {images?.map((imgObj, index) => (
                            <SwiperSlide key={index}>
                                <img src={typeof imgObj === "string" ? imgObj : imgObj.image} alt="" className="swiper-slide-image" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            ) : (
                <p>Không có hình ảnh</p>
            )}
        </>
    )
}

export default ImageSlider;