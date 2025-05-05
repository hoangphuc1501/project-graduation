import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { FaEye } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { useState } from "react";
import ProductModal from "../../../components/client/products/ProductModal";

const ProductItem = ({ product, slug }) => {
    const [showModalProductDetail, setShowModalProductDetail] = useState(false);
    const [selectedProductSlug, setSelectedProductSlug] = useState(null);

    // 
    const handleShowModal = (slug) => {
        setSelectedProductSlug(slug);
        setShowModalProductDetail(true);
    };

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
            <div className="px-[10px] shadow-[0_0_5px_#b5bdc7] overflow-hidden rounded-[12px] w-full relative py-[15px] hover:shadow-[0_0_5px_#e95211] product-item">
                <div className="w-full h-[220px] inner-image">
                    <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full "
                    />
                    <div className="inner-list-button">
                        <div className="inner-button">
                            <span className="inner-tooltip">Xem nhanh</span>
                            <Link
                                onClick={(e) => {
                                    e.preventDefault(); // Ngăn chặn điều hướng trang
                                    handleShowModal(product.slug);
                                }}>
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
                </div>
                <h3 className="text-[16px] font-[700] text-black  my-[12px] line-clamp-2 ">
                    <Link to={`/productDetail/${slug}`} className="block  hover:text-main">
                        {product.title}
                    </Link>
                </h3>
                <div className="flex items-center gap-x-[4px] pb-[12px] text-[#FF9900]">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <FontAwesomeIcon
                            key={i}
                            icon={i <= Math.round(product.average_rating || 0) ? faSolidStar : faRegularStar}
                        />
                    ))}
                    <span className="text-[12px] text-[#555] ml-2">({product.total_reviews || 0})</span>
                </div>
                <div className="flex items-center gap-x-[12px]">
                    <span className="text-[16px] font-[700] text-main">
                        {specialPrice?.toLocaleString() ?? "0"} <sup>đ</sup>
                    </span>
                    <span className="text-[12px] font-[300] text-[#9e9e9e]">
                        <strike>
                            {price?.toLocaleString() ?? "0"} <sup>đ</sup>
                        </strike>
                    </span>
                </div>
                <div className="absolute top-[15px] right-[5px] bg-main rounded-[6px] py-[5px] px-[12px] text-center">
                    <span className=" text-[#ffffff] font-[500] text-[12px]">{discount} %</span>
                </div>
                <ProductModal
                    show={showModalProductDetail}
                    setShow={setShowModalProductDetail}
                />
            </div>
        </>
    );
};

export default ProductItem;
