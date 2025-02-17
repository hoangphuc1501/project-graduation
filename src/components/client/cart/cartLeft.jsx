import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus, faSquarePlus} from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const CartLeft = () => {
    const [quantity, setQuantity] = useState(1);

    const increase = () => setQuantity(quantity + 1);
    const decrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };



    return (
        <>
            <table className="my-[30px] w-full shadow-[0_0px_10px_rgba(221,221,221)] rounded-[10px] overflow-hidden">
                <thead className="border-b">
                    <tr className="text-center">
                        <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#000000] w-[50px]">STT</th>
                        <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#000000] w-[350px]">sản phẩm</th>
                        <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#000000]">Số lượng</th>
                        <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#000000]">Đơn giá</th>
                        <th className="py-[10px] px-[10px] font-[500] text-[16px] text-[#000000]">Tạm tính</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center border-b py-[10px]">
                        <td className="py-[15px] text-[16px] font-[500] text-[#000000] w-[50px]">1</td>
                        <td className="flex gap-[10px] w-[350px] items-center py-[15px]">
                            <div className="w-[60px] h-[60px]">
                                <img src="https://cdn.bapperfume.com/thumbs/jo-malone-english-pear-freesia-1_thumb_350.jpg" alt="" className="w-full h-[full" />
                            </div>
                            <div className="flex flex-col justify-between text-start flex-1">
                                <div className=" flex flex-col justify-between">
                                    <Link className="text-[16px] text-[#000000] font-[400] mb-[4px] hover:text-main line-clamp-1">
                                        Giày cầu lông Yonex Dominant - Xanh dương - Có bảo hành
                                    </Link>
                                    <span className="text-[14px] text-[#000000] font-[400] mb-[4px]">size: 4u</span>
                                </div>
                                <div>
                                    <button className=" text-[16px] font-[400] text-[#000000] hover:text-main underline underline-offset-[3px]">Xóa</button>
                                </div>
                            </div>
                        </td>
                        <td className="py-[15px]">
                            <div className="inline-flex items-center gap-[6px] custom-number-input border !border-main rounded-[10px] py-[4px] px-[10px] h-[40px]" >
                                <button
                                    className="text-main"
                                    onClick={decrease}>
                                    <FontAwesomeIcon icon={faSquareMinus} style={{ fontSize: "17px" }} />
                                </button>
                                <input
                                    type="number"
                                    className="w-[50px] text-center text-main font-[500]"
                                    min="1"
                                    max="100"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />
                                <button
                                    className="text-main"
                                    onClick={increase}>
                                    <FontAwesomeIcon icon={faSquarePlus} style={{ fontSize: "17px" }} />
                                </button>
                            </div>
                        </td>
                        <td className="py-[15px] text-[16px] font-[500] text-[#000000]">2.000.000 <sup>đ</sup></td>
                        <td className="py-[15px] text-[16px] font-[500] text-[#000000]">2.000.000 <sup>đ</sup></td>
                    </tr>
                    <tr className="text-center border-b py-[10px]">
                        <td className="py-[15px] text-[16px] font-[500] text-[#000000] w-[50px]">1</td>
                        <td className="flex gap-[10px] w-[350px] items-center py-[15px]">
                            <div className="w-[60px] h-[60px]">
                                <img src="https://cdn.bapperfume.com/thumbs/jo-malone-english-pear-freesia-1_thumb_350.jpg" alt="" className="w-full h-[full" />
                            </div>
                            <div className="flex flex-col justify-between text-start flex-1">
                                <div className=" flex flex-col justify-between">
                                    <Link className="text-[16px] text-[#000000] font-[400] mb-[4px] hover:text-main line-clamp-1">
                                        Giày cầu lông Yonex Dominant - Xanh dương - Có bảo hành
                                    </Link>
                                    <span className="text-[14px] text-[#000000] font-[400] mb-[4px]">size: 4u</span>
                                </div>
                                <div>
                                    <button className=" text-[16px] font-[400] text-[#000000] hover:text-main underline underline-offset-[3px]">Xóa</button>
                                </div>
                            </div>
                        </td>
                        <td className="py-[15px]">
                            <div className="inline-flex items-center gap-[6px] custom-number-input border !border-main rounded-[10px] py-[4px] px-[10px] h-[40px]" >
                                <button
                                    className="text-main"
                                    onClick={decrease}>
                                    <FontAwesomeIcon icon={faSquareMinus} style={{ fontSize: "17px" }} />
                                </button>
                                <input
                                    type="number"
                                    className="w-[50px] text-center text-main font-[500]"
                                    min="1"
                                    max="100"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />
                                <button
                                    className="text-main"
                                    onClick={increase}>
                                    <FontAwesomeIcon icon={faSquarePlus} style={{ fontSize: "17px" }} />
                                </button>
                            </div>
                        </td>
                        <td className="py-[15px] text-[16px] font-[500] text-[#000000]">2.000.000 <sup>đ</sup></td>
                        <td className="py-[15px] text-[16px] font-[500] text-[#000000]">2.000.000 <sup>đ</sup></td>
                    </tr>
                </tbody>
            </table>
            <div className="flex items-center justify-between">
                <Link to="/" className="text-[16px] font-[500] text-main flex items-center gap-[12px] border !border-main py-[8px] px-[30px] rounded-[8px] hover:text-[#ffffff] hover:bg-main"><span><FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: "17px" }} /></span> Tiếp tục mua hàng</Link>
                <button className="text-[16px] font-[500] text-[#000000] underline hover:text-main underline-offset-[3px]">Xóa tất cả</button>
            </div>
        </>
    )
}

export default CartLeft;