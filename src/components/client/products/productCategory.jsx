import { useEffect, useState } from "react";
import axios from '../../../utils/axiosCustom';
import ProductItem from "./productItem";


const ProductNew = () => {
    const [productNew, setProductNew] = useState([]);

    useEffect(() => {
        const fetchProductNew = async () => {
            try {
                const response = await axios.get("/products/newProduct");
                console.log("API Response:", response);
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
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="flex items-center justify-center pt-[20px]">
                        <button className="text-[16px] font-[700] text-[#ffffff] bg-main rounded-[62px] px-[60px] py-[10px] border !border-main hover:text-main hover:bg-transparent">Xem tất cả</button>
                    </div>
                </div>
            </div>
        </div>

    )
}


const ProductRackets = () => {
    const [productRackets, setProductRackets] = useState([]);
    const categoryId = 2;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/products/category/${categoryId}`);
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
                        <button className="text-[16px] font-[700] text-[#ffffff] bg-main rounded-[62px] px-[30px] py-[10px] border !border-main hover:text-main hover:bg-transparent">Xem tất cả</button>
                    </div>
                    <div className="flex gap-[20px]">
                        <div className="w-[30%] h-[710px] overflow-hidden">
                            <img src="https://static.fbshop.vn/wp-content/uploads/2024/01/Artboard-5-copy-2@2x-378x790.webp" alt="" className="w-full h-full hover:scale-[1.05] transition-all duration-700 ease-in-out" />
                        </div>
                        <div className="grid grid-cols-3 gap-[20px] w-[70%]">
                            {productRackets.length > 0 ? (
                                productRackets.map((product) => (
                                    <ProductItem key={product.id} product={product} />
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


const ProductShoes = () => {
    const [productShoes, setProductShoes] = useState([]);
    const categoryId = 6;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/products/category/${categoryId}`);
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
                        <button className="text-[16px] font-[700] text-[#ffffff] bg-main rounded-[62px] px-[30px] py-[10px] border !border-main hover:text-main hover:bg-transparent">Xem tất cả</button>
                    </div>
                    <div className="flex gap-[20px]">
                        <div className="grid grid-cols-3 gap-[20px] w-[70%]">
                            {productShoes.length > 0 ? (
                                productShoes.map((product) => (
                                    <ProductItem key={product.id} product={product} />
                                ))
                            ) : (
                                <p className="col-span-3 text-center text-gray-500">Không có sản phẩm nào.</p>
                            )}
                        </div>
                        <div className="w-[30%] h-[710px] overflow-hidden">
                            <img src="https://static.fbshop.vn/wp-content/uploads/2024/01/Banner-website-balo-377x790.webp" alt="" className="w-full h-full hover:scale-[1.05] transition-all duration-700 ease-in-out" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ProductRackets, ProductShoes, ProductNew };