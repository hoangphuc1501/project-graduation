import { useState } from "react";

const FilterProduct = ({ selectedPrices = [], onFilterChange }) => {

    // const [selectedPrices, setSelectedPrices] = useState([]);

    // mãng giá
    const priceOptions = [
        { label: "Giá dưới 500.000", value: "under_500k", min: 0, max: 500000 },
        { label: "500.000 - 1 triệu", value: "500k_1m", min: 500000, max: 1000000 },
        { label: "1 - 2 triệu", value: "1m_2m", min: 1000000, max: 2000000 },
        { label: "2 - 3 triệu", value: "2m_3m", min: 2000000, max: 3000000 },
        { label: "Giá trên 3 triệu", value: "above_3m", min: 3000000, max: null },
    ];

    const handlePriceChange = (value) => {
        const updated = selectedPrices.includes(value)
            ? selectedPrices.filter((v) => v !== value)
            : [...selectedPrices, value];

        const selectedRanges = priceOptions.filter(p => updated.includes(p.value));
        let min = null;
        let max = null;

        if (selectedRanges.length > 0) {
            min = Math.min(...selectedRanges.map(p => p.min));
            max = Math.max(...selectedRanges.map(p => p.max || Infinity));
            if (max === Infinity) max = null;
        }

        const newFilters = {};
        if (min !== null) newFilters.price_min = min;
        if (max !== null) newFilters.price_max = max;

        onFilterChange && onFilterChange(newFilters, updated);
    };

    // mãng chiều dài vợt
    const length = [
        { label: "665 mm", value: "665" },
        { label: "670 mm", value: "670" },
        { label: "655 mm", value: "675" },
    ];
    // mãng chiều dài vợt
    const racketHandleSize = [
        { label: "200 mm", value: "200" },
        { label: "205 mm", value: "205" },
        { label: "210 mm", value: "210" },
    ];
    const Swingweight = [
        { label: "Dưới 82 kg/cm2", value: "under_82" },
        { label: "82-84 kg/cm2", value: "82_84" },
        { label: "84-86 kg/cm2", value: "84_86" },
        { label: "86-88 kg/cm2", value: "86_88" },
        { label: "Trên 88 kg/cm2", value: "above_88" },
    ];
    const weight = [
        { label: "3U: 85 - 89g", value: "3U" },
        { label: "4U: 80 - 84g", value: "4U" },
        { label: "5U: 75 - 79g", value: "5U" },
    ];
    const balancepoint = [
        { label: "Nhẹ Đầu", value: "Nhẹ Đầu" },
        { label: "Cân Bằng", value: "Cân Bằng" },
        { label: "Hơi Nặng Đầu", value: "Hơi Nặng Đầu" },
        { label: "Nặng Đầu", value: "Nặng Đầu" },
        { label: "Siêu Nặng Đầu", value: "Siêu Nặng Đầu" },
    ];
    const stiffness = [
        { label: "Dẻo", value: "Dẻo" },
        { label: "Trung bình", value: "Trung bình" },
        { label: "Cứng", value: "Cứng" },
        { label: "Siêu cứng", value: "Siêu cứng" },
    ];
    return (
        <>
            <>
                <div className="px-[20px] py-[10px]">
                    <h3 className="font-[700] text-[16px] text-[#282828] uppercase py-[4px]">Chọn Mức giá</h3>
                    <div className="py-[10px] border-b">
                        {priceOptions.map(({ label, value }, index) => (
                            <div key={index} className="flex items-center gap-[10px] pb-[10px]">
                                <input
                                    type="checkbox"
                                    id={`price${index}`}
                                    checked={selectedPrices.includes(value)}
                                    onChange={() => handlePriceChange(value)}
                                />
                                <label
                                    className="text-[14px] font-[400] text-[#282828] hover:text-main cursor-pointer"
                                    htmlFor={`price${index}`}>
                                    {label} <sup>đ</sup>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-[20px] py-[10px]">
                    <h3 className="font-[700] text-[16px] text-[#282828] uppercase py-[4px]">Chiều dài vợt</h3>
                    <div className="py-[10px] border-b">
                        {length.map(({ label, value }, index) => (
                            <div key={index} className="flex items-center gap-[10px] pb-[10px]">
                                <input
                                    type="checkbox"
                                    id={`length${index}`}
                                />
                                <label
                                    className="text-[14px] font-[400] text-[#282828] hover:text-main cursor-pointer"
                                    htmlFor={`length${index}`}>
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-[20px] py-[10px]">
                    <h3 className="font-[700] text-[16px] text-[#282828] uppercase py-[4px]">Chiều dài cán vợt</h3>
                    <div className="py-[10px] border-b">
                        {racketHandleSize.map(({ label, value }, index) => (
                            <div key={index} className="flex items-center gap-[10px] pb-[10px]">
                                <input
                                    type="checkbox"
                                    id={`racketHandleSize${index}`}
                                />
                                <label
                                    className="text-[14px] font-[400] text-[#282828] hover:text-main cursor-pointer"
                                    htmlFor={`racketHandleSize${index}`}>
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-[20px] py-[10px]">
                    <h3 className="font-[700] text-[16px] text-[#282828] uppercase py-[4px]">Swingweight</h3>
                    <div className="py-[10px] border-b">
                        {Swingweight.map(({ label, value }, index) => (
                            <div key={index} className="flex items-center gap-[10px] pb-[10px]">
                                <input
                                    type="checkbox"
                                    id={`Swingweight${index}`}
                                />
                                <label
                                    className="text-[14px] font-[400] text-[#282828] hover:text-main cursor-pointer"
                                    htmlFor={`Swingweight${index}`}>
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-[20px] py-[10px]">
                    <h3 className="font-[700] text-[16px] text-[#282828] uppercase py-[4px]">Trọng Lượng</h3>
                    <div className="py-[10px] border-b">
                        {weight.map(({ label, value }, index) => (
                            <div key={index} className="flex items-center gap-[10px] pb-[10px]">
                                <input
                                    type="checkbox"
                                    id={`weight${index}`}
                                />
                                <label
                                    className="text-[14px] font-[400] text-[#282828] hover:text-main cursor-pointer"
                                    htmlFor={`weight${index}`}>
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-[20px] py-[10px]">
                    <h3 className="font-[700] text-[16px] text-[#282828] uppercase py-[4px]">Điểm Cân Bằng</h3>
                    <div className="py-[10px] border-b">
                        {balancepoint.map(({ label, value }, index) => (
                            <div key={index} className="flex items-center gap-[10px] pb-[10px]">
                                <input
                                    type="checkbox"
                                    id={`balancepoint${index}`}
                                />
                                <label
                                    className="text-[14px] font-[400] text-[#282828] hover:text-main cursor-pointer"
                                    htmlFor={`balancepoint${index}`}>
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-[20px] py-[10px]">
                    <h3 className="font-[700] text-[16px] text-[#282828] uppercase py-[4px]">Độ Cứng Đũa</h3>
                    <div className="py-[10px]">
                        {stiffness.map(({ label, value }, index) => (
                            <div key={index} className="flex items-center gap-[10px] pb-[10px]">
                                <input
                                    type="checkbox"
                                    id={`stiffness${index}`}
                                />
                                <label
                                    className="text-[14px] font-[400] text-[#282828] hover:text-main cursor-pointer"
                                    htmlFor={`stiffness${index}`}>
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        </>
    )
}
export default FilterProduct;