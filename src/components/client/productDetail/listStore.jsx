import { Link } from "react-router-dom";

const ListStore = () => {
    const storeList = [
        { name: "SMP PREMIUM Quận Bình Thạnh" },
        { name: "SMP PREMIUM Quận 11" },
        { name: "SMP PREMIUM Quận 7" },
        { name: "SMP PREMIUM TP Thủ Đức" },
        { name: "SMP PREMIUM Quận Tân Phú" },
        { name: "SMP PREMIUM Quận 1" },
        { name: "SMP PREMIUM Quận 3" },
        { name: "SMP Quận 4" },
        { name: "SMP Quận 10" },
        { name: "SMP Quận 9" },
        { name: "SMP Quận 8" },
        { name: "SMP Quận 6" },
        { name: "SMP Quận 5" },
        { name: "SMP Quận 12" },
        { name: "SMP Quận 2" },
        { name: "SMP Quận Gò Vấp" },
        { name: "SMP Quận Tân Bình" },
        { name: "SMP Quận Bình Tân" },
        { name: "SMP Huyện Bình Chánh" },
        { name: "SMP Huyện Củ Chi" },
        { name: "SMP Huyện Hốc Môn" },
    ];

    return (
        <div className="relative border !border-dashed !border-main py-[30px] px-[10px]">
            <h2 className="absolute top-[-21px] left-[12px] text-[16px] text-main font-[700] py-[8px] px-[10px] border !border-main uppercase bg-[#ffffff] rounded-[8px]">đang có hàng tại</h2>
            <div className="bg-[#ED754D] w-full">
                <h3 className="font-[700] text-16px text-[#ffffff] py-[15px] px-[10px] bg-[#E95221] uppercase text-center" >Tất cả tỉnh thành</h3>
                <ul className="px-[15px]">
                    {storeList.map((store, index) => (
                        <li key={index} className="border-b last:border-b-0">
                            <Link className="flex items-center text-[16px] font-[500] text-[#ffffff] py-[10px]  hover:text-[#ffffff] ">
                                {store.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListStore;