import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { laravelAPI } from "../../../utils/axiosCustom";
import Swal from "sweetalert2";


const TrashSizeList = () => {
    const [sizes, setsizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1,
    });

    useEffect(() => {
        fetchTrashSizes(currentPage);
    }, [currentPage]);

    // hàm call api list
    const fetchTrashSizes = async (page = 1) => {
        try {
            setLoading(true);
            const response = await laravelAPI.get("/api/admin/trash/sizes", {
                params: {
                    page: page,
                    per_page: pagination.per_page
                }
            });
            console.log(response);
            if (response.code === "success") {
                setsizes(response.data.data);
                setPagination({
                    per_page: response.data.per_page,
                    total: response.data.total,
                    last_page: response.data.last_page
                });
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách kích thước:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };

    // /xóa vĩnh viễn
    const handleForceDeleteSize = async (sizeId) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Kích thước này sẽ bị xóa vĩnh viễn.",
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
                        `/api/admin/sizes/${sizeId}`
                    );
                    // console.log("xóa", response)
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Xóa thành công.",
                            icon: "success",
                        });
                        fetchTrashSizes();
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Xóa không thành công.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa kích thước:", error);
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
    const handleRestoreSize = async (colorId) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Kích thước này sẽ được khôi phục.",
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
                        `/api/admin/sizes/restore/${colorId}`
                    );
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Khôi phục thành công.",
                            icon: "success",
                        });
                        fetchTrashSizes();
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Khôi phục không thành công.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi khôi phục kích thước:", error);
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
            <h2 className="text-[28px] font-[700] text-[#00000] text-center pb-[30px]">Quản lý kích thước</h2>
            <div className="card mb-3">
                <div className="card-header">
                    <div className="flex items-center justify-between py-[10px]">
                        <h3 className="text-[20px] text-[#000000] font-[700] ">
                            Danh sách kích thước
                        </h3>
                    </div>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-[40px] text-[18px] font-[600] text-gray-500">
                            Đang tải dữ liệu kích thước...
                        </div>
                    ) : (
                        <>
                            <table className="w-full table table-hover table-sm">
                                <thead className="bg-[#EEEEEE]">
                                    <tr>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            STT
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Tên kích thước
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Vị trí
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Trạng thái
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sizes.length > 0 ? (
                                        sizes?.map((size, index) => (
                                            <tr className="border-t " key={size?.id}>
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center">
                                                    {index + 1 + (currentPage - 1) * 10}
                                                </td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                                                    {size?.name}
                                                </td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                                                    {size?.position}
                                                </td>
                                                <td className="text-center !py-[20px]">
                                                    <label class="toggle-switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={size?.status === 1}
                                                        />
                                                        <div class="toggle-switch-background">
                                                            <div class="toggle-switch-handle"></div>
                                                        </div>
                                                    </label>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-[6px] !py-[20px]">
                                                        <button
                                                            onClick={() => handleRestoreSize(size?.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]"
                                                        >
                                                            Khôi phục
                                                        </button>
                                                        <button
                                                            onClick={() => handleForceDeleteSize(size?.id)}
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
                                            <td colSpan="8" className="text-center py-[10px] text-[16px] font-[500] text-gray-500">
                                                Không có kích thước nào
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

export default TrashSizeList;