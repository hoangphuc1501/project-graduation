import React, { useRef, useState, useEffect } from "react";
import { initTabs } from 'david-ai';
import ImageSlider from "../../../components/client/productDetail/imageSlider";
import ProductInfo from "../../../components/client/productDetail/ProductInfo";
import ProductOptions from "../../../components/client/productDetail/ProductOptions";
import PromotionBox from "../../../components/client/productDetail/PromotionBox";
import AddToCartForm from "../../../components/client/productDetail/AddToCartForm";
import Description from "../../../components/client/productDetail/description";
import ListStore from "../../../components/client/productDetail/listStore";
import Rating from "../../../components/client/productDetail/rating";
import CommentProduct from "../../../components/client/productDetail/comment";
initTabs();


const ProductDetail = () => {
    return (
        <div className="py-[60px] product-detail">
            <div className="container mx-auto px-[16px]">
                <div className="flex justify-between gap-[20px]">
                    <div className="w-[79%]">
                        <div className="flex justify-between w-full">
                            <div className="w-[45%] h-[605px]">
                                <ImageSlider/>
                            </div>
                            <div className="w-[53%] px-[10px]">
                                <ProductInfo/>
                                <ProductOptions/>
                                <PromotionBox/>
                                <AddToCartForm/>
                            </div>
                        </div>
                        <div className="w-full mt-[60px] border">
                            <Description/>
                        </div>
                        <Rating/>
                        <CommentProduct/>
                        
                    </div>
                    <div className="w-[20%]">
                        <ListStore/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
