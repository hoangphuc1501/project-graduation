import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { laravelAPI } from "../../../utils/axiosCustom";

const OrderDetail = () => {
    const { orderId } = useParams(); 
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchOrderDetail();
    }, [orderId]);

    const fetchOrderDetail = async () => {
        try {
            
            const response = await laravelAPI.get(`/api/order/${orderId}`);
            // console.log("check order detail", response)
            if (response.code === "success") {
                setOrder(response.order);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError("Lỗi khi tải chi tiết đơn hàng!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Đang tải đơn hàng...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h2>
            <div className="border p-4 rounded-lg shadow-md">
                <div className="mb-4">
                    <p><strong>Mã đơn hàng:</strong> {order.order_code}</p>
                    <p><strong>Tổng tiền:</strong> {order.total_price.toLocaleString()} đ</p>
                    <p><strong>Trạng thái:</strong> 
                    {order.status.label}
                    </p>
                    <p><strong>Phương thức thanh toán:</strong> {order.payment_method}</p>
                    <p><strong>Trạng thái thanh toán:</strong> 
                        {order.payment_status === "paid" ? 
                            <span className="text-green-500 ml-2">Đã thanh toán</span> :
                            <span className="text-red-500 ml-2">Chưa thanh toán</span>
                        }
                    </p>
                    <p><strong>Ngày tạo:</strong> {order.created_at}</p>
                </div>
                <h3 className="text-xl font-semibold mb-3">Danh sách sản phẩm</h3>
                <div className="border-t pt-3">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex border-b py-3 items-center">
                            <img src={item.image || "/default-image.jpg"} alt="Product" className="w-16 h-16 object-cover rounded-lg mr-4"/>
                            <div>
                                <p className="font-semibold">{item.product.title}</p>
                                <p>Màu: <span className="text-gray-600">{item.variant.color.name}</span></p>
                                <p>Size: <span className="text-gray-600">{item.variant.size.name}</span></p>
                                <p>Số lượng: {item.quantity}</p>
                                <p>Giá: <span className="text-green-500">{item.variant.special_price.toLocaleString()} đ</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
