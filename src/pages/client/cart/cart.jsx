import { Link } from "react-router-dom";
import { laravelAPI } from '../../../utils/axiosCustom';

import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { ButtonFill } from "../../../components/client/buttons/listButton";
import Loading from "../../../components/client/animations/loading";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);


    // call api sho dữ liệu
    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            try {
                const response = await laravelAPI.get("/api/carts");
                // console.log("check dữ liệu giỏ hàng ",response)
                if (response.code === "success") {
                    setCartItems(response.cart);
                }
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    // update số lương5
    const updateCartQuantity = async (index, newQuantity) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = newQuantity;
        setCartItems(updatedCart);
        setLoading(true);
        try {
            await laravelAPI.patch("/api/carts/updateQuantity", {
                cartId: updatedCart[index].id,
                
                quantity: newQuantity
            });

            // Gọi lại API để đảm bảo dữ liệu đồng bộ
            const response = await laravelAPI.get("/api/carts");
            // console.log(response)
            if (response.code === "success") {
                setCartItems(response.cart);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật số lượng giỏ hàng:", error);
        }finally {
            setLoading(false);
        }
    };

    // hàm xóa sản phẩm ra khỏi giỏ hàng
    const deleteCartItem = async (cartId) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await laravelAPI.delete(`/api/carts/delete/${cartId}`);
                    if (response.code === "success") {
                        setCartItems(prevCart => prevCart.filter(item => item.id !== cartId));

                        Swal.fire({
                            title: "Sản phẩm đã bị xóa khỏi giỏ hàng.",
                            icon: "success",
                            confirmButtonColor: "#3085d6"
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa sản phẩm:", error);
                    Swal.fire({
                        title: "Lỗi!",
                        text: "Không thể xóa sản phẩm, vui lòng thử lại.",
                        icon: "error",
                        confirmButtonColor: "#d33"
                    });
                }
            }
        });
    };
    // tính tổng tiền
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.quantity * item.variant.specialPrice;
    }, 0);
    
    return (
        <>
            <div className="py-[60px]">
                <div className="container px-[16px] mx-auto">
                    <div className="">
                        <h2 className="text-[40px] text-center font-[700] text-main">Giỏ hàng</h2>
                        <div className="flex justify-between">
                            <div className="w-[68%]">
                                {/* <CartLeft/> */}
                                {loading ? (
                                    <div className="flex justify-center items-center h-[300px]">
                                    <Loading />
                                </div>
                                ) : cartItems.length === 0 ? (
                                    <p className="text-center text-gray-500">Giỏ hàng trống</p>
                                ) : (
                                    <table className="my-[30px] w-full shadow-[0_0px_10px_rgba(221,221,221)] rounded-[10px] overflow-hidden">
                                        <thead className="border-b">
                                            <tr className="text-center">
                                                <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#000000] w-[50px]">STT</th>
                                                <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#000000] w-[350px]">sản phẩm</th>
                                                <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#000000]">Số lượng</th>
                                                <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#000000]">Đơn giá</th>
                                                <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#000000]">Tạm tính</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item, index) => (
                                                <tr className="text-center border-b py-[10px]" key={item.id}>
                                                    <td className="py-[15px] text-[16px] font-[500] text-[#000000] w-[50px]">{index + 1}</td>
                                                    <td className="flex gap-[10px] w-[350px] items-center py-[15px]">
                                                        <div className="w-[60px] h-[60px]">
                                                            <img src={item.image} alt={item.title} className="w-full h-[full" />
                                                        </div>
                                                        <div className="flex flex-col justify-between text-start flex-1">
                                                            <div className=" flex flex-col justify-between">
                                                                <Link to={`/productDetail/${item.slug}`} className="text-[16px] text-[#000000] font-[400] mb-[4px] hover:text-main line-clamp-1">
                                                                    {item.product?.title ?? "Sản phẩm không xác định"}
                                                                </Link>
                                                                <div className="flex flex-col gap-[5px]">
                                                                    <span className="text-[14px] text-[#000000] font-[400] mb-[4px]">Màu: {item.variant?.color?.name}</span>
                                                                    <span className="text-[14px] text-[#000000] font-[400] mb-[4px]">Size: {item.variant?.size?.name}</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    onClick={() => deleteCartItem(item.id)}
                                                                    className=" text-[16px] font-[400] text-[#000000] hover:text-main underline underline-offset-[3px]">
                                                                    Xóa
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-[15px]">
                                                        <div className="inline-flex items-center gap-[6px] custom-number-input border !border-main rounded-[10px] py-[4px] px-[10px] h-[40px]" >
                                                            <button
                                                                className="text-main"
                                                                onClick={() => updateCartQuantity(index, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <CiSquareMinus />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className="w-[50px] text-center text-main font-[500]"
                                                                min="1"
                                                                max="100"
                                                                value={item.quantity}
                                                                onChange={(e) => updateCartQuantity(index, Number(e.target.value))}
                                                            />
                                                            <button
                                                                className="text-main"
                                                                onClick={() => updateCartQuantity(index, item.quantity + 1)}>
                                                                <CiSquarePlus />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-[15px] text-[16px] font-[500] text-[#000000]">{item.variant.specialPrice.toLocaleString()}<sup>đ</sup></td>
                                                    <td className="py-[15px] text-[16px] font-[500] text-[#000000]">{(item.quantity * item.variant.specialPrice).toLocaleString()}<sup>đ</sup></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                <div className="flex items-center justify-between">
                                    <Link to="/" className="text-[16px] font-[500] text-main flex items-center gap-[12px] border !border-main py-[8px] px-[30px] rounded-[8px] hover:text-[#ffffff] hover:bg-main">
                                        <span>
                                            <FaArrowLeft /></span>
                                        Tiếp tục mua hàng
                                    </Link>
                                    <button className="text-[16px] font-[500] text-[#000000] underline hover:text-main underline-offset-[3px]">Xóa tất cả</button>
                                </div>
                            </div>
                            <div className="w-[30%]">
                                {/* <CartRight /> */}
                                <div className="my-[30px] w-full shadow-[0_0px_10px_rgba(221,221,221)] rounded-[10px] overflow-hidden pt-[10px] pb-[30px] px-[15px]">
                                    <h2 className="text-[#000000] text-[20px] font-[500] pb-[10px] border-b">
                                        Tổng cộng
                                    </h2>
                                    <form
                                        className="border !border-main h-[50px] rounded-[8px] mt-[16px] flex items-center overflow-hidden"
                                    >
                                        <input type="text"
                                            placeholder="Mã giả giá"
                                            className="text-[#000000] font-[500] text-[16px] px-[8px] flex-1" />
                                        <button className="font-[500] text-[16px] text-[#ffffff] bg-main h-[50px] rounded-[8px] px-[10px]">Áp dụng</button>
                                    </form>
                                    <div className="flex items-center justify-between mt-[16px]  text-[#000000]">
                                        <span className="font-[400] text-[16px]">Tạm tính:</span>
                                        <span className="font-[700] text-[16px]">{totalPrice.toLocaleString()}<sup>đ</sup></span>
                                    </div>
                                    <div className="flex items-center justify-between my-[25px]">
                                        <span className="text-[20px] font-[700] text-[#000000]">Tổng tiền:</span>
                                        <span className="text-[20px] font-[700] text-[#000000]">{totalPrice.toLocaleString()} <sup>đ</sup></span>
                                    </div>
                                    <Link to="/order">
                                        <ButtonFill text="Thanh toán" className="w-full" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;