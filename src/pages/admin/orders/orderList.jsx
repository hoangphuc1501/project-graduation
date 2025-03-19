import { useState, useEffect } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import OrderDetailAdmin from "./orderDetail";

const OrderList = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [ShowModalOrder, setShowModalOrder] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    // hàm lấy danh sách
    const fetchOrders = async () => {
        try {
            const response = await laravelAPI.get("/api/admin/orders");
            // console.log("check order list", response)
            setOrders(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error);
            setLoading(false);
        }
    };

    // hàm thay đổi trạng thái
    const handleStatusChange = async (orderId, newStatus, currentStatus, setOrders) => {
        // Xác định các trạng thái hợp lệ
        const validStatusFlow = {
            pending: ["confirmed", "canceled"],
            confirmed: ["shipped", "canceled"],
            shipped: ["completed"],
            completed: [],
            canceled: []
        };

        // Kiểm tra nếu trạng thái mới không hợp lệ
        if (!validStatusFlow[currentStatus].includes(newStatus)) {
            toast.error("Không thể quay lại trạng thái trước đó!");
            return;
        }

        // Nếu người dùng muốn hủy đơn hàng, hiển thị cảnh báo
        if (newStatus === "canceled") {
            const result = await Swal.fire({
                title: "Bạn có chắc chắn muốn hủy đơn hàng?",
                text: "Bạn sẽ không thể khôi phục sau khi hủy!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Có, hủy đơn!",
                cancelButtonText: "Không"
            });

            if (!result.isConfirmed) return; // dừng lại

            try {
                await laravelAPI.patch(`/api/admin/orders/${orderId}`, { status: newStatus });

                // Cập nhật trạng thái ngay 
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === orderId ? { ...order, status: newStatus } : order
                    )
                );
                Swal.fire({
                    title: "Đã hủy!",
                    text: "Đơn hàng đã được hủy thành công.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
            } catch (error) {
                console.error("Lỗi khi cập nhật trạng thái:", error);
                Swal.fire({
                    title: "Lỗi!",
                    text: "Không thể hủy đơn hàng, vui lòng thử lại.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        } else {
            // Cập nhật trạng thái khác ngoài "canceled"
            try {
                await laravelAPI.patch(`/api/admin/orders/${orderId}`, { status: newStatus });

                // Cập nhật ngay lập tức để giao diện thay đổi
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === orderId ? { ...order, status: newStatus } : order
                    )
                );

                toast.success("Cập nhật trạng thái thành công.");
            } catch (error) {
                console.error("Lỗi khi cập nhật trạng thái:", error);
                toast.error("Không thể cập nhật trạng thái, vui lòng thử lại.");
            }
        }
    };

    // Lấy chi tiết đơn hàng
    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await laravelAPI.get(`/api/admin/orders/${orderId}`);
            console.log("check order detail",response)
            setSelectedOrder(response.order);
            setShowModalOrder(true); 
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
            toast.error("Không thể tải chi tiết đơn hàng.");
        }
    };
    

    // Lọc và tìm kiếm đơn hàng
    const filteredOrders = orders.filter(order =>
        (statusFilter === "" || order.status === statusFilter) && (searchTerm === "" || order.code.includes(searchTerm))
    );


    return (
        <>
            <div className="py-[20px]">
                <div className="">
                    <h2 className="text-[28px] text-[#000000] font-[700] text-center py-[40px]">Quản lý đơn hàng</h2>
                    <div className="flex items-center gap-[20px]">
                        <select
                            className="border w-[240px] text-[16px] py-[10px] px-[10px] rounded-[8px] text-[#000000]"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            <option value="pending">Chờ xác nhận</option>
                            <option value="confirmed">Đã xác nhận</option>
                            <option value="shipped">Đang vận chuyển</option>
                            <option value="completed">Đã giao hàng</option>
                            <option value="canceled">Đã hủy</option>
                        </select>
                        <input
                            className="border flex-1 py-[10px] text-[16px] px-[10px] rounded-[8px] text-[#000000]"
                            type="text"
                            placeholder="Tìm kiếm theo mã đơn hàng"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="my-[20px]">
                        {loading ? (
                            <p className="text-center">Đang tải dữ liệu...</p>
                        ) : (
                            <table className="w-full border">
                                <thead className="bg-[#eeeeee] ">
                                    <tr>
                                        <th className="py-[10px] text-center text-[16px] font-[600] text-[#000000]">STT</th>
                                        <th className="py-[10px] text-center text-[16px] font-[600] text-[#000000]">Mã đơn hàng</th>
                                        <th className="py-[10px] text-center text-[16px] font-[600] text-[#000000] w-[200px]">Địa chỉ</th>
                                        <th className="py-[10px] text-center text-[16px] font-[600] text-[#000000] w-[140px] break-words whitespace-normal">Phương thức thanh toán</th>
                                        <th className="py-[10px] text-center text-[16px] font-[600] text-[#000000]">Mã giảm giá</th>
                                        <th className="py-[10px] text-center text-[16px] font-[600] text-[#000000]">Trạng thái</th>
                                        <th className="py-[10px] text-center text-[16px] font-[600] text-[#000000]">Ngày mua</th>
                                        <th className="py-[10px] text-center text-[16px] font-[600] text-[#000000]">Ngày cập nhật</th>
                                        <th className="py-[10px] text-center text-[16px] font-[600] text-[#000000]">Tổng tiền</th>
                                        <th className="py-[10px] text-center text-[16px] font-[600] text-[#000000]">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders?.map((order, index) => (
                                        <tr key={order?.id} className="border-t">
                                            <td className="text-[16px] font-[400] text-[#000000] py-[20px] text-center">{index + 1}</td>
                                            <td className="text-[16px] font-[400] text-[#000000] py-[20px] text-center">#{order?.code}</td>
                                            <td className="text-[16px] font-[400] text-[#000000] py-[20px] text-center w-[200px] break-words whitespace-normal">{order?.shippingAddress}</td>
                                            <td className="text-[16px] font-[400] text-[#000000] py-[20px] text-center w-[140px] break-words whitespace-normal">{order?.paymentMethod}</td>
                                            <td className="text-[16px] font-[400] text-[#000000] py-[20px] text-center">{order?.voucherId || "Không có"}</td>
                                            <td className="flex items-center justify-center py-[20px]">
                                                <select
                                                    className="w-[80%] py-[8px] px-[10px] border rounded-[12px] outline-none text-[16px] text-[#000000]"
                                                    value={order?.status}
                                                    onChange={(e) => handleStatusChange(order?.id, e.target.value, order?.status, setOrders)}
                                                >
                                                    {/* Hiển thị trạng thái hiện tại nhưng không cho chọn lại */}
                                                    <option value={order?.status} disabled>
                                                        {order?.status === "pending" && "Chờ xác nhận"}
                                                        {order?.status === "confirmed" && "Đã xác nhận"}
                                                        {order?.status === "shipped" && "Đang vận chuyển"}
                                                        {order?.status === "completed" && "Đã giao hàng"}
                                                        {order?.status === "canceled" && "Đã hủy"}
                                                    </option>

                                                    {/* Chuyển trạng thái theo quy trình */}
                                                    {order?.status === "pending" && (
                                                        <>
                                                            <option value="confirmed">Đã xác nhận</option>
                                                            <option value="canceled">Hủy đơn hàng</option>
                                                        </>
                                                    )}
                                                    {order?.status === "confirmed" && (
                                                        <>
                                                            <option value="shipped">Đang vận chuyển</option>
                                                            <option value="canceled">Hủy đơn hàng</option>
                                                        </>
                                                    )}
                                                    {order?.status === "shipped" && <option value="completed">Đã giao hàng</option>}
                                                </select>

                                            </td>
                                            <td className="text-[16px] font-[400] text-[#000000] py-[20px] text-center">{new Date(order?.createdAt).toLocaleDateString()}</td>
                                            <td className="text-[16px] font-[400] text-[#000000] py-[20px] text-center">{new Date(order?.updatedAt).toLocaleDateString()}</td>
                                            <td className="text-[16px] font-[400] text-[#000000] py-[20px] text-center">{order?.totalPrice.toLocaleString()}<sup>đ</sup></td>
                                            <td className="flex items-center justify-center py-[20px]">
                                                <button
                                                    onClick={() => fetchOrderDetails(order?.id)}
                                                    className="text-[16px] font-[400] text-main border !border-main rounded-[8px] py-[8px] px-[10px]" >
                                                    Chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <OrderDetailAdmin
    showModalOrderDetail={ShowModalOrder}
    setShowModalOrderDetail={setShowModalOrder}
    selectedOrder={selectedOrder}
/>
        </>
    )
}

export default OrderList;