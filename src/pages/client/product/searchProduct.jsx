import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../../components/client/breadcrumbs/Breadcrumb";
import ProductItem from "../../../components/client/products/productItem";
import { nodeAPI } from "../../../utils/axiosCustom";
import { useSearchParams } from "react-router-dom";

const SearchProduct = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [products, setProducts] = useState([]);
    // call api tìm kiếm
    useEffect(() => {
        const fetchProducts = async () => {
            if (!query) return; // Nếu không có từ khóa, không gọi API

            try {
                const response = await nodeAPI.get(`/products/search?query=${query}`);
                setProducts(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            }
        };

        fetchProducts();
    }, [query]);

    return (
        <>
        <Breadcrumb/>
        <div className="py-[60px]">
            <div className="container px-[16px] mx-auto">
                <div className="">
                    <h2 className="text-[28px] text-[#000000] font-[700] pb-[40px]">
                        Kết quả tìm kiếm: {query || "Không có từ khóa"}
                    </h2>
                    <div className="grid grid-cols-5 gap-[20px]">
                    {products.length > 0 ? (
                            products.map((product) => (
                                <ProductItem key={product.id} product={product} slug={product.slug} />
                            ))
                        ) : (
                            <p className="col-span-5 text-center text-gray-500">Không tìm thấy sản phẩm nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SearchProduct;