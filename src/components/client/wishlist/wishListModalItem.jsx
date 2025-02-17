import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const WishListModalItem = () => {
    return (
        <>
            <div className="py-[20px] border-b">
                <div className="flex justify-between">
                <div className="w-[32%] h-[100px] p-[10px] rounded-[12px] overflow-hidden">
                        <img src="https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v88-xanh-chinh-hang-1.webp" alt="" 
                        className="w-full h-full"
                        />
                    </div>
                    <div className="w-[66%]">
                        <Link className="text-[16px] text-[#000000] font-[700] mb-[12px] leading-[1.4] line-clamp-2 hover:text-main">Vợt cầu lông VNB V88 xanh chính hãng</Link>
                        <div className="flex items-center gap-[10px]">
                            <Link to="" className="text-[14px] text-[#ffffff] font-[500] bg-main py-[8px] px-[16px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main">Xem sản phẩm</Link>
                            <button className=" px-[12px] py-[5px] rounded-[8px] text-[#FF0000] text-[14px] border !border-[#FF0000] hover:bg-[#FF0000] hover:text-[#FFFFFF]"><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishListModalItem;