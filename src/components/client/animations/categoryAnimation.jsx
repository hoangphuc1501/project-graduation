import { useEffect, useState } from "react";
import { categoryParentApi } from "../../../services/client/productApiService";

const CategoryAnimation = () => {
    const [categoryParent, setcCtegoryParent] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryParentApi();
                if (response.code === "success") {
                    setcCtegoryParent(response.categoryParent);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh mục sản phẩm:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="py-[60px]">
            <h3 className="text-[24px] text-main font-[700] uppercase text-center pb-[16px]"> Danh mục sản phẩm</h3>
            <div className="line-title"></div>
            <div className="flex items-center relative overflow-hidden ">
                <div className="scrolling-box">
                    {[...categoryParent, ...categoryParent].map((items, index) => (
                        <div key={index} className="w-[300px] h-[300px] border rounded-[22px] relative overflow-hidden ">
                            <img src={items.image} alt=""
                                className="w-full h-full object-cover hover:scale-[1.2] transition-all ease-in-out"
                            />
                            <h3 className="absolute top-[130px] left-[60px] bg-main px-[30px] py-[10px] text-[16px] uppercase font-[400] text-[#ffffff] rotate-[-20deg]">
                                {items.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryAnimation;
