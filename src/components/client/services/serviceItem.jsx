import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
const ServiceItem = () => {
    return (
        <>
            <div className="w-full rounded-[12px] shadow-[0_0_10px_#ddd] bg-[#000000] overflow-hidden">
                <div className="w-full h-[171px]">
                    <img className="w-full h-full" src="https://cdn.shopvnb.com/img/406x136/uploads/danh_muc/3_2.webp" alt="" />
                </div>
                <div className="px-[10px] py-[20px]">
                    <h3 className="font-[700] text-[16px] text-[#ffffff] pb-[12px] uppercase">
                        Thu cũ đổi mới
                    </h3>
                    <p className="font-[400] text-[14px] text-[#BBBBBB] pb-[12px]">
                        Booking sân tại SmashPro - Tất cả các sân cầu lông trong hệ thống. Đặt sân cầu lông dễ dàng, nhanh chóng, chi phí cực tốt với dịch vụ booking của chúng tôi. Chỉ bằng một cuộc điện thoại chúng tôi sẽ giúp quý khách check thông tin, book sân.
                    </p>
                    <Link className="font-[400] text-[16px] text-main hover:text-main underline underline-offset-[5px] flex items-center gap-[8px]">
                        Xem thêm
                        <FaArrowRightLong  />
                    </Link>
                </div>
            </div>
        </>
    )
}
export default ServiceItem;