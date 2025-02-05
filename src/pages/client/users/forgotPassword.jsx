import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook,  faGoogle} from '@fortawesome/free-brands-svg-icons';


const ForgotPassword = () => {
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
                        <form action="">
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input type="email" placeholder="Email" className="flex-1"/>
                                <FontAwesomeIcon className="text-[#636d77]" icon={faEnvelope} />
                            </div>
                            <button className="font-[700] bg-main text-[16px] text-white hover:text-main w-full py-[12px] rounded-[15px] my-[12px] hover:bg-white border border-main">Gửi mã OTP</button>
                            <div className="flex items-center justify-center gap-[5px] mt-[12px]">
                                <p className="font-[300] text-[16px] text-black ">Bạn đã nhớ mật khẩu?</p>
                                <button className="font-[700] text-[17px] text-black underline hover:text-main">Đăng nhập ngay</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ForgotPassword;