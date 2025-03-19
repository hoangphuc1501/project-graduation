import { useEffect, useState } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const ShoppingHistory = () => {
    const [orders, setOrders] = useState([]);
    const [activeStatus, setActiveStatus] = useState("all");
    const [loading, setLoading] = useState(false);
    const [totalOrders, setTotalOrders] = useState(0);
    const statuses = [
        { label: "Tất cả", value: "all" },
        { label: "Chờ xác nhận", value: "pending" },
        { label: "Đã xác nhận", value: "confirmed" },
        { label: "Đang vận chuyển", value: "shipped" },
        { label: "Đã giao hàng", value: "completed" },
        { label: "Đã hủy", value: "canceled" },
    ];

    // hiển thị danh sách đơn hàng
    useEffect(() => {
        fetchOrders();
    }, [activeStatus]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await laravelAPI.get(`/api/orders?status=${activeStatus}`);
            const ordersData = response.data.data;
            // console.log("check order", ordersData);
            setTotalOrders(ordersData.length); // tổng số lượng đơn hàng
            // chi tiết đơn hàng
            const ordersWithProducts = await Promise.all(ordersData.map(async (order) => {
                try {
                    const orderDetailResponse = await laravelAPI.get(`/api/order/${order.id}`);
                    console.log("check chi tiết", orderDetailResponse);

                    // lấy sản phẩm đầu tiên của chi tiết
                    const orderDetail = orderDetailResponse.order;
                    const firstItem = orderDetail?.items?.length > 0 ? orderDetail.items[0] : null;
                    const firstProduct = firstItem ? {
                        title: firstItem.product?.title,
                        image: firstItem.image
                    } : null;

                    return { ...order, firstProduct };
                } catch (error) {
                    console.error("Lỗi khi tải chi tiết đơn hàng", error);
                    return { ...order, firstProduct: null };
                }
            }));

            setOrders(ordersWithProducts);
        } catch (error) {
            console.error("Lỗi khi tải danh sách đơn hàng", error);
        }
        setLoading(false);
    };

    // hủy đơn hàng
    const handleCancelOrder = async (orderId) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Bạn sẽ không thể hoàn tác thao tác này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await laravelAPI.post(`/api/order/${orderId}/cancel`);
                    console.log(response);
                    toast.success(response.message);
                    fetchOrders();
                    Swal.fire({
                        title: "Đã hủy!",
                        text: "Đơn hàng của bạn đã bị hủy.",
                        icon: "success"
                    });
                } catch (error) {
                    toast.error("Có lỗi xảy ra khi hủy đơn hàng!");
                }
            }
        });
    };
    return (
        <>
            <div className="">
                <div className="flex items-center gap-[20px] mb-[20px]">
                    <div className="w-[80px] h-[80px] rounded-[100%] border !border-[#A83288] p-[10px]">
                        <img
                            src="https://cdn2.cellphones.com.vn/50x50,webp,q100/media/wysiwyg/Shipper_CPS3_1.png"
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h3 className="text-[20px] font-[700] text-[#A83288] uppercase">
                            Phạm Hoàng Phúc
                        </h3>
                        <p className="font-[400] text-[16px] text-[#637381]">0333573303</p>
                    </div>
                </div>
                <div className="shadow-[0_0_5px_#CCCCCC] py-[20px] flex items-center justify-between h-[120px] rounded-[8px] mb-[20px]">
                    <div className="w-[49%] border-r !border-[#000000] h-full flex flex-col items-center justify-center gap-[8px]">
                        <span className="text-[28px] font-[700] text-[#000000] ">{totalOrders}</span>
                        <span className="text-[16px] font-[400] text-[#000000] ">
                            đơn hàng
                        </span>
                    </div>
                    <div className="flex-1 h-full flex flex-col items-center justify-center gap-[8px]">
                        <span className="text-[28px] font-[700] text-[#000000] ">1M</span>
                        <span className="text-[16px] font-[400] text-[#000000] ">
                            Tổng tiền tích lũy từ 01/01/2024
                        </span>
                    </div>
                </div>
                <div className="my-[40px]">
                    <div className="flex items-center gap-[20px]">
                        {statuses?.map((s) => (
                            <button
                                key={s.value}
                                onClick={() => setActiveStatus(s.value)}
                                className={`font-[400] text-[16px] text-[#4a4a4a] py-[8px] px-[15px] shadow-[0_0_3px_#CCCCCC] rounded-[8px] ${activeStatus === s.value ? "bg-main text-[#ffffff]" : "bg-[#ffffff] text-[#4a4a4a]"}`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                    {loading ? (
                        <p>Đang tải...</p>
                    ) : (
                        <div className="py-[40px]">
                            {orders?.length === 0 ? (
                                <p className="text-[16px] font-[400] text-[#000000] text-center my-[40px]">Không có đơn hàng nào.</p>
                            ) : (
                                orders?.map((order) => (
                                    <div key={order?.id} className="shadow-[0_0_3px_#CCCCCC] rounded-[8px] py-[20px] px-[20px] mb-[20px]">
                                        <div className="flex justify-between items-center border-b pb-[10px]">
                                            <span className="text-[16px] font-[700] text-[#000000]">
                                                Mã đơn hàng: #{order?.code}
                                            </span>
                                            <span className="text-[16px] font-[500] text-[#000000]">
                                                Ngày mua hàng: {new Date(order?.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex gap-[10px] mt-[10px] border-b py-[10px]">
                                            <div className="w-[100px] h-[100px]">
                                                <img
                                                    src={order?.firstProduct?.image}
                                                    alt={order?.firstProduct?.title}
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-[16px] font-[700] text-[#000000]">
                                                    {order?.firstProduct?.title}
                                                </h3>
                                                <div className="flex justify-between mt-[10px]">
                                                    <div className="">
                                                        <span className={`font-[400] text-[14px] py-[6px] px-[10px] rounded-[8px] inline-flex mb-[10px] ${order?.status === 'completed' ? 'bg-[#EBF8F2] text-[#007b55]' : 'bg-[#F8E2E2] text-[#D32F2F]'}`}>
                                                            {statuses.find(s => s.value === order?.status)?.label || order?.status}
                                                        </span>
                                                        <p className="font-[400] text-[14px] text-[#000000]">Mã giảm giá đã áp dụng</p>
                                                    </div>
                                                    <div className="flex flex-col gap-[8px]">
                                                        <span className="text-[14px] text-main font-[400]">{order?.paymentMethod}</span>
                                                        <span className="font-[400] text-[14px] py-[3px] px-[10px] text-[#000000]">Tổng tiền: <strong> {order?.totalPrice?.toLocaleString()} <sup>đ</sup></strong></span>
                                                        <Link
                                                            to={`/orderDetail/${order?.id}`}
                                                            className="text-[16px] text-main font-[500]">Xem chi tiết</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-[15px]">
                                            <span className="text-[14px] text-[#AAAAAA] font-[400]">Thanh toán online và đơn hàng đang vận chuyển sẽ không hủy được</span>
                                            {(order?.status === "pending" || order?.status === "confirmed") && (
                                                <button
                                                    onClick={() => handleCancelOrder(order?.id)}
                                                    className="text-[14px] text-main font-[400] py-[4px] px-[20px] border !border-main rounded-[8px]"
                                                >
                                                    Hủy đơn hàng
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};

export { ShoppingHistory };
