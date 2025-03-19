import { useEffect, useState } from "react";
import { laravelAPI, nodeAPI } from "../../../utils/axiosCustom";
import ButtonSeeMore from "../buttons/buttonSeeMore";
import ProductItem from "./productItem";

const ProductShoes = () => {
    const [productShoes, setProductShoes] = useState([]);
    const categoryId = 2;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await laravelAPI.get(`/api/categoryId/${categoryId}`);
                // console.log("check cate id",response)
                
                if (response.code === "success") {
                    setProductShoes(response.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách sản phẩm:", error);
            }
        };

        fetchProducts();
    }, []);
    return (
        <div className="pt-[60px]">
            <div className="container mx-auto px-[16px]">
                <div className="">
                    <div className="flex justify-between items-center pb-[30px]">
                        <h3 className="text-[30px] text-[#000000] font-[700]"> Giày Cầu lông</h3>
                        <ButtonSeeMore text="Xem thêm"/>
                    </div>
                    <div className="flex gap-[20px]">
                        <div className="grid grid-cols-3 gap-[20px] w-[70%]">
                            {productShoes.length > 0 ? (
                                productShoes.map((product) => (
                                    <ProductItem key={product.id} product={product} slug={product.slug}/>
                                ))
                            ) : (
                                <p className="col-span-3 text-center text-gray-500">Không có sản phẩm nào.</p>
                            )}
                        </div>
                        <div className="w-[30%] h-[750px] overflow-hidden">
                            <img src="https://static.fbshop.vn/wp-content/uploads/2024/01/Banner-website-balo-377x790.webp" alt="" className="w-full h-full hover:scale-[1.05] transition-all duration-700 ease-in-out" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductShoes;