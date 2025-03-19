import { useState } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";

const TestVnpay = () => {
    const [amount, setAmount] = useState("");
    const [paymentUrl, setPaymentUrl] = useState("");

    const handlePayment = async () => {
        try {
            const response = await laravelAPI.post("/api/payment/vnpay", {
                amount: amount,
            });
            console.log("check payment", response)
            setPaymentUrl(response.paymentUrl);
        } catch (error) {
            console.error("Thanh toán thất bại", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Thanh Toán VNPay</h2>
            <input
                type="number"
                placeholder="Nhập số tiền"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Thanh Toán</button>
            {paymentUrl && (
                <div>
                    <h3>Nhấn vào link để thanh toán:</h3>
                    <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
                        Thanh toán ngay
                    </a>
                </div>
            )}
        </div>
    );
}

export default TestVnpay