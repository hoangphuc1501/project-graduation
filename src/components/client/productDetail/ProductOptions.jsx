

const ProductOptions = ({ product, selectedColor, setSelectedColor, selectedSize, setSelectedSize }) => {
    // Lọc tất cả biến thể có cùng màu sắc được chọn
    const selectedVariants = product?.variants?.filter((v) => v.color === selectedColor) ?? [];

    // Lấy tất cả size từ các biến thể có cùng màu, loại bỏ trùng lặp
    const sizes = [
        ...new Set(
            selectedVariants.flatMap((variant) =>
                Array.isArray(variant.size)
                    ? variant.size
                    : typeof variant.size === "string"
                        ? variant.size.split(",") // Nếu API trả về chuỗi, chuyển thành mảng
                        : []
            )
        )
    ];


    return (
        <>
            <div className="pt-[20px]">
            {/* Chọn màu sắc */}
            <div className="pb-[20px]">
                <h3 className="text-[16px] font-[700] text-[#333E44] pb-[12px]">
                    Chọn [Màu sắc]
                </h3>
                <div className="flex items-center flex-wrap gap-[15px]">
                    {[...new Map((product?.variants ?? []).map(variant => [variant.color, variant])).values()]
                        .map((variant, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedColor(variant.color)}
                                className={`py-[10px] px-[20px] border rounded-[12px] flex items-center gap-[8px] ${selectedColor === variant.color ? "!border-[#e95211] bg-[#fffbf5]" : ""}`}
                            >
                                <img
                                    src={variant.images?.[0]?.image}
                                    alt={variant.color}
                                    className="w-[60px] h-[60px] object-cover"
                                />
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
                    {sizes.map((size, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedSize(size)}
                            className={`border px-[12px] py-[8px] rounded-[6px] text-[14px] text-[#333333] font-[50] ${selectedSize === size ? "!border-[#e95211] bg-[#fffbf5]" : ""}`}
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