import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../middleware/UserContext";
import { laravelAPI } from "../../../utils/axiosCustom";
const LoginAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const syncPermissions = async () => {
        try {
            const response = await laravelAPI.get("/api/admin/getMyPermissions");
            // console.log("check gọi permissin", response)
            if (response.code === "success") {
                localStorage.setItem("permissions", JSON.stringify(response.permissions));
            }
        } catch (error) {
            console.error("Lỗi khi đồng bộ quyền:", error);
        }
    };
    

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            // Gửi yêu cầu đăng nhập đến API Laravel
            const response = await laravelAPI.post("/api/loginAdmin", {
                email,
                password
            });
            console.log("check login", response)

            if (response.code === "success") {
                const userData = response.user;
                const token = response.token;

                // Kiểm tra vai trò của user
                if (userData.roles.includes("Khách hàng")) {
                    toast.error("Bạn không có quyền truy cập vào admin!");
                    return;
                }

                // Lưu token và user vào localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(userData));
                // localStorage.setItem("permissions", JSON.stringify(userData.permissions));

                await syncPermissions();
                // Cập nhật state user
                setUser(userData);
                window.dispatchEvent(new Event("storage"));
                toast.success(response.message);
                navigate("/admin/dashboard"); 
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.response?.message || "Đăng nhập thất bại!");
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
                        <h2 className="text-[36px] font-[700] text-black text-center pb-[20px]">Đăng nhập</h2>
                        <form  onSubmit={handleSubmitLogin}>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="flex-1 text-[#000000] text-[16px]" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faEnvelope} />
                            </div>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className="flex-1  text-[#000000] text-[16px]" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faLock} />
                            </div>
                            <button
                            type="submit"
                                className="font-[700] bg-main text-[16px] text-white hover:!text-main w-full py-[12px] rounded-[15px] my-[12px] hover:bg-white border !border-main">Đăng nhập</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin;