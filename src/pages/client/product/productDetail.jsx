// import React, { useRef, useState, useEffect } from "react";
import { initTabs } from 'david-ai';
import ImageSlider from "../../../components/client/productDetail/imageSlider";
import ProductInfo from "../../../components/client/productDetail/ProductInfo";
import ProductOptions from "../../../components/client/productDetail/ProductOptions";
import PromotionBox from "../../../components/client/productDetail/PromotionBox";
// import AddToCartForm from "../../../components/client/productDetail/AddToCartForm";
import Description from "../../../components/client/productDetail/description";
import ListStore from "../../../components/client/productDetail/listStore";
import Rating from "../../../components/client/productDetail/rating";
import CommentProduct from "../../../components/client/productDetail/comment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
// import { productDetailApi } from '../../../services/client/productApiService';
import { nodeAPI } from '../../../utils/axiosCustom';
import AccordionProduct from '../../../components/client/products/accordionCatetegory';
import Breadcrumb from '../../../components/client/breadcrumbs/Breadcrumb';

initTabs();


const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await nodeAPI.get(`products/detail/${slug}`);
            console.log(response)
            console.log("API Response:", response.data);
            console.log(response.product)
            // setProduct(response.product);
            if (response.product) {
                setProduct(response.product);
                setSelectedColor(response.product?.variants?.[0]?.color || null);
                setSelectedSize(response.product?.variants?.[0]?.size?.[0] || null);
            }
        };
        fetchProduct();
    }, [slug]);

    return (
        <>
            <Breadcrumb/>
            <div className="py-[40px] product-detail">
                <div className="container mx-auto px-[16px]">
                    <div className="flex justify-between gap-[20px]">
                        <div className="w-[75%]">
                            <div className="flex justify-between w-full">
                                <div className="w-[45%] h-[605px]">
                                    {/* <ImageSlider /> */}
                                    <ImageSlider
                                        images={
                                            product?.variants?.find((variant) => variant.color === selectedColor)?.images ?? []
                                        }
                                    />
                                </div>
                                <div className="w-[53%] px-[10px]">
                                    <ProductInfo product={product} />

                                    <ProductOptions
                                        product={product}
                                        selectedColor={selectedColor}
                                        setSelectedColor={setSelectedColor}
                                        selectedSize={selectedSize}
                                        setSelectedSize={setSelectedSize}
                                    />
                                    <PromotionBox content={product?.descriptionPromotion} />

                                    {/* <AddToCartForm/> */}
                                    <form action="" method="post" className="pb-[10px]">
                                        <input type="number" className="border" min={1} value={1} />
                                        <div className="flex justify-between items-center py-[12px]">
                                            <button className="w-[58%] bg-[#E95221] border !border-[#E95221] hover:bg-transparent py-[16px] rounded-[4px] text-[16px] text-[#FFFFFF] hover:text-[#E95221] font-[700] uppercase">
                                                Thêm vào giỏ hàng
                                            </button>
                                            <button className="w-[40%] bg-[#ffb916] hover:bg-transparent border !border-[#ffb916] py-[16px] rounded-[4px] text-[16px] text-[#FFFFFF] hover:text-[#ffb916] font-[700] uppercase">
                                                Mua ngay
                                            </button>
                                        </div>
                                        <div className="">
                                            <button className="w-[100%] bg-[#008FE5] hover:bg-transparent border !border-[#008FE5] py-[16px] rounded-[4px] text-[16px] text-[#FFFFFF] hover:text-[#008FE5] font-[700]">
                                                Tư vấn qua zalo
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="w-full mt-[60px]">
                                <Description description={product?.description} />

                            </div>
                            <Rating />
                            <CommentProduct />

                        </div>
                        <div className="w-[24%] flex flex-col gap-[40px]">
                            <ListStore />
                            <AccordionProduct />
                        </div>
                    </div>
                </div>
            </div>
        </>
        // <></>
    );
};

export default ProductDetail;
