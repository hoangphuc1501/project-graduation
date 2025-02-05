const ServiceBanner = () => {
    return (
        <div className="py-[60px]]">
            <div className="container mx-auto px-[16px] ">
                <div className="grid grid-cols-4 gap-[20px]">
                    <div className="flex justify-center items-center gap-[20px] border !border-[#F04C28] px-[20px] py-[15px] rounded-[10px]">
                        <div className="">
                            <img src="https://golfgroup.com.vn/wp-content/themes/ggc/images/icons/ghht.svg" alt="" />
                        </div>
                        <p className="text-[16px] font-[500] text-black">
                            Giao hàng hỏa tốc
                        </p>
                    </div>
                    <div className="flex justify-center items-center gap-[20px] border !border-[#F04C28] px-[20px] py-[15px] rounded-[10px]">
                        <div className="">
                            <img src="https://golfgroup.com.vn/wp-content/themes/ggc/images/icons/bdtd.svg" alt="" />
                        </div>
                        <p className="text-[16px] font-[500] text-black">
                            Bảo dưỡng trọn đời
                        </p>
                    </div>
                    <div className="flex justify-center items-center gap-[20px] border !border-[#F04C28] px-[20px] py-[15px] rounded-[10px]">
                        <div className="">
                            <img src="https://golfgroup.com.vn/wp-content/themes/ggc/images/icons/card.svg" alt="" />
                        </div>
                        <p className="text-[16px] font-[500] text-black">
                        Thanh toán linh hoạt
                        </p>
                    </div>
                    <div className="flex justify-center items-center gap-[20px] border !border-[#F04C28] px-[20px] py-[15px] rounded-[10px]">
                        <div className="">
                            <img src="https://golfgroup.com.vn/wp-content/themes/ggc/images/icons/1vs1.svg" alt="" />
                        </div>
                        <p className="text-[16px] font-[500] text-black">
                        Lỗi 1 đổi 1 tại nhà
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceBanner;