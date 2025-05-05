import { FaCirclePlus } from "react-icons/fa6";
import { laravelAPI } from "../../../utils/axiosCustom";
import { useEffect, useState } from "react";
import CreateVoucher from "./createVoucher";
import EditVoucher from "./editVoucher";
import Swal from "sweetalert2";
import DetailVoucher from "./detailVoucher";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { usePermission } from "../../../hooks/usePermission";

const VoucherList = () => {
    const [vouchers, setVouchers] = useState([]);
    const [showCreatevoucher, setShowCreatevoucher] = useState(false);
    const [showEditVoucher, setShowEditVoucher] = useState(false);
    const [showDetailVoucher, setShowDetailVoucher] = useState(false);
    const [voucherId, setVoucherId] = useState("");
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("");
    const [sortOption, setSortOption] = useState("createdAt-desc");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1,
    });
    const canCreate = usePermission("create_voucher");
    const canEdit = usePermission("edit_voucher");
    const canDelete = usePermission("softDelete_voucher");
    const canView = usePermission("view_voucher");
    useEffect(() => {
        fetchVouchers(currentPage);
    }, [currentPage, filterStatus, sortOption, searchKeyword]);
    const fetchVouchers = async (page = 1) => {
        setLoading(true);
        try {
            const response = await laravelAPI.get("/api/admin/vouchers", {
                params: {
                    page: page,
                    per_page: pagination.per_page,
                    status: filterStatus,
                    search: searchKeyword,
                    sort: sortOption,
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

    const handleEditClick = (voucherId) => {
        setVoucherId(voucherId);
        setShowEditVoucher(true);
    };

    // show chi tiết
    const handleDetailClick = (voucherId) => {
        setVoucherId(voucherId);
        setShowDetailVoucher(true);
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };

    const handleSoftDelete = (id) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Voucher sẽ bị xóa và có thể khôi phục!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await laravelAPI.patch(
                        `/api/admin/vouchers/softDelete/${id}`
                    );
                    if (res.code === "success") {
                        Swal.fire({
                            title: "Đã xóa!",
                            text: "Voucher đã được chuyển vào thùng rác.",
                            icon: "success",
                        });
                        fetchVouchers();
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa voucher:", error);
                    Swal.fire("Lỗi!", "Không thể xóa voucher.", "error");
                }
            }
        });
    };

    // / hàm cập nhật trạng thái
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === "active" ? "inactive" : "active";
            const response = await laravelAPI.patch(`/api/admin/vouchers/${id}/status`, {
                status: newStatus
            });

            if (response.code === 'success') {
                toast.success(response.message);
                fetchVouchers();
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái:", err);
            toast.error("Cập nhật trạng thái thất bại!");
        }
    };

    if (!canView) {
        return <p className="text-[28px] font-[700] text-[#FF0000] text-center py-[30px]">Bạn không có quyền truy cập trang này.</p>;
    }

    return (
        <>
            <div className="py-[60px]">
                <h2 className="text-[28px] font-[700] text-[#00000] text-center pb-[30px]">
                    Quản lý mã khuyến mãi
                </h2>
                <div className="card mb-3">
                    <div className="card-header">
                        <h3 className="text-[20px] font-[700] text-[#00000] py-[10px]">
                            Bộ lọc và tìm kiếm
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="card-body">
                            <div className="grid grid-cols-3 gap-[10px]">
                                <div className="flex flex-col gap-[10px]">
                                    <label className="text-[16px] font-[700] text-[#000000]">Trạng thái</label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="">Tất cả</option>
                                        <option value="active">Hoạt động</option>
                                        <option value="inactive">Dừng hoạt động</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <label className="text-[16px] font-[700] text-[#000000]">Vị trí</label>
                                    <select
                                        className="form-control"
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                    >
                                        <option value="createdAt-desc">Mới nhất</option>
                                        <option value="createdAt-asc">Cũ nhất</option>
                                        <option value="title-desc">Tiêu đề từ Z đến A</option>
                                        <option value="title-asc">Tiêu đề từ A đến Z</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <label className="text-[16px] font-[700] text-[#000000]">Tìm kiếm</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm kiếm..."
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && fetchVouchers(1)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-header">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[20px] font-[700] text-[#00000]">
                                Danh sách mã khuyến mãi
                            </h3>
                            {canCreate && (
                                <button
                                    onClick={() => setShowCreatevoucher(true)}
                                    className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main flex items-center gap-[20px] my-[10px]"
                                >
                                    <span>
                                        <FaCirclePlus />
                                    </span>
                                    Thêm mới
                                </button>
                            )}
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
                                                        {" "}
                                                        {new Date(voucher?.startDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="!py-[20px] font-[400] text-[16px] text-[#000000] text-center">
                                                        {" "}
                                                        {new Date(voucher?.endDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="text-center !py-[20px]">
                                                        {canEdit ? (
                                                            <label className="toggle-switch">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={voucher?.status === "active"}
                                                                    onChange={() => handleToggleStatus(voucher?.id, voucher?.status)}
                                                                />
                                                                <div className="toggle-switch-background">
                                                                    <div className="toggle-switch-handle"></div>
                                                                </div>
                                                            </label>
                                                        ) : (
                                                            <span
                                                                className={`inline-block px-[12px] py-[6px] rounded-[12px] text-[14px] font-[600] text-[#ffffff] 
                ${voucher?.status === "active" ? 'bg-[#339900] ' : 'bg-[#FF0000]'}`}>
                                                                {voucher?.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="!py-[20px]">
                                                        <div className="flex items-center justify-center gap-[6px]">
                                                            <button
                                                                onClick={() => handleDetailClick(voucher?.id)}
                                                                className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[12px] py-[8px] px-[12px]"
                                                            >
                                                                Chi tiết
                                                            </button>
                                                            {canEdit && (
                                                                <button
                                                                    onClick={() => handleEditClick(voucher?.id)}
                                                                    className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]">
                                                                    Sửa
                                                                </button>
                                                            )}

                                                            {canDelete && (
                                                                <button
                                                                    onClick={() => handleSoftDelete(voucher?.id)}
                                                                    className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]">
                                                                    Xóa
                                                                </button>
                                                            )}
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
            <CreateVoucher
                showCreateVoucherModal={showCreatevoucher}
                setShowCreateVoucherModal={setShowCreatevoucher}
                fetchVouchers={fetchVouchers}
            />
            <EditVoucher
                showEditVoucherModal={showEditVoucher}
                setShowEditVoucherModal={setShowEditVoucher}
                fetchVouchers={fetchVouchers}
                voucherId={voucherId}
            />
            <DetailVoucher
                showDetailVoucherModal={showDetailVoucher}
                setShowDetailVoucherModal={setShowDetailVoucher}
                voucherId={voucherId}
            />
        </>
    );
};

export default VoucherList;
