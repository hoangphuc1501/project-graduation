import { useEffect, useState } from "react";
import ButtonSeeMore from "../buttons/buttonSeeMore";
import ProductItem from "./productItem";
import { nodeAPI } from "../../../utils/axiosCustom";


const ProductRackets = () => {
    const [productRackets, setProductRackets] = useState([]);
    const categoryId = 1;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await nodeAPI.get(`/products/categoryID/${categoryId}`);
                console.log(response)
                if (response.code === "success") {
                    setProductRackets(response.data);
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
                        <h3 className="text-[30px] text-[#000000] font-[700]"> Vợt Cầu lông</h3>
                        <ButtonSeeMore text="Xem thêm"/>
                    </div>
                    <div className="flex gap-[20px]">
                        <div className="w-[30%] h-[710px] overflow-hidden">
                            <img src="https://static.fbshop.vn/wp-content/uploads/2024/01/Artboard-5-copy-2@2x-378x790.webp" alt="" className="w-full h-full hover:scale-[1.05] transition-all duration-700 ease-in-out" />
                        </div>
                        <div className="grid grid-cols-3 gap-[20px] w-[70%]">
                            {productRackets.length > 0 ? (
                                productRackets.map((product) => (
                                    <ProductItem key={product.id} product={product} slug={product.slug}/>
                                ))
                            ) : (
                                <p className="col-span-3 text-center text-gray-500">Không có sản phẩm nào.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductRackets;