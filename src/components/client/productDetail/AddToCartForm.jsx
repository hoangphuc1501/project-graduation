import InputNumber from "../cart/inputNumber";
import { FaHeart } from "react-icons/fa";

const AddToCartForm = ({ quantity, setQuantity, handleAddToCart, handleAddToFavorites  }) => {
    return (
        <>
            <form className="pb-[10px] " onSubmit={(e) => e.preventDefault()}>
                <InputNumber
                    quantity={quantity}
                    onChange={(value) => setQuantity(value)}
                />
                <div className="flex justify-between items-center py-[12px]">
                    <button
                        onClick={handleAddToCart}
                        className="w-[58%] bg-[#E95221] border !border-[#E95221] hover:bg-transparent py-[16px] rounded-[8px] text-[16px] text-[#FFFFFF] hover:text-[#E95221] font-[700] uppercase">
                        Thêm vào giỏ hàng
                    </button>
                    <button className="w-[40%] bg-[#ffb916] hover:bg-transparent border !border-[#ffb916] py-[16px] rounded-[8px] text-[16px] text-[#FFFFFF] hover:text-[#ffb916] font-[700] uppercase">
                        Mua ngay
                    </button>
                </div>
            </form>
            <div className="flex items-center justify-between">
                    <button className="w-[80%] bg-[#008FE5] hover:bg-transparent border !border-[#008FE5] py-[16px] rounded-[8px] text-[16px] text-[#FFFFFF] hover:text-[#008FE5] font-[700]">
                        Tư vấn qua zalo
                    </button>
                    <button 
                    onClick={handleAddToFavorites}
                    className="text-[24px] text-[#ffffff] font-[700] bg-main rounded-[8px] py-[17px] px-[36px]">
                        <FaHeart/>
                    </button>
            </div>
        </>
    )
}

export default AddToCartForm;