import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-regular-svg-icons";


const CartModalItem = () => {
    const [quantity, setQuantity] = useState(1);

    const increase = () => setQuantity(quantity + 1);
    const decrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <>
            <div className="py-[20px] border-b px-[10px]">
                <div className="flex justify-between">
                    <div className="w-[30%] h-[105px] rounded-[12px] overflow-hidden">
                        <img src="https://static.fbshop.vn/wp-content/uploads/2024/05/Tag-2-1.jpg" alt="" className="w-full h-full"/>
                    </div>
                    <div className="w-[67%]">
                        <Link to="*" className="text-[16px] text-[#000000] font-[700] mb-[18px] leading-[1.4] line-clamp-2 hover:text-main">
                        Vợt Cầu Lông Lining Halbertec Motor | Phiên bản đặc biệt
                        </Link>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[6px] custom-number-input border !border-main rounded-[10px] py-[4px] px-[10px] h-[40px]" >
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
                            <div className="text-[18px] text-main font-[600]">
                                10.000.000 <sup>đ</sup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export  {CartModalItem} ;