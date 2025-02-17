import CartLeft from "../../../components/client/cart/cartLeft";
import { CartRight } from "../../../components/client/cart/cartRight";

const Cart = () => {
    return (
        <>
            <div className="py-[60px]">
                <div className="container px-[16px] mx-auto">
                    <div className="">
                        <h2 className="text-[40px] text-center font-[700] text-main">Giỏ hàng</h2>
                        <div className="flex justify-between">
                            <div className="w-[68%]">
                                <CartLeft/>
                            </div>
                            <div className="w-[30%]">
                                <CartRight/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;