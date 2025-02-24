import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListBrands } from "../../../services/client/productApiService";

const BrandList = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
                const response = await ListBrands();
                setBrands(response.brands);
        };
        fetchBrands();
    }, []);

    return (
        <>
            <ul className="absolute left-[-15px] z-[10] bg-[#ffffff] w-[150px] text-center hidden  group-hover:block">
            {brands.map((brand) => (
                <li key={brand.id} >
                    <Link to="*" className="text-[##666] text-[16px] font-[400] hover:text-[#ffffff] block py-[10px] capitalize hover:bg-main py-[10px]">
                        {brand.name}
                    </Link>
                </li>
            ))}
            </ul>
        </>
    );
};

export default BrandList;
