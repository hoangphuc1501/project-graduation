import { ButtonUpdateUser } from "../buttons/buttonEditUser";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { toast } from "react-toastify";
import { ChangePasswordApi } from "../../../services/client/UserApiService";
import { useNavigate } from "react-router-dom";

const ChangePass = () => {
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !oldPassword || !newPassword || !confirmPassword) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        try {
            const response = await ChangePasswordApi(email, oldPassword, newPassword);
            if (response.code === "success") {
                
                toast.success("Đổi mật khẩu thành công!");
                navigate("/profile");
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    };

    return (
        <div className="w-[60%] mx-auto">
            <h2 className="text-center text-[28px] text-main font-[700] pb-[40px]">Đổi mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                    <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder="Email" 
                    className="flex-1 text-[16px] text-[#000000] font-[400]" />
                    <MdEmail className="text-[20px] text-[#636d77]" />
                </div>
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                    <input 
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    type="password" 
                    placeholder="Mật khẩu cũ" 
                    className="flex-1 text-[16px] text-[#000000] font-[400]" />
                    <RiLockPasswordFill className="text-[20px] text-[#636d77]" />
                </div>
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                    <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} 
                    type="password" 
                    placeholder="Mật khẩu mới" 
                    className="flex-1 text-[16px] text-[#000000] font-[400]" />
                    <RiLockPasswordFill className="text-[20px] text-[#636d77]" />
                </div>
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                    <input 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password" 
                    placeholder="Xác nhận mật khẩu mới" 
                    className="flex-1 text-[16px] text-[#000000] font-[400]" />
                    <RiLockPasswordFill className="text-[20px] text-[#636d77]" />
                </div>
                <div className="mt-[20px]">
                    <ButtonUpdateUser text="Đổi mật khẩu" type= "submit"/>
                </div>
            </form>
        </div>
    )
}

export { ChangePass };