import NewsCategory from "./newsCategory";
import NewsItem from "./newsItem";

const ListNews = () => {
    return (
        <div className="pb-[60px]"> 
            <div className="container px-[16px] mx-auto">
                <div className="flex justify-between">
                    <div className="w-[74%]">
                        <div className="flex justify-between items-center pb-[20px]">
                            <h2 className="font-[700] text-[40px] text-[#000000]">Tất cả tin tức</h2>
                            <div className="flex justify-center items-center gap-x-[20px]">
                                <span className="text-[16px] font-[500] text-[#444545]">
                                    Sắp xếp theo:
                                </span>
                                <select
                                    name=""
                                    id=""
                                    className="border px-[8px] py-[10px] text-[16px] outline-none rounded-[8px] w-[180px] text-black cursor-pointer "
                                >
                                    <option value="">Mới nhất</option>
                                    <option value="">Cũ nhất</option>
                                    <option value="">A - Z</option>
                                    <option value="">Z - A</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-[20px]">
                            <NewsItem/>
                            <NewsItem/>
                            <NewsItem/>
                            <NewsItem/>
                            <NewsItem/>
                            <NewsItem/>
                            <NewsItem/>
                            <NewsItem/>
                        </div>
                    </div>
                    <div className="w-[24%]">
                        <NewsCategory/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListNews;