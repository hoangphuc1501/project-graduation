import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/client/breadcrumbs/Breadcrumb";
import ProductItem from "../../../components/client/products/productItem";
import { laravelAPI } from "../../../utils/axiosCustom";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/client/animations/loading";

const SearchProduct = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const pageParam = parseInt(searchParams.get("page")) || 1;
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(pageParam);
    // call api tìm kiếm
    useEffect(() => {
        const fetchProducts = async () => {
            if (!query) return;
            setLoading(true)
            try {
                const response = await laravelAPI.get(`/api/searchProducts`, {
                    params: {
                        query: query,
                        page: currentPage
                    }
                });
                console.log(response)
                if (response.code === "success") {
                    setProducts(response.data || []);
                    setPageCount(response.meta.last_page || 0);
                } else {
                    setProducts([]);
                    setPageCount(0);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
                setProducts([]);
                setPageCount(0);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query, currentPage]);

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
        setSearchParams({ query: query, page: selectedPage });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <Breadcrumb />
            <div className="py-[60px]">
                <div className="container px-[16px] mx-auto">
                    <h2 className="text-[28px] text-[#000000] font-[700] pb-[40px]">
                        Kết quả tìm kiếm: {query || "Không có từ khóa"}
                    </h2>

                    {loading ? (
                        <div className="flex justify-center items-center min-h-[200px]">
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-5 gap-[20px]">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <ProductItem key={product.id} product={product} slug={product.slug} />
                                    ))
                                ) : (
                                    <p className="col-span-5 text-center text-gray-500">
                                        Không tìm thấy sản phẩm nào.
                                    </p>
                                )}
                            </div>

                            {pageCount > 1 && (
                                <div className="flex justify-center mt-[40px]">
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
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default SearchProduct;