import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import { toast } from "react-toastify";

const ContactForm = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        content: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await laravelAPI.post("/api/contact", formData);
            console.log(response)
            if(response.code === "success" ){
                toast.success(response.message)
                setFormData({ fullName: "", email: "", phone: "", content: "" });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Lỗi khi gửi thông tin, vui lòng thử lại.");
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px] ">
                    <input 
                    type="text" 
                    placeholder="Nhập họ và tên của bạn" 
                    className="flex-1 text-[#000000]" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange}
                    />
                    <FontAwesomeIcon className="text-[#636d77]" icon={faUser} />
                </div>
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                    <input 
                    type="email" 
                    placeholder="Nhập email của bạn" 
                    className="flex-1 text-[#000000]" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    />
                    <FontAwesomeIcon className="text-[#636d77]" icon={faEnvelope} />
                </div>
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                    <input
                        type="text"
                        placeholder="Nhập số điện thoại"
                        className="flex-1 text-[#000000]"
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                    />
                    <FontAwesomeIcon className="text-[#636d77]" icon={faPhone} />
                </div>
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                    <textarea 
                    name="content" 
                    value={formData.content} 
                    onChange={handleChange}  
                    placeholder="Nội dung" 
                    className="h-[120px] overflow-auto w-full outline-none text-[#000000]">
                    </textarea>
                </div>
                <div className="flex justify-center items-center">
                    <button 
                    type="submit"
                    className="font-[700] bg-main text-[16px] text-[#ffffff] hover:text-main w-[30%] py-[12px] rounded-[15px] my-[12px] hover:bg-[#ffffff] border !border-main ">
                        Gửi
                    </button>
                </div>
            </form>
        </>
    )
}

export default ContactForm;