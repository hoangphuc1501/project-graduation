import { Link } from "react-router-dom";
// import { useState } from "react";
import { MdOutlineDiscount } from "react-icons/md";
import { ButtonFill } from "../buttons/listButton";


const CartRight = () => {
    return (
        <>
            <div className="my-[30px] w-full shadow-[0_0px_10px_rgba(221,221,221)] rounded-[10px] overflow-hidden pt-[10px] pb-[30px] px-[15px]">
                <h2 className="text-[#000000] text-[20px] font-[500] pb-[10px] border-b">
                    Tổng cộng
                </h2>
                <form 
                action="" 
                method="post"
                className="border !border-main h-[50px] rounded-[8px] mt-[16px] flex items-center overflow-hidden"
                >
                    <input type="text" 
                    placeholder="Mã giả giá" 
                    className="text-[#000000] font-[500] text-[16px] px-[8px] flex-1" />
                    <button className="font-[500] text-[16px] text-[#ffffff] bg-main h-[50px] rounded-[8px] px-[10px]">Áp dụng</button>
                </form>
                <div className="flex items-center justify-between mt-[16px]  text-[#000000]">
                    <span className="font-[400] text-[16px]">Tạm tính:</span>
                    <span className="font-[700] text-[16px]">2.000.000 <sup>đ</sup></span>
                </div>
                <h3 className="font-[700] text-[16px] text-[#000000] mt-[16px]">Giảm giá đơn hàng</h3>
                <div className="flex items-center justify-between mt-[16px]">
                    <div className="flex items-center gap-[8px] text-[14px] text-[#999999]">
                    <span className=""><MdOutlineDiscount /></span>
                    <span>8def8e (giảm 20.000đ)</span>
                    </div>
                    <span className="font-[400] text-[14px] text-[#000000]">- 20.000 <sup>đ</sup></span>
                </div>
                <div className="flex items-center justify-between mt-[10px]">
                    <div className="flex items-center gap-[8px] text-[14px] text-[#999999]">
                    <span className=""><MdOutlineDiscount /></span>
                    <span>8def8e (giảm 20.000đ)</span>
                    </div>
                    <span className="font-[400] text-[14px] text-[#000000]">- 20.000 <sup>đ</sup></span>
                </div>
                <div className="flex items-center justify-between my-[25px]">
                    <span className="text-[20px] font-[700] text-[#000000]">Tổng tiền:</span>
                    <span className="text-[20px] font-[700] text-[#000000]">2.000.000 <sup>đ</sup></span>
                </div>
                <div>
                    <ButtonFill text="Thanh toán" className="w-full"/>
                </div>
            </div>
        </>
    )
}
export {CartRight}