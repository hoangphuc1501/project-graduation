const ProductInfo = ({ product }) => {
    return (
        <>
            <div className="pb-[20px] border-b border-[#ddd]">
                <h2 className="text-[26px] font-[700] text-[#333E44] pb-[12px]">
                    {product?.title}
                </h2>
                <div className="flex items-center gap-x-[20px] pb-[20px]">
                    <div className="flex items-center gap-[4px]">
                        <span className="text-[16px] font-[500] text-[#212529]">
                            Mã:
                        </span>
                        <span className="text-[14px] font-[500] text-main">
                            {product?.codeProduct}
                        </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                        <span className="text-[16px] font-[500] text-[#212529]">
                            Thương hiệu:
                        </span>
                        <span className="text-[14px] font-[500] text-main">
                            {product?.brands?.name ?? "Không xác định"}
                        </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                        <span className="text-[16px] font-[500] text-[#212529]">
                            Tình trạng:
                        </span>
                        <span className="text-[14px] font-[500] text-main">
                            Còn hàng
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-[30px]">
                    <span className="text-[#e8002d] text-[22px] font-[700]">
                        {product?.variants[0]?.specialPrice?.toLocaleString()} <sup>đ</sup>
                    </span>
                    <span className="text-[16px] font-[400] text-[#acacac]">
                        Giá niêm yết:
                        <strike className="ml-[4px]">
                            {product?.variants[0]?.price?.toLocaleString()} <sup>đ</sup>
                        </strike>
                    </span>
                    <span className="text-[14px] font-[400] text-[#e8002d]">
                        (-{product?.variants[0]?.discount}%)
                    </span>
                </div>
            </div>
        </>
    )
}

export default ProductInfo;