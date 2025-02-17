import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


<i class="fa-solid fa-cart-shopping"></i>
const ButtonViewCart = () => {
    return (
        <>
            <div className="mt-[100px] text-center">
            <Link to="/cart" className="text-[16px] text-main font-[500] bg-transparent py-[8px] px-[50px] rounded-[8px] border !border-main hover:!bg-main hover:text-[#ffffff]">Xem giỏ hàng</Link>
            </div>
        </>
    )
}

const ButtonCartPayment = () => {
    return (
        <>
            <div className="mt-[100px] text-center">
            <Link to="*" className="text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main flex items-center gap-[12px] "><span><FontAwesomeIcon icon={faCartShopping} /></span> Đặt mua</Link>
            </div>
        </>
    )
}
export {ButtonCartPayment, ButtonViewCart}