import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { fogotUserApi } from "../../../services/client/UserApiService";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fogotUserApi(email);
        if (res.code === "success") {
            toast.success(res.message);
            navigate("/confirmOtp")
        } else {
            toast.error(res.message);
        }
    }
    return (

        <div className="my-[100px]">
            <div className="container mx-auto px-[16px]">
                <div className="relative">
                    <div className="">
                        <div className="absolute bottom-[-530px] left-[-260px]">
                            <img src="https://static.fbshop.vn/template/assets/images/spt-img/dndecor.png" alt="" />
                        </div>
                        <div className="absolute bottom-[-10px] right-[-220px]">
                            <img src="https://static.fbshop.vn/template/assets/images/spt-img/line.png" alt="" />
                        </div>
                        <div className="absolute bottom-[110px] right-[-120px]">
                            <img src="https://static.fbshop.vn/template/assets/images/spt-img/line.png" alt="" />
                        </div>
                    </div>
                    <div className="w-[45%] mx-auto py-[32px] px-[24px] border border-black rounded-[20px] shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        <h2 className="text-[36px] font-[700] text-black text-center pb-[20px]">Quên mật khẩu</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input
                                value={email}
                                onChange={handleEmailChange} 
                                type="email" 
                                placeholder="Email" 
                                className="flex-1 text-[16px] text-[#000000] font-[400]"
                                required />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faEnvelope} />
                            </div>
                            <button
                            type="submit" 
                            
                            className="font-[700] bg-main text-[16px] text-[#ffffff] hover:text-main w-full py-[12px] rounded-[15px] my-[12px] hover:bg-[#ffffff] border !border-main">Gửi mã OTP</button>
                            <div className="flex items-center justify-center gap-[5px] mt-[12px]">
                                <p className="font-[300] text-[16px] text-black ">Bạn đã nhớ mật khẩu?</p>
                                <Link to="/login" className="font-[700] text-[17px] text-black underline hover:text-main">Đăng nhập ngay</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ForgotPassword;