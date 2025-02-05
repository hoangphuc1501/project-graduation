import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from '../../../utils/axiosCustom';
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../middleware/UserContext";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const data = await axios.post("/user/login", { email, password });
        if (data.code === "success") {
            const userData = data.user;
            const token = data.token;

            // Lưu vào localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));

            // Cập nhật state ngay lập tức
            setUser(userData);
            window.dispatchEvent(new Event("storage"));
            toast.success(data.message);
            navigate("/")
        } else {
            toast.error(data.message);
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
                        <h2 className="text-[36px] font-[700] text-black text-center pb-[20px]">Đăng nhập</h2>
                        <form action="">
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1" />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faEnvelope} />
                            </div>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex-1" />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faLock} />
                            </div>
                            <div className="flex justify-between items-center px-[20px]">
                                <div className="flex items-center gap-x-[6px]">
                                    <input type="checkbox" id="remeberPass" className="w-[15px] h-[15px]" />
                                    <label htmlFor="remeberPass" className="font-[500] text-black text-[18px] cursor-pointer hover:text-main" >Nhớ mật khẩu</label>
                                </div>
                                <button className="font-[500] text-black text-[18px] cursor-pointer hover:text-main hover:underline">
                                    Quên mật khẩu?
                                </button>
                            </div>
                            <button
                                onClick={handleSubmitLogin}
                                className="font-[700] bg-main text-[16px] text-white hover:!text-main w-full py-[12px] rounded-[15px] my-[12px] hover:bg-white border !border-main">Đăng nhập</button>
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
                                <Link to="/register" className="font-[700] text-[17px] text-black underline hover:text-main">Đăng ký</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login;