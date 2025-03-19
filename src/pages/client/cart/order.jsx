import { MdOutlineDiscount } from "react-icons/md";
import { laravelAPI } from "../../../utils/axiosCustom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Order = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        note: ""
    });


    // hàm show thông tin user
    const fetchUserData = async () => {
        try {
            const response = await laravelAPI.get("/api/user/profile");
            // console.log("check info user:", response)
            if (response.code === "success") {
                setFormData({
                    fullName: response.user.fullname,
                    email: response.user.email,
                    phone: response.user.phone,
                    address: response.user.address,
                });
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
    };

    // hàm show cart
    const fetchCart = async () => {
        try {
            const response = await laravelAPI.get("/api/carts");
            if (response.code === "success") {

                setCartItems(response.cart);
            }
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchCart();
    }, []);
    // Xử lý thay đổi trong form
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // tính tổng tiền
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.quantity * item.variant.specialPrice;
    }, 0);

    // hàm đặt hàng
    // const handleOrderSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await laravelAPI.post("/api/order", {
    //             fullName: formData.fullName,
    //             phone: formData.phone,
    //             email: formData.email,
    //             note: formData.note,
    //             shippingAddress: formData.shippingAddress,
    //             paymentMethod: formData.paymentMethod,
    //         });
    //         // console.log("check đặt hàng",response)
    //         if (response.code === "success") {
    //             toast.success(response.message);
    //             navigate("/orderSuccess")
    //         } else {
    //             toast.error("Đặt hàng thất bại!");
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi đặt hàng:", error);
    //     }
    // };

      // Hàm gọi API `/simulate` khi thanh toán bằng ZaloPay
    // const simulateZaloPayPayment = async (mTransId) => {
    //     try {
    //         const response = await laravelAPI.post("/api/zalopay/simulate", {
    //             app_id: 2554, // Thay bằng APP ID của bạn
    //             m_trans_id: mTransId,
    //         });
    //         console.log("check simulate", response)
    //         if (response.return_code === 1) {
    //             toast.success("Thanh toán ZaloPay thành công!");
    //             navigate(`/payment-success?orderId=${response.order_id}`);
    //         } else {
    //             toast.error("Lỗi khi xác nhận thanh toán!");
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi gửi simulate ZaloPay:", error);
    //     }
    // };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await laravelAPI.post("/api/order", {
                fullName: formData.fullName,
                phone: formData.phone,
                email: formData.email,
                note: formData.note,
                shippingAddress: formData.shippingAddress,
                paymentMethod: formData.paymentMethod,
            });
            console.log("check zalo",response)
            console.log("app_trans_id:", response.app_trans_id);
            if (response.code === "success") {
                if (formData.paymentMethod === "Thanh toán bằng ZaloPay") {
                    window.location.href = response.order_url; // Redirect đến trang thanh toán ZaloPay
                    // window.open(response.order_url, "_blank");
                } else {
                    toast.success(response.message);
                    navigate("/orderSuccess");
                }
            } else {
                toast.error("Đặt hàng thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
        }
    };
    



    return (
        <>
            <div className="py-[60px]">
                <div className="container px-[16px] mx-auto">
                    <div className=" ">
                        <h2 className="font-[700] text-[30px] text-[#000000] uppercase text-center pb-[20px]">thanh toán</h2>
                        <div className="flex justify-between">
                            <div className="w-[68%] shadow-[0_0_10px_#dddddd] py-[20px] px-[20px] rounded-[8px]">
                                <h3 className="font-[700] text-[16px] text-[#000000] pb-[12px]">Thông tin thanh toán</h3>
                                <form className="">
                                    <div className="flex flex-col gap-[5px] mb-[20px]">
                                        <label className="text-[16px] font-[400] text-[#000000]">Họ và Tên *</label>
                                        <input
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="text-[16px] font-[400] text-[#000000] w-full h-[50px] border !border-main px-[12px] rounded-[12px]"
                                            type="text"
                                            placeholder="Họ và tên"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mb-[20px]">
                                        <div className="flex flex-col gap-[5px] w-[48%]">
                                            <label className="text-[16px] font-[400] text-[#000000]">Số điện thoại *</label>
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="text-[16px] font-[400] text-[#000000] w-full h-[50px] border !border-main px-[12px] rounded-[12px]"
                                                type="text"
                                                placeholder="Số điện thoại"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-[5px] w-[48%]">
                                            <label className="text-[16px] font-[400] text-[#000000]">Email *</label>
                                            <input
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="text-[16px] font-[400] text-[#000000] w-full h-[50px] border !border-main px-[12px] rounded-[12px]"
                                                type="email"
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[5px] mb-[20px]">
                                        <label className="text-[16px] font-[400] text-[#000000]">Địa chỉ *</label>
                                        <input
                                            name="shippingAddress"
                                            value={formData.shippingAddress}
                                            onChange={handleChange}
                                            className="text-[16px] font-[400] text-[#000000] w-full h-[50px] border !border-main px-[12px] rounded-[12px]"
                                            type="text"
                                            placeholder="Địa chỉ"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-[5px] mb-[20px]">
                                        <label className="text-[16px] font-[400] text-[#000000]">Ghi chú</label>
                                        <textarea
                                            name="note"
                                            value={formData.note}
                                            onChange={handleChange}
                                            className="text-[16px] font-[400] text-[#000000] w-full h-[120px] border !border-main p-[12px] rounded-[12px] outline-none"
                                            type="text"
                                            placeholder="Nội dung"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <div className="flex items-center gap-[10px]">
                                            <input
                                                type="radio"
                                                id="cod"
                                                name="paymentMethod"
                                                value="Thanh toán khi nhận hàng"
                                                checked={formData.paymentMethod === "Thanh toán khi nhận hàng"}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="cod" className="text-[16px] font-[400] text-[#000000]">Thanh toán khi nhận hàng</label>
                                        </div>
                                        <div className="flex items-center gap-[10px]">
                                            <input
                                                type="radio"
                                                id="momo"
                                                name="paymentMethod"
                                                value="Thanh toán bàng VnPay"
                                                checked={formData.paymentMethod === "Thanh toán bàng VnPay"}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="momo" className="text-[16px] font-[400] text-[#000000]">Thanh toán bằng VnPay</label>
                                        </div>
                                        <div className="flex items-center gap-[10px]">
                                            <input
                                                type="radio"
                                                id="zalopay"
                                                name="paymentMethod"
                                                value="Thanh toán bằng ZaloPay"
                                                checked={formData.paymentMethod === "Thanh toán bằng ZaloPay"}
                                                // onChange={handleChange}
                                                onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                                            />
                                            <label htmlFor="zalopay" className="text-[16px] font-[400] text-[#000000]">
                                                Thanh toán bằng ZaloPay
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleOrderSubmit}
                                        type="submit"
                                        className="text-[18px] font-[700] text-[#ffffff] bg-main border border-main py-[10px] rounded-[8px] w-full my-[30px]">
                                        Đặt hàng
                                    </button>
                                </form>
                            </div>
                            <div className="w-[30%] shadow-[0_0_10px_#dddddd] py-[20px] px-[20px] rounded-[8px]">
                                <h3 className="font-[700] text-[16px] text-[#000000] pb-[12px]">Thông tin Đơn hàng</h3>
                                <div className="border-b py-[10px]">
                                    {cartItems.map((item, index) => (
                                        <div className="flex items-center gap-[5px] mb-[20px]">
                                            <div className="w-[100px] h-[100px]">
                                                <img src={item.image} alt={item.title} className="w-full h-full" />
                                            </div>
                                            <div className="flex flex-col gap-[4px] flex-1 px-[8px]">
                                                <h3 className="text-[14px] font-[600] text-[#000000] line-clamp-2"> {item.product?.title ?? "Sản phẩm không xác định"}</h3>
                                                <p className="text-[12px] font-[400] text-[#000000]">Màu: {item.variant?.color?.name}</p>
                                                <div className="flex items-center gap-[20px]">
                                                    <p className="text-[12px] font-[400] text-[#000000]">Size: {item.variant?.size?.name}</p>
                                                    <p className="text-[12px] font-[400] text-[#000000]">Số lượng: {item.quantity}</p>
                                                </div>
                                                <p className="text-[14px] font-[700] text-main">{item.variant.specialPrice.toLocaleString()}<sup>đ</sup></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mt-[16px]  text-[#000000]">
                                        <span className="font-[400] text-[16px]">Tổng giá trị sản phẩm:</span>
                                        <span className="font-[700] text-[16px]">{totalPrice.toLocaleString()}<sup>đ</sup></span>
                                    </div>
                                    <h3 className="font-[700] text-[16px] text-[#000000] mt-[16px]">Giảm giá đơn hàng</h3>
                                    <div className="flex items-center justify-between mt-[16px]">
                                        <div className="flex items-center gap-[8px] text-[14px] text-[#999999]">
                                            <span className=""><MdOutlineDiscount /></span>
                                            <span>8def8e (giảm 20.000đ)</span>
                                        </div>
                                        <span className="font-[400] text-[14px] text-[#000000]">- 20.000 <sup>đ</sup></span>
                                    </div>
                                    <div className="flex items-center justify-between mt-[10px]">
                                        <div className="flex items-center gap-[8px] text-[14px] text-[#999999]">
                                            <span className=""><MdOutlineDiscount /></span>
                                            <span>8def8e (giảm 20.000đ)</span>
                                        </div>
                                        <span className="font-[400] text-[14px] text-[#000000]">- 20.000 <sup>đ</sup></span>
                                    </div>
                                    <div className="flex items-center justify-between my-[25px]">
                                        <span className="text-[20px] font-[700] text-[#000000]">Tổng tiền:</span>
                                        <span className="text-[20px] font-[700] text-[#000000]">{totalPrice.toLocaleString()} <sup>đ</sup></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;