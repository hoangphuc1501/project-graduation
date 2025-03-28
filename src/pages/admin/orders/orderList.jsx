import { useState, useEffect } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import OrderDetailAdmin from "./orderDetail";
import ReactPaginate from "react-paginate";

const OrderList = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [ShowModalOrder, setShowModalOrder] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1
    });

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);

    // hàm lấy danh sách
    const fetchOrders = async (page = 1) => {
        try {
            setLoading(true);
            const response = await laravelAPI.get("/api/admin/orders", {
                params: {
                    page: page,
                    per_page: pagination.per_page
                }
            });
            // console.log("check order list", response)
            setOrders(response.data.data);
            setPagination({
                per_page: response.data.per_page,
                total: response.data.total,
                last_page: response.data.last_page
            });
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        } finally {
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
         // Lấy đơn hàng tương ứng
    const currentOrder = orders.find(order => order.id === orderId);

    // Nếu đang cố hủy đơn và là thanh toán ZaloPay thì không cho phép
    if (newStatus === "canceled" && currentOrder?.paymentMethod === "Thanh toán bằng ZaloPay") {
        toast.error("Không thể hủy đơn hàng đã thanh toán qua ZaloPay!");
        return;
    }

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
            console.log("check order detail", response)
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

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };

    return (
        <>
            <div className="py-[20px]">
                <div className="">
                    <h2 className="text-[28px] text-[#000000] font-[700] text-center py-[40px]">Quản lý đơn hàng</h2>
                    <div className="card mb-3">
                        <div className="card-header">
                            <h3 className="text-[20px] font-[700] text-[#00000] py-[10px]">
                                Bộ lọc và tìm kiếm
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="card-body">
                                <div className="grid grid-cols-2 gap-[20px]">
                                    <div className="flex flex-col gap-[10px]">
                                        <label className="text-[16px] font-[700] text-[#000000]">Trạng thái</label>
                                        <select
                                            className="form-control"
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
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <label className="text-[16px] font-[700] text-[#000000]">Tìm kiếm</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Tìm kiếm theo mã đơn hàng"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card my-[20px]">
                        <div className="card-header">
                            <div className="flex items-center justify-between py-[10px]">
                                <h3 className="text-[20px] text-[#000000] font-[700] ">
                                    Danh sách đơn hàng
                                </h3>
                            </div>
                        </div>
                        <div className="card-body">
                        {loading ? (
                            <p className="text-center">Đang tải dữ liệu...</p>
                        ) : (
                            <>
                                <table className="table table-hover table-sm">
                                    <thead className="bg-[#eeeeee] ">
                                        <tr>
                                            <th className="!py-[10px] text-center text-[16px] font-[600] text-[#000000]">STT</th>
                                            <th className="!py-[10px] text-center text-[16px] font-[600] text-[#000000]">Mã đơn hàng</th>
                                            <th className="!py-[10px] text-center text-[16px] font-[600] text-[#000000] w-[200px]">Địa chỉ</th>
                                            <th className="!py-[10px] text-center text-[16px] font-[600] text-[#000000] w-[140px] break-words whitespace-normal">Phương thức thanh toán</th>
                                            <th className="!py-[10px] text-center text-[16px] font-[600] text-[#000000]">Mã giảm giá</th>
                                            <th className="!py-[10px] text-center text-[16px] font-[600] text-[#000000]">Trạng thái</th>
                                            <th className="!py-[10px] text-center text-[16px] font-[600] text-[#000000]">Ngày mua</th>
                                            <th className="!py-[10px] text-center text-[16px] font-[600] text-[#000000]">Ngày cập nhật</th>
                                            <th className="!py-[10px] text-center text-[16px] font-[600] text-[#000000]">Tổng tiền</th>
                                            <th className="!py-[10px] text-center text-[16px] font-[600] text-[#000000]">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredOrders?.map((order, index) => (
                                            <tr key={order?.id}>
                                                <td className="text-[16px] font-[400] text-[#000000] !py-[20px] text-center">{index + 1 + (currentPage - 1) * 10}</td>
                                                <td className="text-[16px] font-[400] text-[#000000] !py-[20px] text-center">#{order?.code}</td>
                                                <td className="text-[16px] font-[400] text-[#000000] !py-[20px] text-center w-[200px] break-words whitespace-normal">{order?.shippingAddress}</td>
                                                <td className="text-[16px] font-[400] text-[#000000] !py-[20px] text-center w-[140px] break-words whitespace-normal">{order?.paymentMethod}</td>
                                                <td className="text-[16px] font-[400] text-[#000000] !py-[20px] text-center">{order?.voucherId || "Không có"}</td>
                                                <td className="flex items-center justify-center !py-[25px]">
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
                                                <td className="text-[16px] font-[400] text-[#000000] !py-[20px] text-center">{new Date(order?.createdAt).toLocaleDateString()}</td>
                                                <td className="text-[16px] font-[400] text-[#000000] !py-[20px] text-center">{new Date(order?.updatedAt).toLocaleDateString()}</td>
                                                <td className="text-[16px] font-[400] text-[#000000] !py-[20px] text-center">{order?.totalPrice.toLocaleString()}<sup>đ</sup></td>
                                                <td className="flex items-center justify-center !py-[20px]">
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
                                <div className="flex items-center justify-center mt-[20px]">
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="›"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={1}
                                        pageCount={pagination.last_page}
                                        previousLabel="‹"
                                        forcePage={currentPage - 1}
                                        containerClassName="pagination"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        activeClassName="active"
                                    />
                                </div>
                            </>
                        )}
                        </div>
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