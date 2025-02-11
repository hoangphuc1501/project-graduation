import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchNews = () => {
    return (
        <div className="pb-[120px]">
            <div className="container px-[16px] mx-auto">
                <div className="flex justify-between items-center gap-[40px]">
                    <h2 className="font-[700] text-[40px] text-[#000000]">Tìm kiếm tin tức</h2>
                    <form action="" className="flex-1 border border-[#000000] flex items-center h-[60px] pl-[16px] rounded-[30px]">
                        <input
                            className="flex-1 py-[8px] text-[16px] font-[500] text-[#000000] bg-transparent"
                            type="text"
                            placeholder="Nhập từ khóa" />
                        <button className="flex items-center gap-[8px] text-[18px] text-[#ffffff] font-[700] bg-main h-[57.5px] rounded-[30px] px-[20px] mr-[1px]">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            Tìm kiếm
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchNews;