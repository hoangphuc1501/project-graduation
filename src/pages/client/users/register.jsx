import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axiosCustom';
import { toast } from 'react-toastify';
// import { registerUser } from "../../../services/client/UserApiService";

const Register = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email || !phone || !password || !fullname) {
            toast.error("Vui lòng điền đầy đủ thông tin.")
            return false;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            toast.error("Email không hợp lệ.")
            return false;
        }
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phone)) {
            toast.error("Số điện thoại không hợp lệ.")
            return false;
        }
        if (password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự.")
            return false;
        }
        return true;
    };
    const handleSubmitRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const userData = {
            fullname,
            email,
            phone,
            password,
        };

            const data = await axios.post("/user/register", userData);
            console.log(data);
            if (data.code === "success") {
                toast.success(data.message);
                navigate("/login")
            } else {
                toast.error(data.message);
            }
    };

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
                        <h2 className="text-[36px] font-[700] text-black text-center pb-[20px]">Đăng Ký</h2>
                        <form action="">
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input 
                                type="email" 
                                placeholder="Email" 
                                name="email"
                                value={email} 
                                className="flex-1" 
                                onChange={(e) => setEmail(e.target.value)}
                                />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faEnvelope} />
                            </div>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input 
                                type="text" 
                                placeholder="Họ và tên" 
                                name="fullname"
                                value={fullname} 
                                className="flex-1" 
                                onChange={(e) => setFullname(e.target.value)}
                                />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faUser} />
                            </div>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                            <input 
                                    type="text" 
                                    placeholder="Số điện thoại" 
                                    name="phone" 
                                    className="flex-1" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)} 
                                />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faPhone} />
                            </div>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                            <input 
                                    type="password" 
                                    placeholder="Mật khẩu" 
                                    name="password" 
                                    className="flex-1" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faLock} />
                            </div>

                            <button 
                            onClick={handleSubmitRegister}
                            className="font-[700] bg-main text-[16px] text-white hover:!text-main w-full py-[12px] rounded-[15px] my-[12px] hover:bg-white border !border-main ">Đăng Ký</button>
                            <div className="">
                                <p className="text-center text-[18px] font-[500] text-black py-[20px]">Hoặc sử dụng tài khoản của bạn</p>
                                <div className="flex items-center justify-center gap-[20px] pb-[20px]">
                                    <button><FontAwesomeIcon className="text-[24px] bg-[rgba(0,0,0,0.4)] hover:bg-main text-[#FFFFFF] p-[12px] rounded-[10px]" icon={faFacebook} /></button>
                                    <button><FontAwesomeIcon className="text-[24px] bg-[rgba(0,0,0,0.4)] hover:bg-main text-[#FFFFFF] p-[12px] rounded-[10px]" icon={faTwitter} /></button>
                                    <button><FontAwesomeIcon className="text-[24px] bg-[rgba(0,0,0,0.4)] hover:bg-main text-[#FFFFFF] p-[12px] rounded-[10px]" icon={faGoogle} /></button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-[5px] mt-[12px]">
                                <p className="font-[300] text-[16px] text-black ">Bạn chưa có tài khoản?</p>
                                <Link to="/login" className="font-[700] text-[17px] text-black underline hover:text-main">Đăng nhập</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register;