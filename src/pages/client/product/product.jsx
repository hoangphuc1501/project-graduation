import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductItem from "../../../components/client/products/productItem";
import { laravelAPI } from '../../../utils/axiosCustom';
// import { toast } from "react-toastify";
import AccordionProduct from "../../../components/client/products/accordionCatetegory";
import Breadcrumb from "../../../components/client/breadcrumbs/Breadcrumb";
import FilterProduct from "../../../components/client/products/filterProduct";
import { useParams } from "react-router-dom";
import Loading from "../../../components/client/animations/loading";




const Product = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("Danh mục sản phẩm");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("");
    const [filters, setFilters] = useState({});
    const [priceRanges, setPriceRanges] = useState([]);

    useEffect(() => {
        const fetchProducts = async (page) => {
            setLoading(true)
            try {

                const params = new URLSearchParams({
                    page: currentPage,
                    sort: sort,
                    ...filters
                }).toString();

                const response = await laravelAPI.get(`/api/categories/${slug}?${params}`);
                // console.log("API danh sách sản phẩm theo danh mục:", response);
                // setProducts(response.data || []);
                // setCategoryName(response.message.split("danh mục ")[1].split(" thành công")[0]); 
                if (response.code === "success") {
                    setProducts(response.data || []);
                    setCategoryName(response.message);
                    setPageCount(response.meta.last_page || 0);
                } else {
                    setProducts([]);
                    setCategoryName("Danh mục sản phẩm");
                    setPageCount(0);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
                setCategoryName("Danh mục sản phẩm");
                setPageCount(0);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchProducts();
    }, [slug, currentPage, sort, filters]);


    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSort(selectedSort);
        setCurrentPage(1);
    };


    return (
        <>
            <Breadcrumb />
            <div className="py-[60px]">
                <div className="container mx-auto px-[16px]">
                    {loading ? (
                        <div className="flex justify-center items-center h-[300px]">
                            <Loading />
                        </div>
                    ) : (
                        <div className="flex justify-center gap-[20px]">
                            <div className="w-[calc(25%-20px)]">
                                <div className="border">
                                    <AccordionProduct />
                                </div>
                                <div className="border rounded-[12px] overflow-hidden  mt-[40px]">
                                    {/* <h2 className="text-[20px] font-[500] text-[#333333] pb-[12px] uppercase text-center border py-[10px] rounded-t-[4px]">bộ lọc</h2> */}
                                    {/* <FilterProduct onFilterChange={handleFilterChange} /> */}
                                    <FilterProduct
                                        selectedPrices={priceRanges}
                                        onFilterChange={(filters, selectedPriceValues) => {
                                            setFilters(filters);
                                            setPriceRanges(selectedPriceValues);
                                            setCurrentPage(1);
                                        }}
                                    />

                                </div>
                            </div>
                            <div className="w-[75%] ">
                                <div className="flex justify-between items-center mb-[20px] py-[10px] px-[10px] bg-[#F7F8F9]">
                                    <h3 className="text-[16px] font-[700] text-black uppercase"> {categoryName}</h3>
                                    <div className="flex justify-center items-center gap-x-[20px]">
                                        <span className="text-[16px] font-[500] text-[#444545]">
                                            Sắp xếp theo:
                                        </span>
                                        <select
                                            className="border px-[8px] py-[10px] text-[16px] outline-none rounded-[8px] w-[180px] text-black cursor-pointer "
                                            value={sort}
                                            onChange={handleSortChange}
                                        >
                                            <option value="">Vui lòng chọn</option>
                                            <option value="price_desc">Giá giảm dần</option>
                                            <option value="price_asc">Giá tăng dần</option>
                                            <option value="newest">Mới nhất</option>
                                            <option value="oldest">Cũ nhất</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-x-[10px] gap-y-[20px]">
                                    {products.length === 0 ? (
                                        <div className="col-span-4 text-center text-[16px] text-gray-500 py-[20px]">
                                            Không có sản phẩm nào phù hợp với bộ lọc.
                                        </div>
                                    ) : (
                                        products.map((product) => (
                                            <ProductItem key={product.id} product={product} slug={product.slug} />
                                        ))
                                    )}
                                </div>
                                <div className="flex items-center justify-center py-[20px] mt-[10px]">
                                    <ReactPaginate
                                        nextLabel={<FontAwesomeIcon icon={faAnglesRight} />}
                                        previousLabel={<FontAwesomeIcon icon={faAnglesLeft} />}
                                        onPageChange={handlePageClick}
                                        pageCount={pageCount}
                                        forcePage={currentPage - 1}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={2}
                                        containerClassName="pagination"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        activeClassName="active"
                                        renderOnZeroPageCount={null}
                                    />
                                </div>

                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default Product;
