import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryList } from "../../../services/client/productApiService";

const CategoryList = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await categoryList()
            setCategories(response.categories);
        };

        fetchCategories();
    }, []);
    return (
        <div className="absolute top-[53px] left-[0] w-full z-[10] bg-[#ffffff] hidden group-hover:block h-[500px] overflow-auto px-[30px] py-[20px]">
            <div className="grid grid-cols-5 gap-[40px]">
                {categories.map((category) => (
                    <ul key={category.id}>
                        <h3 className="font-[700] text-main text-[16px] mb-[10px] pb-[10px] border-b border-[#DDDDDD] uppercase">
                            {category.name}
                        </h3>
                        {category.subCategories?.map((subCategory) => (
                            <li key={subCategory.id}>
                                <Link
                                    to={`*`} 
                                    className="text-[##666] text-[16px] font-[400] hover:text-main block py-[10px] capitalize hover:text-main py-[10px]"
                                >
                                    {subCategory.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
};
export default CategoryList;
