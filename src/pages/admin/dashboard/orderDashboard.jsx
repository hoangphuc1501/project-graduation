import React, { useEffect, useState } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await laravelAPI.get("/api/admin/orders");
                // console.log("check đơn hàng", response)
                if (response.code === "success") {
                    setOrders(response.data.data.slice(0, 9)); // Lấy 9 đơn hàng đầu tiên
                }
            } catch (error) {
                console.error("Lỗi khi lấy đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // hàm đổi trạng thái
    const translateStatus = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "Chờ xác nhận";
            case "confirmed":
                return "Đã xác nhận";
            case "shipped":
                return "Đang vận chuyển";
            case "completed":
                return "Đã giao hàng";
            case "canceled":
                return "Đã hủy";
            default:
                return "Không xác định";
        }
    };

    // Hàm đổi màu trạng thái
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "#FFA500";
            case "confirmed":
                return "#007BFF";
            case "shipped":
                return "#8A2BE2";
            case "completed":
                return "#28A745";
            case "canceled":
                return "#DC3545";
            default:
                return "#000000";
        }
    };

    if (loading) return <p>Đang tải danh sách đơn hàng...</p>;

    return (
        <div className="w-[100%]">
            <h3 className="text-[20px] text-[#000000] font-[700] mb-[20px] text-center"> Đơn hàng mới nhất</h3>
            {orders.map((order) => (
                <div key={order.id} className="py-[10px] border-b mb-[10px]">
                    <p className="text-[16px] font-[700] text-[#000000] pb-[4px]">{order.user.fullname}</p>
                    <p className="text-[16px] font-[400] pb-[4px] flex items-center gap-[10px]">
                        Trạng thái:
                        <span style={{ color: getStatusColor(order.status) }}>
                            {translateStatus(order.status)}
                        </span>
                    </p>
                    <p className="text-[16px] font-[400] text-[#000000] pb-[4px]">Mã đơn hàng: <strong>#{order.code}</strong></p>
                    <p className="text-[16px] font-[400] text-[#000000] pb-[4px]">Phương thức: {order.paymentMethod}</p>
                    <p className="text-[16px] font-[400] text-[#000000] pb-[4px]">
                        Tổng tiền: <strong>{Number(order.totalPrice).toLocaleString("vi-VN")} </strong><sup>đ</sup>
                    </p>
                </div>
            ))}
        </div>
    );
};


export default OrderDashboard;
