import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
const ServiceItem = () => {
    return (
        <>
            <div className="w-full rounded-[12px] shadow-[0_0_10px_#ddd] bg-[#000000] overflow-hidden">
                <div className="w-full h-[171px]">
                    <img className="w-full h-full" src="https://golfgroup.com.vn/wp-content/uploads/2023/06/hinh-anh-dich-vu-golf-tai-golfgroup-4.jpg" alt="" />
                </div>
                <div className="px-[10px] py-[20px]">
                    <h3 className="font-[700] text-[16px] text-[#ffffff] pb-[12px] uppercase">
                        Thu cũ đổi mới
                    </h3>
                    <p className="font-[400] text-[14px] text-[#BBBBBB] pb-[12px]">
                        Booking sân tại GolfGroup - Tất cả các sân golf trên khắp cả nước! Đặt sân golf dễ dàng, nhanh chóng, chi phí cực tốt với dịch vụ booking của chúng tôi. Alogolf chỉ bằng một cuộc điện thoại chúng tôi sẽ giúp quý khách check thông tin, book sân, book caddies tất cả hệ thống sân, khắp các tỉnh thành.
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