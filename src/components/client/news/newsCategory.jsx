import { Link } from "react-router-dom";

const NewsCategory = () => {
    return (
        <div className="bg-[#031230] p-[20px] rounded-[20px]">
            <h2 className="font-[700] text-[26px] text-[#ffffff] pb-[30px] border-b-[1px] border-[#ffffff]">
                Danh mục
            </h2>
            <div className="pt-[30px]">
                <ul>
                    <li className="pb-[8px]">
                        <Link 
                        to="*"
                        className="font-[400] text-[16px] text-[#ffffff] pb-[6px] hover:text-main mb-[8px] z-[1]"
                        >
                            Sân cầu lông
                        </Link>
                    </li>
                    <li className="pb-[8px]">
                        <Link 
                        to="*"
                        className="font-[400] text-[16px] text-[#ffffff] pb-[6px] hover:text-[#F66315] mb-[8px]"
                        >
                            Sân cầu lông
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NewsCategory;