import { ComparisonItem } from "../../../components/client/comparison/comparisonItem";

const Comparison = () => {
    return (
        <div className="py-[60px]">
            <div className="container mx-auto px-[16px]">
                <div className="">
                    <h2 className="text-[28px] text-main font-[700] pb-[20px] uppercase text-center">so sánh sản phẩm</h2>
                    <div className="">
                        <ComparisonItem/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comparison;