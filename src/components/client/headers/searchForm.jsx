import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { laravelAPI, nodeAPI } from "../../../utils/axiosCustom";
import { IoSearchOutline } from "react-icons/io5";


const SearchForm = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]); // Danh sách sản phẩm gợi ý
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionsRef = useRef(null); // Dùng ref để theo dõi danh sách gợi ý

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/search?query=${query}`);
    };

    // Gọi API khi nhập từ khóa
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const response = await laravelAPI.get(`/api/searchProducts?query=${query}`);
                console.log(response)
                setSuggestions(response.data.slice(0, 3));
                setShowSuggestions(true);
            } catch (error) {
                console.error("Lỗi khi lấy gợi ý sản phẩm:", error);
                setSuggestions([]);
            }
        };

        const timeout = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    // Xử lý ẩn danh sách gợi ý khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className="relative flex-1 " ref={suggestionsRef}>
                <form
                    onSubmit={handleSearch}
                    className=" flex rounded-[8px] bg-[#f3f3f3] border !border-main bg-transparent overflow-hidden"
                >
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Tìm sản phẩm..."
                        className="flex-1 bg-transparent text-[16px] text-[#000000] font-[400] py-[10px] px-[15px] "
                    />
                    <button className="text-[#ffffff] text-[16px] bg-main px-[15px]">
                        <IoSearchOutline />
                    </button>
                </form>
                {/* Danh sách gợi ý */}
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-50 max-h-[300px] overflow-y-auto">
                        {suggestions.map((product) => (
                            <li
                                key={product.id}
                                onClick={() => navigate(`/productDetail/${product.slug}`)}
                                className="p-3 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                                <img
                                    src={product.image || "/default-image.jpg"}
                                    alt={product.title}
                                    className="w-10 h-10 mr-3 object-cover rounded"
                                />
                                <div>
                                    <p className="text-sm font-semibold">{product.title}</p>
                                    <p className="text-red-500 font-bold text-sm">{product.variant?.price?.toLocaleString()} đ</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default SearchForm;