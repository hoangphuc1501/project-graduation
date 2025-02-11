import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus, faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProductModal from "../../../components/client/products/ProductModal";

const ProductItem = ({product}) => {
    const [showModalProductDetail, setShowModalProductDetail] = useState(false);

    // Kiểm tra biến thể đầu tiên
    const firstVariant = product?.variant || {};
    const imageUrl = firstVariant ? firstVariant.image : ""; 
    const price = firstVariant ? firstVariant.price : 0;
    const specialPrice = firstVariant ? firstVariant.specialPrice : 0;
    const discount = firstVariant ? firstVariant.discount : 0;

    if (!product) {
        return <div>Không có sản phẩm nào!</div>;
    }
    return (
        <>
        <div className="px-[10px] shadow-[0_0_5px_#b5bdc7] overflow-hidden rounded-[12px] w-full relative py-[15px] hover:shadow-[0_0_5px_#e95211] product-item">
            <div className="w-full h-[200px] inner-image">
                <img
                    src={imageUrl}
                    alt=""
                    className="w-full h-full "
                />
                <div className="inner-list-button">
                    <div className="inner-button">
                        <span className="inner-tooltip">Yêu thích</span>
                        <Link to="">
                            <FontAwesomeIcon icon={faHeart} />
                        </Link>
                    </div>
                    <div className="inner-button">
                        <span className="inner-tooltip">Xem nhanh</span>
                        <Link onClick={() => setShowModalProductDetail(true)} >
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
                    </div>
                    <div className="inner-button">
                        <span className="inner-tooltip">Giỏ hàng</span>
                        <Link to="">
                            <FontAwesomeIcon icon={faCartPlus} />
                        </Link>
                    </div>
                </div>
            </div>
            <h3 className="text-[16px] font-[700] text-black  my-[12px] line-clamp-2 ">
                <Link to="/productDetail" className="block  hover:text-main">
                {product.title}
                </Link>
            </h3>
            <div className="flex items-center gap-x-[4px] pb-[12px] text-[#FF9900]">
                <FontAwesomeIcon icon={faSolidStar} />
                <FontAwesomeIcon icon={faSolidStar} />
                <FontAwesomeIcon icon={faSolidStar} />
                <FontAwesomeIcon icon={faSolidStar} />
                <FontAwesomeIcon icon={faRegularStar} />
            </div>
            <div className="flex items-center gap-x-[12px]">
                <span className="text-[16px] font-[700] text-main">
                {specialPrice.toLocaleString("vi-VN")} <sup>đ</sup>
                </span>
                <span className="text-[12px] font-[300] text-[#9e9e9e]">
                    <strike>
                    {price.toLocaleString("vi-VN")} <sup>đ</sup>
                    </strike>
                </span>
            </div>
            <div className="absolute top-[15px] right-[0] bg-[#FF0000] w-[80px] rounded-tl-[50px] rounded-bl-[50px] pr-[10px] py-[5px] text-right">
                <span className=" text-white font-[700] text-[14px]">{discount} %</span>
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
