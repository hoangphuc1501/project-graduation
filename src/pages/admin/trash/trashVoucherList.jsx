import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { laravelAPI } from "../../../utils/axiosCustom";
import Swal from "sweetalert2";


const TrashVoucherList = () => {
    const [vouchers, setVouchers] = useState([]);
        const [loading, setLoading] = useState(true);
        const [currentPage, setCurrentPage] = useState(1);
        const [pagination, setPagination] = useState({
            per_page: 10,
            total: 0,
            last_page: 1,
        });
    
        useEffect(() => {
            fetchTrashVouchers(currentPage);
        }, [currentPage]);

        const fetchTrashVouchers = async (page = 1) => {
            setLoading(true);
            try {
                const response = await laravelAPI.get("/api/admin/trash/vouchers", {
                    params: {
                        page: page,
                        per_page: pagination.per_page
                    },
                });
                // console.log("check voucher list", response);
                if (response.code === "success") {
                    setVouchers(response.data.data);
                    setPagination({
                        per_page: response.data.per_page,
                        total: response.data.total,
                        last_page: response.data.last_page,
                    });
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách voucher:", error);
            } finally {
                setLoading(false);
            }
        };
    
        const handlePageClick = (event) => {
            const selectedPage = event.selected + 1;
            setCurrentPage(selectedPage);
        };

        // /xóa vĩnh viễn
            const handleForceDeleteVoucher = async (VoucherId) => {
                Swal.fire({
                    title: "Bạn có chắc chắn?",
                    text: "Mã giảm giá này sẽ bị xóa vĩnh viễn.",
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
                                `/api/admin/vouchers/${VoucherId}`
                            );
                            // console.log("xóa", response)
                            if (response.code === "success") {
                                Swal.fire({
                                    title: "Xóa thành công.",
                                    icon: "success",
                                });
                                fetchTrashVouchers();
                            } else {
                                Swal.fire({
                                    title: "Error!",
                                    text: "Xóa không thành công.",
                                    icon: "error",
                                });
                            }
                        } catch (error) {
                            console.error("Lỗi khi xóa mã giảm giá:", error);
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
            const handleRestoreVoucher = async (VoucherId) => {
                Swal.fire({
                    title: "Bạn có chắc chắn?",
                    text: "Mã giảm giá này sẽ được khôi phục.",
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
                                `/api/admin/vouchers/restore/${VoucherId}`
                            );
                            if (response.code === "success") {
                                Swal.fire({
                                    title: "Khôi phục thành công.",
                                    icon: "success",
                                });
                                fetchTrashVouchers();
                            } else {
                                Swal.fire({
                                    title: "Error!",
                                    text: "Khôi phục không thành công.",
                                    icon: "error",
                                });
                            }
                        } catch (error) {
                            console.error("Lỗi khi khôi phục mã giảm giá:", error);
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
            <h2 className="text-[28px] font-[700] text-[#00000] text-center pb-[30px]">Quản lý mã giảm giá</h2>
            <div className="card mb-3">
                    <div className="card-header">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[20px] font-[700] text-[#00000]">
                                Danh sách mã khuyến mãi
                            </h3>
                        </div>
                    </div>
                    <div className="card-body">
                        {loading ? (
                            <p>Đang tải dữ liệu...</p>
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
                                                Tên mã khuyến mãi
                                            </th>
                                            <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                                Mã khuyến mãi
                                            </th>
                                            <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                                Loại giảm giá
                                            </th>
                                            <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                                Giá trị giảm giá
                                            </th>
                                            <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                                Ngày bắt đầu
                                            </th>
                                            <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                                Ngày hết hạn
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
                                        {vouchers?.length > 0 ? (
                                            vouchers?.map((voucher, index) => (
                                                <tr key={voucher?.id}>
                                                    <td className="!py-[20px]">
                                                        <input type="checkbox" name="" id="" />
                                                    </td>
                                                    <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center">
                                                    {index + 1 + (currentPage - 1) * 10}
                                                    </td>
                                                    <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                                                        {voucher?.name}
                                                    </td>
                                                    <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                                                        {voucher?.code}
                                                    </td>
                                                    <td className="!py-[20px] text-center">
                                                        {voucher?.discountType === 1
                                                            ? "Giảm % "
                                                            : "Giảm tiền"}
                                                    </td>
                                                    <td className="!py-[20px] font-[400] text-[16px] text-[#000000] text-center">
                                                        {" "}
                                                        {voucher?.discountValue.toLocaleString()}
                                                    </td>
                                                    <td className="!py-[20px] font-[400] text-[16px] text-[#000000] text-center">
                                                        {new Date(voucher?.startDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="!py-[20px] font-[400] text-[16px] text-[#000000] text-center">
                                                        {new Date(voucher?.endDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="text-center !py-[20px]">
                                                    <label class="toggle-switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={voucher?.status === "active"}
                                                        />
                                                        <div class="toggle-switch-background">
                                                            <div class="toggle-switch-handle"></div>
                                                        </div>
                                                    </label>
                                                </td>

                                                    <td className="!py-[20px]">
                                                        <div className="flex items-center justify-center gap-[6px]">
                                                            <button
                                                                onClick={() => handleRestoreVoucher(voucher?.id)}
                                                                className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]"
                                                            >
                                                                Khôi phục
                                                            </button>
                                                            <button
                                                                onClick={() => handleForceDeleteVoucher(voucher?.id)}
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
                                                <td colSpan="8" className="text-center text-gray-500">
                                                    Không có mã giảm giá nào
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

export default TrashVoucherList;