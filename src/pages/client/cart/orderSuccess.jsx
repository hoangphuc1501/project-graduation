import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


const OrderSuccessfully = () => {

    return (
        <>
            <div className="py-[120px]">
                <div className="container px-[16px] mx-auto">
                    <div className="">
                        <div className="flex flex-col items-center gap-[20px] w-[60%] mx-auto">
                            <span className="text-[60px] text-[#33CC00]"><FaCheckCircle /></span>
                            <h2 className="text-[28px] text-[#000000] font-[700]">Đặt hàng thành công</h2>
                            <p className="text-[14px] text-[#000000] font-[400] text-center">
                                Chúc mừng quý khách hàng đã thanh toán thành công đơn hàng 1231233432 tại SmashPro. Nhân viên chăm sóc khách hàng của chúng tôi sẽ liên hệ với quý khách hàng khi đơn hàng đã được xác nhận. Quý khách hàng cũng có thể theo dõi đơn hàng bằng cách đăng nhập và theo dõi đơn hàng trên website chúng tôi
                            </p>
                        </div>
                        <div className="flex items-center gap-[40px] mt-[40px] justify-center">
                            <Link 
                                to="/profile/history"
                                className="text-[20px] font-[400] text-main hover:text-main border !border-main py-[10px] px-[20px] rounded-[12px]">
                                Xem danh sách đơn hàng
                            </Link>
                            <Link 
                            to="/"
                            className="text-[20px] font-[400] text-[#ffffff] hover:text-[#ffffff] border !border-main py-[10px] px-[20px] rounded-[12px] bg-main">
                                Về trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderSuccessfully;