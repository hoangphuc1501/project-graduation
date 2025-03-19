import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ZaloPayButton = ({ amount }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/zalopay/create-payment", { amount: 100000 });
    
            if (response.data.zalopay_response && response.data.zalopay_response.order_url) {
                window.location.href = response.data.zalopay_response.order_url; // Chuyển hướng đến ZaloPay
            } else {
                toast.error("Không thể tạo đơn hàng ZaloPay!");
            }
        } catch (error) {
            console.error("Lỗi thanh toán:", error);
            toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
        }
        setLoading(false);
    };
    
    return (
        <button onClick={handlePayment} disabled={loading}>
            {loading ? "Đang xử lý..." : "Thanh toán qua ZaloPay"}
        </button>
    );
};

export default ZaloPayButton;
