

const ProductOptions = () => {
    return (
        <>
            <div className="pt-[20px]">
                <div className="pb-[20px]">
                    <h3 className="text-[16px] font-[700] text-[#333E44] pb-[12px]">
                        Chọn [Phiên bản]:{" "}
                    </h3>
                    <div className="flex items-center gap-[20px]">
                        <button className="flex flex-col gap-y-[8px] justify-center items-center p-[10px] border !border-[#e95211] rounded-[4px] bg-[#fffbf5] shadow-[0_2px_3px_0_rgba(0,0,0,0.15)]">
                            <div className="flex items-center gap-[8px]">
                                <input type="radio" id="noWarranty" name="version" />
                                <label
                                    className="text-[14px] text-[#333333] font-[700]"
                                    htmlFor="noWarranty"
                                >
                                    Không bảo hành (CH)
                                </label>
                            </div>
                            <span className="text-[14px] font-[700] text-[#d0021b]">
                                13.491.000 <sup>đ</sup>
                            </span>
                        </button>
                        <button className="flex flex-col gap-y-[8px] justify-center items-center p-[10px] border  rounded-[4px] ">
                            <div className="flex items-center gap-[8px]">
                                <input type="radio" id="Warranty" name="version" />
                                <label
                                    className="text-[14px] text-[#333333] font-[400]"
                                    htmlFor="Warranty"
                                >
                                    Có bảo hành
                                </label>
                            </div>
                            <span className="text-[14px] font-[700] text-[#d0021b]">
                                13.491.000 <sup>đ</sup>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="pb-[20px]">
                    <h3 className="text-[16px] font-[700] text-[#333E44] pb-[12px]">
                        Chọn [Màu sắc]:{" "}
                    </h3>
                    <div className="flex items-center gap-[20px]">
                        <button className="flex items-center gap-[2px] p-[10px] border !border-[#e95211] rounded-[4px] bg-[#fffbf5] shadow-[0_2px_3px_0_rgba(0,0,0,0.15)]">
                            <img
                                src="https://cdn.shopvnb.com/img/50x50/uploads/gallery/vot-cau-long-lining-halbertec-motor-do-chinh-hang_1727142310.jpg"
                                alt=""
                                className="w-[50px] h-[50px] object-cover"
                            />
                            <div className="flex flex-col gap-y-[8px] justify-center items-center">
                                <div className="flex items-center gap-[8px]">
                                    <input type="radio" id="color1" name="color" />
                                    <label
                                        className="text-[14px] text-[#333333] font-[700]"
                                        htmlFor="color1"
                                    >
                                        Đỏ
                                    </label>
                                </div>
                                <span className="text-[14px] font-[700] text-[#d0021b]">
                                    13.491.000 <sup>đ</sup>
                                </span>
                            </div>
                        </button>
                        <button className="flex items-center gap-[2px] p-[10px] border rounded-[4px]">
                            <img
                                src="https://cdn.shopvnb.com/img/50x50/uploads/gallery/vot-cau-long-lining-halbertec-motor-do-chinh-hang_1727142310.jpg"
                                alt=""
                                className="w-[50px] h-[50px] object-cover"
                            />
                            <div className="flex flex-col gap-y-[8px] justify-center items-center">
                                <div className="flex items-center gap-[8px]">
                                    <input type="radio" id="color2" name="color" />
                                    <label
                                        className="text-[14px] text-[#333333] font-[400]"
                                        htmlFor="color2"
                                    >
                                        Đen
                                    </label>
                                </div>
                                <span className="text-[14px] font-[700] text-[#d0021b]">
                                    13.491.000 <sup>đ</sup>
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="pb-[20px]">
                    <h3 className="text-[16px] font-[700] text-[#333E44] pb-[12px]">
                        Chọn [Size]:{" "}
                    </h3>
                    <div className="flex items-center gap-[10px]">
                        <button className="">
                            <div className="flex items-center gap-[8px] border px-[12px] py-[8px] rounded-[8px] !border-[#e95211] bg-[#fffbf5] shadow-[0_2px_3px_0_rgba(0,0,0,0.15)]">
                                <input type="radio" id="size1" name="size" />
                                <label
                                    className="text-[14px] text-[#333333] font-[700]"
                                    htmlFor="size1"
                                >
                                    3U
                                </label>
                            </div>
                        </button>
                        <button className="">
                            <div className="flex items-center gap-[8px] border px-[12px] py-[8px] rounded-[8px] ">
                                <input type="radio" id="size2" name="size" />
                                <label
                                    className="text-[14px] text-[#333333] font-[400]"
                                    htmlFor="size2"
                                >
                                    4U
                                </label>
                            </div>
                        </button>
                        <button className="">
                            <div className="flex items-center gap-[8px] border px-[12px] py-[8px] rounded-[8px]">
                                <input type="radio" id="size3" name="size" />
                                <label
                                    className="text-[14px] text-[#333333] font-[400]"
                                    htmlFor="size3"
                                >
                                    5U
                                </label>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductOptions;