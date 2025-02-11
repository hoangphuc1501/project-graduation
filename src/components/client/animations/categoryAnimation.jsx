import { useEffect, useState } from "react";


const CategoryAnimation = () => {
    // const contentRef = useRef(null);

    // useEffect(() => {
    //     if (contentRef.current) {
    //         contentRef.current.innerHTML += contentRef.current.innerHTML;
    //     }
    // }, []);
    const [items, setItems] = useState([
        { id: 1, name: "Vợt cầu lông", img: "https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/1.1.webp" },
        { id: 2, name: "Giày cầu lông", img: "https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/1.1.webp" },
        { id: 3, name: "Áo thể thao", img: "https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/1.1.webp" },
        { id: 4, name: "Túi cầu lông", img: "https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/1.1.webp" },
        { id: 5, name: "Vợt cầu lông", img: "https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/1.1.webp" },
        { id: 6, name: "Giày cầu lông", img: "https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/1.1.webp" },
        { id: 7, name: "Áo thể thao", img: "https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/1.1.webp" },
        { id: 8, name: "Túi cầu lông", img: "https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/1.1.webp" },
    ]);
    useEffect(() => {
        setItems((prevItems) => [...prevItems, ...prevItems]);
    }, []);

    return (
        <div className="py-[60px]">
            <h3 className="text-[24px] text-main font-[700] uppercase text-center pb-[16px]"> Danh mục sản phẩm</h3>
            <div className="line-title"></div>
            <div className="flex items-center relative overflow-hidden ">
                <div className="scrolling-box">
                    {items.map((item, index) => (
                        <div key={index} className="w-[300px] h-[300px] border relative overflow-hidden ">
                            <img src={item.img} alt=""
                                className="w-full h-full object-cover hover:scale-[1.2] transition-all ease-in-out"
                            />
                            <h3 className="absolute top-[130px] left-[60px] bg-main px-[30px] py-[10px] text-[16px] uppercase font-[400] text-[#ffffff] rotate-[-20deg]">
                                {item.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryAnimation;
