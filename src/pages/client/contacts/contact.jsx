import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhoneVolume,  faLocationDot } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "../../../components/client/contact/contactForm";


const Contact = () => {
    return (
        <div className="py-[100px] h-[1500px]">
            <h2 className="text-[60px] font-[700] text-center uppercase pb-[60px]">Liên hệ</h2>
            <div className="">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d823.0376954723682!2d106.50689133157773!3d11.109716184395857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b331ee9568403%3A0xd4228a0fdba74425!2zVGnhu4dtIFThuqFwIEjDs2EgVGjDuXkgRMawxqFuZw!5e0!3m2!1svi!2s!4v1730371093107!5m2!1svi!2s"
                    width="100%"
                    height="650"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className="container mx-auto px-[16px]">
                <div className="w-full relative">
                <div className="flex rounded-[20px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.1)] w-full absolute top-[-130px]">
                    <div className="w-[30%] bg-[#f66315] relative flex justify-center items-center">
                        <div className="flex flex-col gap-[30px] justify-start items-start">
                            <div className="flex justify-start items-center gap-[20px]">
                                <div className="text-[20px] text-white font-[500] border-r-[1px]  border-[#DDDDDD] py-[6px] pr-[20px]">
                                    <FontAwesomeIcon className="text-white" icon={faPhoneVolume} />
                                </div>
                                <div className="flex flex-col  justify-start items-start ">
                                    <p className="text-[16px] text-white font-[700] pb-[4px]">
                                        Tư vấn và CSKH
                                    </p>
                                    <p className="text-[16px] text-white font-[700]">
                                        033.357.3303
                                    </p>
                                </div>
                            </div>
                            <div className="flex  justify-start items-center gap-[20px]">
                                <div className="text-[20px] text-white font-[500] border-r-[1px]  border-[#DDDDDD] py-[6px] pr-[20px]">
                                    <FontAwesomeIcon className="text-white" icon={faPhoneVolume} />
                                </div>
                                <div className="flex flex-col  justify-start items-start ">
                                    <p className="text-[16px] text-white font-[700] pb-[4px]">
                                        Hàn vợt carbon
                                    </p>
                                    <p className="text-[16px] text-white font-[700]">
                                        033.357.3303
                                    </p>
                                </div>
                            </div>
                            <div className="flex  justify-start items-center gap-[20px]">
                                <div className="text-[20px] text-white font-[500] border-r-[1px]  border-[#DDDDDD] py-[6px] pr-[20px]">
                                    <FontAwesomeIcon className="text-white" icon={faEnvelope} />
                                </div>
                                <div className="flex flex-col items-start justify-start ">
                                    <p className="text-[16px] text-white font-[700] pb-[4px]">
                                        Email liên hệ
                                    </p>
                                    <p className="text-[16px] text-white font-[700]">
                                        phamphuc1501@gmail.com
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-[20px]">
                                <div className="text-[20px] text-white font-[500] border-r-[1px]  border-[#DDDDDD] py-[6px] pr-[20px]">
                                    <FontAwesomeIcon className="text-white" icon={faLocationDot} />
                                </div>
                                <div className="flex flex-col items-start justify-start ">
                                    <p className="text-[16px] text-white font-[700] pb-[4px]">
                                        Xem hệ thông cửa hàng
                                    </p>
                                    <p className="text-[16px] text-white font-[700]">
                                        Tại Hà Nội và Tp.Hồ Chí Minh
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-[70%] px-[30px] py-[20px] bg-white">
                        <h3 className="font-[700] text-[24px] text-black pb-[24px] pt-[10px]">Gửi tin nhắn cho SmashPro</h3>
                            <ContactForm/>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};
export default Contact;
