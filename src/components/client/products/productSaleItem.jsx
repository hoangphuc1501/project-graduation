import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { useState } from "react";
import ProductModal from "./ProductModal";



const ProductSaleItem = ({ product, slug }) => {
    const [showModalProductDetail, setShowModalProductDetail] = useState(false);
    // Kiểm tra biến thể đầu tiên
    const firstVariant = product?.variant || {};
    const imageUrl = product?.image || '';
    const price = firstVariant ? firstVariant.price : 0;
    const specialPrice = firstVariant ? firstVariant.specialPrice : 0;
    const discount = firstVariant ? firstVariant.discount : 0;
    if (!product) {
        return <div>Không có sản phẩm nào!</div>;
    }
    return (
        <>
            <div className="px-[10px] shadow-[0_0_5px_#b5bdc7] overflow-hidden rounded-[12px] w-full relative py-[15px] hover:shadow-[0_0_5px_#e95211] product-item bg-[#ffffff]">
                <div className="w-full h-[220px]">
                    <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full "
                    />
                </div>
                <div className="inner-list-button">
                    <div className="inner-button">
                        <span className="inner-tooltip">Xem nhanh</span>
                        <Link onClick={() => setShowModalProductDetail(true)}>
                            <FaEye />
                        </Link>
                    </div>
                    <div className="inner-button">
                        <span className="inner-tooltip">So sánh</span>
                        <Link to="">
                            <FaCodeCompare />
                        </Link>
                    </div>
                </div>
                <h3 className="text-[16px] font-[700] text-black  my-[12px] line-clamp-2 ">
                    <Link to={`/productDetail/${slug}`} className="block  hover:text-main">
                        {product.title}
                    </Link>
                </h3>
                <div className="flex items-center gap-x-[12px]">
                    <span className="text-[16px] font-[700] text-main">
                        {specialPrice.toLocaleString() ?? "0"} <sup>đ</sup>
                    </span>
                    <span className="text-[12px] font-[300] text-[#9e9e9e]">
                        <strike>
                            {price.toLocaleString() ?? "0"} <sup>đ</sup>
                        </strike>
                    </span>
                </div>
                <div className="absolute top-[15px] right-[5px] bg-main rounded-[6px] py-[5px] px-[12px] text-center">
                    <span className=" text-[#ffffff] font-[500] text-[12px]">{discount} %</span>
                </div>
                <div className="flex items-center gap-[4px] text-[12px] text-[#000000] font-[400] justify-center bg-[#ddd] rounded-[60px] px-[10px] py-[4px] background-linear relative my-[20px]">
                    <span>
                        <img
                            className="absolute top-[0] left-[0] w-[20px] h-[26px]"
                            src="https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/homev2/flash-sale.png" alt="" />
                    </span>
                    <span>Còn 10/15 suất</span>
                </div>
                <div className="">
                    <button className="text-[16px] text-main font-[600] py-[8px] px-[10px] w-full bg-[#EEEEEE] rounded-[8px]">Mua ngay</button>
                </div>
                <ProductModal
                    show={showModalProductDetail}
                    setShow={setShowModalProductDetail}
                />
            </div>
        </>
    )
}

export default ProductSaleItem;