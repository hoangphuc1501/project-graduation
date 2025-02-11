import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductItem from "../../../components/client/products/productItem";
import axios from '../../../utils/axiosCustom';
const items = [...Array(33).keys()];

function Items({ currentItems }) {
    return (
        <div className="items">
            {currentItems && currentItems.map((item) => (
                <div>
                    {/* <h3>Item #{item}</h3> */}
                </div>
            ))}
        </div>
    );
}

function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                nextLabel={<FontAwesomeIcon icon={faAnglesRight} />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
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
        </>
    );
}

const Product = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/products");
                // console.log("API Response:", response.data);
                setProducts(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            } 
        };

        fetchProducts();
    }, []);

    return (
        <div className="py-[100px]">
            <div className="container mx-auto px-[16px]">
                <div className="flex justify-center gap-[20px]">
                    <div className="w-[calc(25%-20px)] border">
                        <h3 className="">Bộ lọc</h3>
                    </div>
                    <div className="w-[75%] ">
                        <div className="flex justify-between items-center mb-[20px] py-[10px] px-[10px] bg-[#F7F8F9]">
                            <h3 className="text-[16px] font-[700] text-black uppercase">Vợt Yonex</h3>
                            <div className="flex justify-center items-center gap-x-[20px]">
                                <span className="text-[16px] font-[500] text-[#444545]">
                                    Sắp xếp theo:
                                </span>
                                <select
                                    name=""
                                    id=""
                                    className="border px-[8px] py-[10px] text-[16px] outline-none rounded-[8px] w-[180px] text-black cursor-pointer "
                                >
                                    <option value="">Vui lòng chọn</option>
                                    <option value="">Giá giảm dần</option>
                                    <option value="">Giá tăng dần</option>
                                    <option value="">Mới nhất</option>
                                    <option value="">Cũ nhất</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-[20px] ">
                        {products.map((product) => (
                                <ProductItem key={product.id} product={product} />
                            ))}
                        </div>
                        <div className="flex items-center justify-center py-[20px] mt-[10px]">
                            <PaginatedItems itemsPerPage={4} />,
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
