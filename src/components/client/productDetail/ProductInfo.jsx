const ProductInfo = () => {
    return (
        <>
            <div className="pb-[20px] border-b border-[#ddd]">
                <h2 className="text-[26px] font-[700] text-[#333E44] pb-[12px]">
                    Vợt Cầu Lông Yonex Astrox 77 Pro Đỏ China Limited
                </h2>
                <div className="flex items-center gap-x-[30px] pb-[20px]">
                    <div className="flex items-center gap-[4px]">
                        <span className="text-[14px] font-[500] text-[#212529]">
                            Mã:
                        </span>
                        <span className="text-[14px] font-[500] text-main">
                            VNB021153
                        </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                        <span className="text-[14px] font-[500] text-[#212529]">
                            Thương hiệu:
                        </span>
                        <span className="text-[14px] font-[500] text-main">
                            Lining
                        </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                        <span className="text-[14px] font-[500] text-[#212529]">
                            Tình trạng:
                        </span>
                        <span className="text-[14px] font-[500] text-main">
                            Còn hàng
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-[30px]">
                    <span className="text-[#e8002d] text-[22px] font-[700]">
                        13.491.000 <sup>đ</sup>
                    </span>
                    <span className="text-[16px] font-[400] text-[#acacac]">
                        Giá niêm yết:
                        <strike className="ml-[4px]">
                            14.990.000 <sup>đ</sup>{" "}
                        </strike>
                    </span>
                    <span className="text-[14px] font-[400] text-[#e8002d]">
                        (-10%)
                    </span>
                </div>
            </div>
        </>
    )
}

export default ProductInfo;