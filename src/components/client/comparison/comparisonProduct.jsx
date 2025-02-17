import { Link } from "react-router-dom";
import { ButtonFill } from "../buttons/listButton";

const ComparisonProduct = () => {
    return (
        <div className="flex flex-col items-center gap-[10px] px-[15px] py-[10px] overflow-hidden">
            <div className="">
                <button className="text-[14px] text-[#000000] font-[700] uppercase py-[5px] px-[10px] hover:text-main">Xóa</button>
            </div>
            <div className="w-full h-[300px]">
                <img src="https://hvshop.vn/wp-content/uploads/2024/11/yonex-arcsaber-2-clear-300x375.webp" className="w-full h-full" alt="" />
            </div>
            <Link
            to="#"
            className="text-[16px] text-[#000000] font-[700] line-clamp-2 hover:text-main">Vợt Cầu Lông Yonex Arcsaber 2 Clear asfasjaksjbfasbfaksbfaksbfaksbfakjsb</Link>
            <div className="">
                <span>1.450.000₫</span>
                <span>1.450.000₫</span>
            </div>
            <ButtonFill text="Thêm vào giỏ hàng"/>
        </div>
    )
}

export default ComparisonProduct;