import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

const ContactForm = () => {
    return (
        <>
            <form action="">
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                    <input type="text" placeholder="Nhập họ và tên của bạn" className="flex-1" />
                    <FontAwesomeIcon className="text-[#636d77]" icon={faUser} />
                </div>
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                    <input type="email" placeholder="Nhập email của bạn" className="flex-1" />
                    <FontAwesomeIcon className="text-[#636d77]" icon={faEnvelope} />
                </div>
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                    <input
                        type="text"
                        placeholder="Nhập số điện thoại"
                        className="flex-1"
                    />
                    <FontAwesomeIcon className="text-[#636d77]" icon={faPhone} />
                </div>
                <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                    <textarea name="" id="" placeholder="Nội dung" className="h-[120px] overflow-auto w-full outline-none"></textarea>
                </div>
                <div className="flex justify-center items-center">
                    <button className="font-[700] bg-main text-[16px] text-white hover:text-main w-[30%] py-[12px] rounded-[15px] my-[12px] hover:bg-white border border-main ">
                        Gửi
                    </button>
                </div>
            </form>
        </>
    )
}

export default ContactForm;