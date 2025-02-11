

const ServiceBanner = () => {
    const services = [
        {
            img: "https://golfgroup.com.vn/wp-content/themes/ggc/images/icons/ghht.svg",
            title: "Giao hàng hỏa tốc",
        },
        {
            img: "https://golfgroup.com.vn/wp-content/themes/ggc/images/icons/bdtd.svg",
            title: "Bảo dưỡng trọn đời",
        },
        {
            img: "https://golfgroup.com.vn/wp-content/themes/ggc/images/icons/card.svg",
            title: "Thanh toán linh hoạt",
        },
        {
            img: "https://golfgroup.com.vn/wp-content/themes/ggc/images/icons/1vs1.svg",
            title: "Lỗi 1 đổi 1 tại nhà",
        },
    ];
    return (
        <div className="pt-[60px]">
            <div className="container mx-auto px-[16px] ">
                <div className="grid grid-cols-4 gap-[20px]">
                {services.map((service, index) => (
                    <div key={index} className="flex justify-center items-center gap-[20px] border !border-[#F04C28] px-[20px] py-[15px] rounded-[10px]">
                        <div className="" >
                            <img src={service.img} alt={service.title} />
                        </div>
                        <p className="text-[16px] font-[500] text-black">
                        {service.title}
                        </p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default ServiceBanner;