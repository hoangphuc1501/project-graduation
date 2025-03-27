import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { laravelAPI } from "../../../utils/axiosCustom";
import Swal from "sweetalert2";



const TrashProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1,
    });

    useEffect(() => {
        fetchProductsTrash(currentPage);
    }, [currentPage]);

    const fetchProductsTrash = async (page = 1) => {
        try {
            setLoading(true);
            const response = await laravelAPI.get("/api/admin/trash/products", {
                params: {
                    page: page,
                    per_page: pagination.per_page
                }
            });
            console.log("API Response:", response);
            if (response.code === "success") {
                setProducts(response.data.data || []);
                setPagination({
                    per_page: response.data.per_page,
                    total: response.data.total,
                    last_page: response.data.last_page,
                });

            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };

        // /xóa vĩnh viễn
        const handleForceDeleteProduct = async (productId) => {
            Swal.fire({
                title: "Bạn có chắc chắn?",
                text: "Sản phẩm này sẽ bị Xóa vĩnh viễn.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await laravelAPI.delete(
                            `/api/admin/products/${productId}`
                        );
                        // console.log("xóa", response)
                        if (response.code === "success") {
                            Swal.fire({
                                title: "Xóa thành công.",
                                icon: "success",
                            });
                            fetchProductsTrash();
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Xóa không thành công.",
                                icon: "error",
                            });
                        }
                    } catch (error) {
                        console.error("Lỗi khi xóa sản phẩm:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Xóa không thành công.",
                            icon: "error",
                        });
                    }
                }
            });
        };
    // Khôi phục
        const handleRestoreProduct = async (productId) => {
            Swal.fire({
                title: "Bạn có chắc chắn?",
                text: "Sản phẩm này sẽ được khôi phục.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await laravelAPI.patch(
                            `/api/admin/products/restore/${productId}`
                        );
                        if (response.code === "success") {
                            Swal.fire({
                                title: "Khôi phục thành công.",
                                icon: "success",
                            });
                            fetchProductsTrash();
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Khôi phục không thành công.",
                                icon: "error",
                            });
                        }
                    } catch (error) {
                        console.error("Lỗi khi khôi phục sản phẩm:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Khôi phục không thành công.",
                            icon: "error",
                        });
                    }
                }
            });
        };

    return (
        <div className="py-[60px]">
            <h2 className="text-[28px] font-[700] text-[#00000] text-center pb-[30px]">Quản lý sản phẩm</h2>
            <div className="card mb-3">
                <div className="card-header">
                    <div className="flex items-center justify-between py-[10px]">
                        <h3 className="text-[20px] text-[#000000] font-[700] ">Danh sách sản phẩm</h3>
                    </div>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center text-[16px] font-[600]">
                            Đang tải dữ liệu sản phẩm...
                        </div>
                    ) : (
                        <>
                            <table className="table table-hover table-sm">
                                <thead className="bg-[#EEEEEE]">
                                    <tr>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">STT</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Hình ảnh</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center w-[25%]">Tên sản phẩm</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Vị trí</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Trạng thái</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Nổi bật</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Danh mục</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Thương hiệu</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Tác vụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.length > 0 ? (
                                        products?.map((product, index) => (
                                            <tr className="border-t " key={product?.id}>
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center"> {index + 1 + (currentPage - 1) * 10}</td>
                                                <td className="!py-[20px] flex items-center justify-center ">
                                                    {product?.variants &&
                                                        product?.variants?.length > 0 &&
                                                        product?.variants[0].images &&
                                                        product?.variants[0].images.length > 0 ? (
                                                        <img
                                                            src={product?.variants[0].images[0].image}
                                                            alt={product?.title}
                                                            className="w-[100px] h-[100px]" />
                                                    ) : (
                                                        <span>No image</span>
                                                    )}
                                                </td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center w-[25%]"> {product?.title} </td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center"> {product?.position} </td>
                                                <td className="text-center !py-[20px]">
                                                    <label class="toggle-switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={product?.status === 1}
                                                        />
                                                        <div class="toggle-switch-background">
                                                            <div class="toggle-switch-handle"></div>
                                                        </div>
                                                    </label>
                                                </td>
                                                <td className=" text-center !py-[20px]">
                                                    <label class="toggle-switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={product.featured === 1}
                                                        />
                                                        <div class="toggle-switch-background">
                                                            <div class="toggle-switch-handle"></div>
                                                        </div>
                                                    </label>
                                                </td>
                                                <td className=" text-center !py-[20px] font-[600] text-[16px] text-[#000000]">
                                                    {product?.category?.name}
                                                </td>
                                                <td className=" text-center !py-[20px] font-[600] text-[16px] text-[#000000]">
                                                    {product?.brand?.name}
                                                </td>
                                                <td className=" text-center !py-[20px]">
                                                    <div className="flex items-center justify-center gap-[6px]">
                                                        <button
                                                            onClick={() => handleRestoreProduct(product.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]">
                                                            Khôi phục
                                                        </button>
                                                        <button
                                                            onClick={() => handleForceDeleteProduct(product.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]">
                                                            Xóa</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center py-[10px]">
                                                Không có sản phẩm nào.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex items-center justify-center mt-[20px]">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="›"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={1}
                                    pageCount={pagination.last_page}
                                    previousLabel="‹"
                                    forcePage={currentPage - 1}
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
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TrashProductList;