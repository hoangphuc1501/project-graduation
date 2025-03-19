
import { Link } from "react-router-dom";

const WishListModalItem = ({ favorite, onDelete  }) => {

    if (!favorite) return null;
    const variant = favorite.product_variant;
    if (!variant) return null;
    return (
        <div className="py-[20px] border-b">
            <div className="flex justify-between">
                <div className="w-[32%] h-[100px] p-[10px] rounded-[12px] overflow-hidden">
                    <img
                        src={variant.images?.[0]?.image || "/default-image.jpg"}
                        alt={variant.product?.title || "Sản phẩm"}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-[66%]">
                    <Link
                        to={`/product/${variant.id}`}
                        className="text-[16px] text-[#000000] font-[700] mb-[12px] leading-[1.4] line-clamp-2 hover:text-main">
                        {variant.product?.title || "Tên sản phẩm"}
                    </Link>
                    <div className="flex items-center gap-[15px]">
                        <div className="flex items-center gap-[10px] justify-center text-[14px] font-[400]">
                            <span>Màu: {favorite?.color?.name || "Không có"}</span>
                            <span>/</span>
                            <span>Size: {favorite?.size?.name || "Không có"}</span>
                        </div>
                        <button 
                        onClick={() => onDelete(favorite?.id)}
                        className="px-[12px] py-[5px] text-[#FF0000] text-[14px] font-[400] underline underline-offset-[3px]">
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WishListModalItem;