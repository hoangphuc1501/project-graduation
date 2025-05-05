
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation, FreeMode } from 'swiper/modules';
import ProductSaleItem from './productSaleItem';
import CountdownTimer from '../animations/countdown';
import { useEffect, useState } from 'react';
import { laravelAPI } from '../../../utils/axiosCustom';

const ProductSale = () => {
    const [productSale, setProductSale] = useState([]);

    useEffect(() => {
        const fetchProductNew = async () => {
            try {
                const response = await laravelAPI.get("/api/saleProduct");
                // console.log("API Response:", response);  
                setProductSale(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            }
        };

        fetchProductNew();
    }, []);


    return (
        <div className="my-[60px] bg-[url('https://golfgroup.com.vn/wp-content/themes/ggc/images/background/bg-black.jpg')] bg-no-repeat bg-center bg-cover py-[60px] flex items-center ">
            <div className="container px-[16px] mx-auto">
                <div className=''>
                    <h2 className='text-[#ffffff] text-[28px] uppercase font-[700] text-center pb-[20px] py-[10px] sale-product' >Ưu đãi hấp dẫn</h2>
                    <div className='bg-[#ffffff] h-[80px] border-b !border-[#dddddd] overflow-hidden rounded-t-[12px] flex items-center'>
                        <div className='w-[160px] h-full bg-[#FFF6E3] border-b-[2px] !border-[#F79009] flex items-center justify-center'>
                            <img
                                className='w-[140px] h-[60px]'
                                src="https://cdnv2.tgdd.vn/mwg-static/common/Campaign/10/0d/100d3018ffd23afe20324b164d0412cc.png" alt="" />
                        </div>
                        <div className='bg-[#FEA200] rounded-[40px] py-[12px] w-[400px] ml-[360px] flex items-center justify-center'>
                            <CountdownTimer targetDate="2025-05-31T23:59:59" />
                        </div>
                    </div>
                    <div className="news-swiper bg-[#ffffff] py-[10px] px-[10px] rounded-b-[12px]">
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={10}
                            freeMode={true}
                            // pagination={{
                            // clickable: true,
                            // }}
                            navigation={true}
                            modules={[FreeMode, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {productSale.map((product) => (
                                <SwiperSlide>
                                    <ProductSaleItem key={product.id} product={product} slug={product.slug} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSale;