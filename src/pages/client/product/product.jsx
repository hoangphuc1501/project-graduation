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




const Product = () => {
    // const [pageCount, setPageCount] = useState(0);
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("Danh mục sản phẩm");
    // useEffect(() => {
    //     const fetchProducts = async (page) => {
    //         try {
    //             const response = await nodeAPI.get(`/products`);
    //             // console.log("API Response:", response.data);
    //             setProducts(response.data || []);
    //         } catch (error) {
    //             console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    //         }
    //     };

    //     fetchProducts();
    // }, []);
    useEffect(() => {
        const fetchProducts = async (page) => {
            try {
                const response = await laravelAPI.get(`/api/categories/${slug}`);
                console.log("API Response:", response);
                // setProducts(response.data || []);
                // setCategoryName(response.message.split("danh mục ")[1].split(" thành công")[0]); 
                if (response.code === "success") {
                    setProducts(response.data || []);
                    setCategoryName(response.message); 
                } else {
                    setProducts([]);
                    setCategoryName("Danh mục sản phẩm");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
                setCategoryName("Danh mục sản phẩm");
            }
        };

        if (slug) fetchProducts();
    }, [slug]);
    
    // const handleSortChange = (e) => {
    //     const sortValue = e.target.value;
    //     // console.log(sortValue)
    //     fetch(`/products?sortBy=${sortValue}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.code === "success") {
    //                 setProducts(data.data);
    //                 toast.success(data.message);
    //             } else {
    //                 console.error("Có lỗi khi lấy dữ liệu sản phẩm");
    //             }
    //         });
    // };

    const handlePageClick = (event) => {

        console.log(`User requested page number ${event.selected} `);
    };

    return (
        <>
            <Breadcrumb />
            <div className="py-[100px]">
                <div className="container mx-auto px-[16px]">
                    <div className="flex justify-center gap-[20px]">
                        <div className="w-[calc(25%-20px)]">
                            <div className="border rounded-[12px] overflow-hidden">
                                {/* <h2 className="text-[20px] font-[500] text-[#333333] pb-[12px] uppercase text-center border py-[10px] rounded-t-[4px]">bộ lọc</h2> */}
                                <FilterProduct />
                            </div>
                            <div className="border mt-[40px]">
                                <AccordionProduct />
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
                                        name=""
                                        id=""
                                        className="border px-[8px] py-[10px] text-[16px] outline-none rounded-[8px] w-[180px] text-black cursor-pointer "
                                        // onChange={(e) => handleSortChange(e)}
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
                                {products.map((product) => (
                                    <ProductItem key={product.id} product={product} slug={product.slug} />
                                ))}
                            </div>
                            <div className="flex items-center justify-center py-[20px] mt-[10px]">

                            </div>
                            <ReactPaginate
                                nextLabel={<FontAwesomeIcon icon={faAnglesRight} />}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={10}
                                previousLabel={<FontAwesomeIcon icon={faAnglesLeft} />}
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
