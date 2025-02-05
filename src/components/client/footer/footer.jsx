import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope } from "@fortawesome/free-solid-svg-icons"

const Footer = () => {
    return (
        <>
            <div className="relative z-[1] pt-[60px]">
                <div className="container mx-auto px-[16px]">
                    <div className="w-[80%] mx-auto">
                        <div className="bg-main rounded-[20px] md:py-[36px] py-[32px]  md:px-[64px] px-[24px] flex items-center justify-between flex-wrap gap-[20px]">
                            <h2 className="xl:w-[551px] lg:w-[450px] w-[100%] font-[700] xl:text-[32px] text-[32px] text-white uppercase">CẬP NHẬT VỀ ƯU ĐÃI MỚI NHẤT CỦA CHÚNG TÔI</h2>
                            <form action="" className="lg:w-[349px] w-[100%]">
                                <div className="bg-white rounded-[62px] sm:h-[48px] h-[42px] px-[16px] flex gap-[12px] items-center">
                                    <FontAwesomeIcon icon={faEnvelope} className="sm:text-[20px] text-[16px] text-[#00000066]" />
                                    <input 
                                        type="email"
                                        placeholder="Nhập email của bạn..." 
                                        class="flex-1 sm:text-[16px] text-[14px]" 
                                    />
                                </div>
                                <button className="sm:mt-[14px] mt-[12px] bg-white rounded-[62px] sm:h-[44px] h-[42px]  w-[100%] font-[500] text-black sm:text-[16xp] text-[14xp] capitalize"> Đăng ký nhận tin</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-custom-gradient sm:mt-[-96px] mt-[-162px] sm:pt-[146px] pt-[202px] sm:pb-[82px] pb-[30px]">
                <div className="absolute right-[0] top-[-230px]">
                    <img src="https://static.fbshop.vn/template/assets/images/dcor-ft.webp" alt="" />
                </div>
                <div className="container m-auto px-[16px]">
                    <div className="flex flex-wrap justify-between gap-y-[32px] gap-x-[10px]">
                        <div className="lg:w-[248px] w-full">
                            <div className="lg:mb-[25px] mb-[15px] font-[700] sm:text-[33px] text-[28px] text-main">
                                SmashPro
                            </div>
                            <p className="font-[400] text-[14px] text-[#00000099] lg:mb-[35px] mb-[15px]">Chúng tôi có những bộ quần áo phù hợp với phong cách của bạn và bạn có thể tự hào khi mặc.</p>
                            <div className="flex flex-wrap gap-[12px]">
                                <button className="w-[38px] h-[38px] bg-white hover:bg-main border border-[#00000033] hover:border-main rounded-full inline-flex items-center justify-center text-[20px] text-black hover:text-white">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </button>
                                <button className="w-[38px] h-[38px] bg-white hover:bg-main border border-[#00000033] hover:border-main rounded-full inline-flex items-center justify-center text-[20px] text-black hover:text-white">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </button>
                                <button className="w-[38px] h-[38px] bg-white hover:bg-main border border-[#00000033] hover:border-main rounded-full inline-flex items-center justify-center text-[20px] text-black hover:text-white">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </button>
                            </div>
                        </div>
                        <div className="sm:w-auto w-[48%]">
                            <h2 className="mb-[26px] font-[500] text-[16px] text-black uppercase">Trợ giúp</h2>
                                <ul className="flex flex-col gap-[16px]">
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                </ul>
                        </div>
                        <div className="sm:w-auto w-[48%]">
                                <h2 className="mb-[26px] font-[500] text-[16px] text-black uppercase">Trợ giúp</h2>
                                <ul className="flex flex-col gap-[16px]">
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                </ul>
                        </div>
                        <div className="sm:w-auto w-[48%]">
                                <h2 className="mb-[26px] font-[500] text-[16px] text-black uppercase">Trợ giúp</h2>
                                <ul className="flex flex-col gap-[16px]">
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                </ul>
                        </div>
                        <div className="sm:w-auto w-[48%]">
                            <h2 className="mb-[26px] font-[500] text-[16px] text-black uppercase">Trợ giúp</h2>
                                <ul className="flex flex-col gap-[16px]">
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                    <li>
                                        <button className="font-[400] text-[16px] text-[#00000099] hover:text-main">
                                        Giới Thiệu   
                                        </button>
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <div className="sm:mt-[48px] mt-[38px] border-t border-[#0000001A] pt-[20px] flex items-center md:justify-between justify-center flex-wrap md:gap-[20px] gap-[10px]">
                        <p className="font-[400] text-[14px] text-[#00000099]">SmashPro © 2025, All Rights Reserved</p>
                        <div className="flex flex-wrap items-center gap-[12px]">
                            <img src="" alt="" className="md:w-[47px] w-[40px] md:h-[30px] h-[26px] bg-white rounded-[5px] border border-[#D6DCE5] p-[7px] object-contain" />
                            <img src="" alt="" className="md:w-[47px] w-[40px] md:h-[30px] h-[26px] bg-white rounded-[5px] border border-[#D6DCE5] p-[7px] object-contain" />
                            <img src="" alt="" className="md:w-[47px] w-[40px] md:h-[30px] h-[26px] bg-white rounded-[5px] border border-[#D6DCE5] p-[7px] object-contain" />
                            <img src="" alt="" className="md:w-[47px] w-[40px] md:h-[30px] h-[26px] bg-white rounded-[5px] border border-[#D6DCE5] p-[7px] object-contain" />
                            <img src="" alt="" className="md:w-[47px] w-[40px] md:h-[30px] h-[26px] bg-white rounded-[5px] border border-[#D6DCE5] p-[7px] object-contain" />
                        </div>
                    </div>
                </div>
            </footer>
        </>
        
    ) 
}

export default Footer;