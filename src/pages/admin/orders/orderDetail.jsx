import Modal from "react-bootstrap/Modal";

const OrderDetailAdmin = ({ showModalOrderDetail, setShowModalOrderDetail, selectedOrder }) => {
    const handleClose = () => setShowModalOrderDetail(false);
    console.log("selectedOrder:", selectedOrder); 

    return (
        <Modal show={showModalOrderDetail} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedOrder ? (
                    <>
                        <p><strong>Mã đơn hàng:</strong> #{selectedOrder?.order_code}</p>
                        <p><strong>Địa chỉ:</strong> {selectedOrder?.shipping_address || "Không có địa chỉ"}</p>
                        <p><strong>Phương thức thanh toán:</strong> {selectedOrder?.payment_method || "Không xác định"}</p>
                        <p><strong>Trạng thái:</strong> {selectedOrder?.status?.label || "Không xác định"}</p>
                        <p><strong>Tổng tiền:</strong> {selectedOrder?.total_price?.toLocaleString()} đ</p>
                        
                        <h4 className="mt-4">Thông tin khách hàng:</h4>
                        <p><strong>Họ tên:</strong> {selectedOrder?.user?.name || "Không có tên"}</p>
                        <p><strong>Email:</strong> {selectedOrder?.user?.email || "Không có email"}</p>
                        <p><strong>Số điện thoại:</strong> {selectedOrder?.user?.phone || "Không có số điện thoại"}</p>
                        
                        <h4 className="mt-4">Sản phẩm:</h4>
                        <div className="border-t pt-3">
                            {selectedOrder?.items && selectedOrder.items.length > 0 ? (
                                selectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex border-b py-3 items-center">
                                        <img 
                                            src={item.image || "/default-image.jpg"} 
                                            alt={item.product?.title || "Sản phẩm"} 
                                            className="w-16 h-16 object-cover rounded-lg mr-4"
                                        />
                                        <div>
                                            <p className="font-semibold">{item.product?.title || "Sản phẩm không có tên"}</p>
                                            <p>Màu: <span className="text-gray-600">{item.variant?.color?.name || "Không xác định"}</span></p>
                                            <p>Size: <span className="text-gray-600">{item.variant?.size?.name || "Không có"}</span></p>
                                            <p>Số lượng: {item.quantity || 0}</p>
                                            <p>Giá: <span className="text-green-500">{item.variant?.special_price ? item.variant.special_price.toLocaleString() + " đ" : "0 đ"}</span></p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 mt-2">Không có sản phẩm nào trong đơn hàng.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p>Đang tải chi tiết đơn hàng...</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default OrderDetailAdmin;
