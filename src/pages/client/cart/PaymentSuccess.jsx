import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { laravelAPI } from "../../../utils/axiosCustom";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("loading");
    const orderId = searchParams.get("orderId");

    useEffect(() => {
        const checkPaymentStatus = async () => {
            console.log("OrderId gửi lên API:", orderId);
            console.log(window.location.href);
            if (!orderId) {
                setStatus("failed");
                return;
            }

            try {
                const response = await laravelAPI.get(`/api/order/status?orderId=${orderId}`);
                console.log("check status", response)
                setStatus(response.paymentStatus === "paid" ? "success" : "failed");
            } catch (error) {
                setStatus("failed");
            }
        };

        checkPaymentStatus();
    }, [orderId]);

    return (
        <div>
            {status === "loading" && <h1>🔄 Đang kiểm tra thanh toán...</h1>}
            {status === "success" && <h1>🎉 Thanh toán thành công!</h1>}
            {status === "failed" && <h1>❌ Thanh toán thất bại!</h1>}
        </div>
    );
};

export default PaymentSuccess;
