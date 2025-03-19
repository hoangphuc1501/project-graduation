import { useEffect, useState } from "react";
import {laravelAPI, nodeAPI} from '../../../utils/axiosCustom';
import ProductItem from "./productItem";
import ButtonSeeMoreFill from "../buttons/ButtonSeeMoreFill";


const ProductNew = () => {
    const [productNew, setProductNew] = useState([]);

    useEffect(() => {
        const fetchProductNew = async () => {
            try {
                const response = await laravelAPI.get("/api/newProduct");
                // console.log("API Response new:", response);  
                setProductNew(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            }
        };

        fetchProductNew();
    }, []);
    return (

        <div className="pt-[60px]">
            <div className="container mx-auto px-[16px]">
                <div className="">
                    <h3 className="text-[24px] text-[#FFFFFF] font-[700] uppercase bg-main text-center py-[12px] mb-[18px] rounded-b-[60px]"> Sản phẩm mới</h3>
                    <div className="grid grid-cols-5 gap-[20px]">
                        {productNew.map((product) => (
                            <ProductItem key={product.id} product={product} slug={product.slug}/>
                        ))}
                    </div>
                    <div className="flex items-center justify-center pt-[20px]">
                    <ButtonSeeMoreFill text="Xem tất cả"/>
                    </div>
                </div>
            </div>
        </div>

    )
}

const ProductFeature = () => {
    const [productFeature, setProductFeature] = useState([]);

    useEffect(() => {
        const fetchProductFeature = async () => {
            try {
                const response = await laravelAPI.get("/api/hotProduct");
                setProductFeature(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            }
        };

        fetchProductFeature();
    }, []);
    return (

        <div className="pt-[60px]">
            <div className="container mx-auto px-[16px]">
                <div className="">
                    <h3 className="text-[24px] text-[#FFFFFF] font-[700] uppercase bg-main text-center py-[12px] mb-[18px] rounded-b-[60px]"> Sản phẩm nổi bật</h3>
                    <div className="grid grid-cols-5 gap-[20px]">
                        {productFeature.map((product) => (
                            <ProductItem key={product.id} product={product} slug={product.slug}/>
                        ))}
                    </div>
                    <div className="flex items-center justify-center pt-[20px]">
                    <ButtonSeeMoreFill text="Xem tất cả"/>
                    </div>
                </div>
            </div>
        </div>

    )
}




export { ProductNew , ProductFeature};