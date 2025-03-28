import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { laravelAPI } from "../../../utils/axiosCustom";

const NewsCategory = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await laravelAPI.get("/api/newsCategory");
            setCategories(response.categories);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục tin tức:", error);
        }
    };

    return (
        <div className="bg-[#031230] p-[20px] rounded-[20px]">
            <h2 className="font-[700] text-[26px] text-[#ffffff] pb-[30px] border-b-[1px] border-[#ffffff]">
                Danh mục
            </h2>
            <div className="pt-[30px]">
                <ul>
                {categories?.length > 0 ? (
                        categories?.map((category) => (
                            <li key={category.id} className="pb-[8px]">
                                <Link 
                                    to={`/news/category/${category.slug}`}
                                    className="font-[400] text-[16px] text-[#ffffff] pb-[6px] hover:text-[#F66315] mb-[8px]"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="text-[#ffffff]">Không có danh mục nào.</p>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default NewsCategory;