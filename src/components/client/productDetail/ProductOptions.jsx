

const ProductOptions = ({ product, selectedColor, setSelectedColor, selectedSize, setSelectedSize,selectedVariant }) => {

    return (
        <>
            <div className="pt-[20px]">
                {/* Chọn màu sắc */}
                <div className="pb-[20px]">
                    <h3 className="text-[16px] font-[700] text-[#333E44] pb-[12px]">
                        Chọn [Màu sắc]
                    </h3>
                    <div className="flex items-center flex-wrap gap-[15px]">
                        {product?.variants?.map((variant, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedColor(variant.color)}
                                className={`py-[10px] px-[20px] border rounded-[12px] flex items-center gap-[8px] ${selectedColor === variant.color ? "!border-[#e95211] bg-[#fffbf5]" : ""
                                    }`}
                            >
                                <img src={variant.images?.[0]} alt={variant.color} className="w-[40px] h-[40px]" />

                                <div className='flex items-center gap-[10px] flex-col'>
                                    <span className="text-[14px] font-[500] text-[#333333]">{variant.color}</span>
                                    <div className="text-[14px] text-[#d0021b] font-[500]">
                                        {variant.specialPrice?.toLocaleString() ?? "0"} <sup>đ</sup>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chọn size */}
                <div className="pb-[20px]">
                    <h3 className="text-[16px] font-[700] text-[#333E44] pb-[12px]">
                        Chọn [Size]
                    </h3>
                    <div className="flex items-center gap-[8px] flex-wrap border-[#000000]">
                        {selectedVariant?.sizes?.map((size, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedSize(size)}
                                className={`border px-[12px] py-[8px] rounded-[6px] text-[14px] text-[#333333] font-[500] ${selectedSize === size ? "!border-[#e95211] bg-[#fffbf5]" : ""
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductOptions;