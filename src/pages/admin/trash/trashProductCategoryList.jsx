import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { laravelAPI } from "../../../utils/axiosCustom";
import Swal from "sweetalert2";

const TrashProductCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1,
    });

    const fetchTrashProductCategories = async (page = 1) => {
        setLoading(true);
        try {
            const response = await laravelAPI.get("/api/admin/trash/productCategory", {
                params: {
                    page: page,
                    per_page: pagination.per_page
                },
            });
            // console.log("check trah category list:", response);
            if (response.code === "success") {
                setCategories(response.data.data || []);
                setPagination({
                    per_page: response.data.per_page,
                    total: response.data.total,
                    last_page: response.data.last_page,
                });
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu danh mục sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrashProductCategories(currentPage);
    }, [currentPage]);

    const handlePageClick = (selectedItem) => {
        const selectedPage = selectedItem.selected + 1;
        setCurrentPage(selectedPage);
    };

    // /xóa vĩnh viễn
    const handleForceDeleteCategory = async (categoryId) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Danh mục này sẽ bị Xóa vĩnh viễn.",
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
                        `/api/admin/productcategories/${categoryId}`
                    );
                    // console.log("xóa", response)
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Xóa thành công.",
                            icon: "success",
                        });
                        fetchTrashProductCategories();
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Xóa không thành công.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa danh mục:", error);
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
    const handleRestoreCategory = async (categoryId) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Danh mục này sẽ được khôi phục.",
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
                        `/api/admin/productcategories/restore/${categoryId}`
                    );
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Khôi phục thành công.",
                            icon: "success",
                        });
                        fetchTrashProductCategories();
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Khôi phục không thành công.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi khôi phục danh mục:", error);
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
            <h2 className="text-[28px] font-[700] text-[#00000] text-center pb-[30px]">Quản lý danh mục sản phẩm</h2>
            <div className="card mb-3">
                <div className="card-header">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[20px] font-[700] text-[#00000]">
                            Danh sách danh mục
                        </h3>
                    </div>
                </div>
                <div className="card-body">
                    {loading ? (
                        <p className="text-center text-[16px] font-[600]">
                            Đang tải dữ liệu...
                        </p>
                    ) : (
                        <div>
                            <table className="table table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            STT
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Hình ảnh
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Tên danh mục
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Vị trí
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Danh mục cha
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Trạng thái
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Tác vụ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length > 0 ? (
                                        categories.map((category, index) => (
                                            <tr key={category.id}>
                                                <td className="!py-[20px]">
                                                    <input type="checkbox" name="" id="" />
                                                </td>
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center">
                                                    {index + 1 + (currentPage - 1) * 10}
                                                </td>
                                                <td className="!py-[20px] flex items-center justify-center">
                                                    <img
                                                        src={category?.image}
                                                        alt={category?.name}
                                                        className="w-[100px] h-[100px]"
                                                    />
                                                </td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                                                    {category?.name}
                                                </td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                                                    {category?.position}
                                                </td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                                                    {category?.parentName
                                                        ? category?.parentName
                                                        : "Không có"}
                                                </td>
                                                <td className="!py-[20px] text-center">
                                                    <label class="toggle-switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={category?.status === 1}
                                                        />
                                                        <div class="toggle-switch-background">
                                                            <div class="toggle-switch-handle"></div>
                                                        </div>
                                                    </label>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-[6px] !py-[20px]">
                                                        <button
                                                            onClick={() => handleRestoreCategory(category?.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]"
                                                        >
                                                            Khôi phục
                                                        </button>
                                                        <button
                                                            onClick={() => handleForceDeleteCategory(category?.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center py-[10px]">
                                                Không có danh mục sản phẩm nào.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex items-center justify-center mt-[10px]">
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TrashProductCategoryList;