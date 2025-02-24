import { useState } from "react";
import TinyMceToHtml from "../decodeHTMLEntities/decodeHTMLEntities";
import { FaCirclePlus } from "react-icons/fa6";
import { AiFillMinusCircle } from "react-icons/ai";

const Description = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div class="relative tab-group px-[10px]">
                <div
                    class="flex justify-between bg-stone-100 p-0.5 relative rounded-lg"
                    role="tablist">
                    <div class="absolute h-[50px] bg-white rounded-md shadow-sm transition-all duration-300 transform scale-x-0 translate-x-0 tab-indicator z-0"></div>
                    <a
                        href="asd"
                        class="tab-link active block text-[20px] transition-all duration-300 relative z-1 w-[49%] text-center leading-[50px] text-[#000000] font-[700] uppercase hover:text-main"
                        data-dui-tab-target="tab1-group"
                    >
                        Chi tiết sản phẩm
                    </a>
                    <a
                        href="sads"
                        class="tab-link active block text-[20px] transition-all duration-300 relative z-1 w-[49%] text-center leading-[50px] text-[#000000] font-[700] uppercase hover:text-main"
                        data-dui-tab-target="tab2-group"
                    >
                        Thông số kỹ thuật
                    </a>
                </div>
                <div class="mt-4 tab-content-container px-[20px]">
                    <div
                        id="tab1-group"
                        class="tab-content text-[#000000] text-[16px] block font-[400]"
                    >
                        <div
                            className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${isExpanded ? "min-h-[800px]" : "max-h-[300px]"
                                }`}
                        >
                            <TinyMceToHtml content={description} />
                        </div>
                        <span
                            className="font-[500] text-[#000000] cursor-pointer mt-[12px] block text-[18px] py-[8px] bg-[#EEEEEE] rounded-[4px] text-center flex items-center justify-center gap-[10px]"
                            onClick={toggleDescription}
                        >
                            {isExpanded ? (<><AiFillMinusCircle /> Ẩn bớt</>) : (<><FaCirclePlus /> Xem thêm</>)}
                        </span>
                    </div>
                    <div
                        id="tab2-group"
                        class="tab-content text-[#000000] text-[16px] block font-[400] hidden ">
                        <table className=" w-full rounded-[8px]">
                            <tbody>
                                <tr >
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%] uppercase">
                                        Thương hiệu
                                    </td>
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%]">
                                        Lining
                                    </td>
                                </tr>
                                <tr >
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%] uppercase">
                                    Trọng lượng
                                    </td>
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%]">
                                        4U
                                    </td>
                                </tr>
                                <tr >
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%] uppercase">
                                    Độ cứng
                                    </td>
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%]">
                                        Trọng lượng
                                    </td>
                                </tr>
                                <tr >
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%] uppercase">
                                    Sản xuất
                                    </td>
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%]">
                                        Trọng lượng
                                    </td>
                                </tr>
                                <tr >
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%] uppercase">
                                    Màu sắc
                                    </td>
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%]">
                                        Trọng lượng
                                    </td>
                                </tr>
                                <tr >
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%] uppercase">
                                    Sức căng
                                    </td>
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%]">
                                        Trọng lượng
                                    </td>
                                </tr>
                                <tr >
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%] uppercase">
                                    Vật liệu trục
                                    </td>
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%]">
                                        Trọng lượng
                                    </td>
                                </tr>
                                <tr >
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%] uppercase">
                                    Vật liệu khung
                                    </td>
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%]">
                                        Trọng lượng
                                    </td>
                                </tr>
                                <tr >
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%] uppercase">
                                    Điểm cân bằng
                                    </td>
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%]">
                                        Trọng lượng
                                    </td>
                                </tr>
                                <tr >
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%] uppercase">
                                    Chiều dài tổng thể
                                    </td>
                                    <td className="border py-[15px] text-[18px] font-[500] text-[#000000] px-[15px] w-[50%]">
                                        Trọng lượng
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Description;