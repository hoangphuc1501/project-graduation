
import { CiSquarePlus, CiSquareMinus  } from "react-icons/ci";

const InputNumber = ({ min = 1, max = 100, quantity, onChange }) => {
    // const [quantity, setQuantity] = useState(initialValue);

    const increase = () => {
        if (quantity < max) {
            onChange && onChange(quantity + 1);
        }
    };
    
    const decrease = () => {
        if (quantity > min) {
            onChange && onChange(quantity - 1);
        }
    };

    const handleChange = (e) => {
        let value = Number(e.target.value);
        if (value < min) value = min;
        if (value > max) value = max;
        onChange(value);
    };
    return (
        <>
            <div className="inline-flex items-center gap-[6px] custom-number-input border !border-main rounded-[10px] py-[4px] px-[10px] h-[40px]" >
                <button
                    className="text-main"
                    onClick={decrease}>
                    <CiSquareMinus  />
                </button>
                <input
                    type="number"
                    className="w-[50px] text-center text-main font-[500]"
                    min={min}
                    max={max}
                    value={quantity}
                    onChange={handleChange}
                />
                <button
                    className="text-main"
                    onClick={increase}>
                    <CiSquarePlus />
                </button>
            </div>
        </>
    )
}

export default InputNumber;