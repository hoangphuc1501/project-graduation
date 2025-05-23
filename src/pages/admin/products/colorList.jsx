import { useEffect, useState } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import { FaCirclePlus } from "react-icons/fa6";
import CreateModalColor from "../../../components/admin/products/createColorModal";
import EditModalColor from "../../../components/admin/products/editColorModal";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { usePermission } from "../../../hooks/usePermission";

const ColorList = () => {
    const [colors, setColors] = useState([]);
    const [showModalColor, setShowModalColor] = useState(false)
    const [selectedColorId, setSelectedColorId] = useState(null);
    const [showModalEditSize, setShowModalEditSize] = useState(false)
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1
    });

    const canCreate = usePermission("create_color");
    const canEdit = usePermission("edit_color");
    const canDelete = usePermission("softDelete_color");
    const canView = usePermission("view_color");

    useEffect(() => {
        fetchColors(currentPage);
    }, [filterStatus, searchKeyword, sortOption, currentPage]);

    // hàm list màu sắc
    const fetchColors = async (page = 1) => {
        try {
            setLoading(true);
            const response = await laravelAPI.get("/api/admin/colors", {
                params: {
                    page: page,
                    per_page: pagination.per_page,
                    status: filterStatus,
                    search: searchKeyword,
                    sort: sortOption,
                }
            });
            // console.log(response);
            if (response.code === "success") {
                setColors(response.data.data);
                setPagination({
                    per_page: response.data.per_page,
                    total: response.data.total,
                    last_page: response.data.last_page
                });
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách màu sắc:", error);
        } finally {
            setLoading(false);
        }
    };

    // nút bấm cập nhật
    const handleEditClick = (id) => {
        setSelectedColorId(id);
        setShowModalEditSize(true);
    };

    // hàm xóa
    const handleDeleteClick = async (id) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await laravelAPI.patch(`/api/admin/colors/softDelete/${id}`);
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Xóa thành công!",
                            icon: "success",
                        });
                        fetchColors();
                    } else {
                        Swal.fire({
                            title: "Lỗi!",
                            text: response.message || "Có lỗi xảy ra khi xóa!",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa:", error);
                    Swal.fire({
                        title: "Lỗi!",
                        text: "Không thể kết nối đến máy chủ.",
                        icon: "error",
                    });
                }
            }
        });
    };

    // hàm phần trang
    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };

    // / hàm cập nhật trạng thái
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const response = await laravelAPI.patch(`/api/admin/colors/${id}/status`, {
                status: !currentStatus
            });

            if (response.code === 'success') {
                toast.success(response.message);
                fetchColors();
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái:", err);
            toast.error("Cập nhật trạng thái thất bại!");
        }
    };

    // hàm cập nhật vị trí
    const handlePositionChange = async (colorId, newPosition) => {
        try {
            const response = await laravelAPI.patch(`/api/admin/colors/${colorId}/position`, {
                position: parseInt(newPosition),
            });

            if (response.code === 'success') {
                toast.success(response.message);
                fetchColors();
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật vị trí:", error);
            toast.error("Cập nhật vị trí thất bại!");
        }
    };

    if (!canView) {
        return <p className="text-[28px] font-[700] text-[#FF0000] text-center py-[30px]">Bạn không có quyền truy cập trang này.</p>;
    }

    return (
        <div className="py-[20px]">
            <h2 className="text-[28px] text-[#000000] font-[700] text-center py-[40px]">
                Quản lý màu sắc
            </h2>
            <div className="card mb-3">
                <div className="card-header">
                    <h3 className="text-[20px] font-[700] text-[#00000] py-[10px]">
                        Bộ lọc và tìm kiếm
                    </h3>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-3 gap-[10px]">
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Trạng thái</label>
                            <select
                                className="form-control"
                                onChange={(e) => setFilterStatus(e.target.value)}>
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
                                <option value="position-desc">Vị trí giảm dần</option>
                                <option value="position-asc">Vị trí tăng dần</option>
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
                                onKeyDown={(e) => e.key === "Enter" && fetchColors(1)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header">
                    <div className="flex items-center justify-between py-[10px]">
                        <h3 className="text-[20px] text-[#000000] font-[700] ">
                            Danh sách màu sắc
                        </h3>
                        {canCreate && (
                            <button
                                onClick={() => setShowModalColor(true)}
                                className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main  flex items-center gap-[20px]">
                                <span><FaCirclePlus /></span>
                                Thêm mới
                            </button>
                        )}
                    </div>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-[40px] text-[18px] font-[600] text-gray-500">
                            Đang tải dữ liệu màu sắc...
                        </div>
                    ) : (
                        <>
                            <table className="table table-hover table-sm">
                                <thead className="bg-[#EEEEEE]">
                                    <tr>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            STT
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Tên màu sắc
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Vị trí
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Trạng thái
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                        Tác vụ
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {colors.length > 0 ? (
                                        colors?.map((color, index) => (
                                            <tr className="border-t " key={color?.id}>
                                                <th className="!py-[20px] font-[400] text-[16px] text-[400] text-center">
                                                    {index + 1 + (currentPage - 1) * 10}
                                                </th>
                                                <th className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                                                    {color?.name}
                                                </th>
                                                <th className="!py-[20px] text-center">
                                                    {canEdit ? (
                                                        <input
                                                            type="number"
                                                            name="position"
                                                            value={color?.position}
                                                            min={1}
                                                            onChange={(e) => handlePositionChange(color?.id, e.target.value)}
                                                            className="w-[80px] border rounded-[12px] py-[4px] text-[16px] font-[400] text-center text-[#000000]"
                                                        />
                                                    ) : (
                                                        <span className="font-[600] text-[16px] text-[#000000]">{color?.position}</span>
                                                    )}
                                                </th>
                                                <th className="text-center !py-[20px]">
                                                    {canEdit ? (
                                                        <label className="toggle-switch">
                                                            <input
                                                                type="checkbox"
                                                                checked={color?.status === 1}
                                                                onChange={() => handleToggleStatus(color?.id, color?.status)}
                                                            />
                                                            <div className="toggle-switch-background">
                                                                <div className="toggle-switch-handle"></div>
                                                            </div>
                                                        </label>
                                                    ) : (
                                                        <span
                                                            className={`inline-block px-[12px] py-[6px] rounded-[12px] text-[14px] font-[600] text-[#ffffff] 
                ${color?.status === 1 ? 'bg-[#339900] ' : 'bg-[#FF0000]'}`}>
                                                            {color?.status === 1 ? "Đang hoạt động" : "Không hoạt động"}
                                                        </span>
                                                    )}
                                                </th>
                                                <th>
                                                    <div className="flex items-center justify-center gap-[6px] !py-[20px]">
                                                        <button
                                                            // onClick={() => handleViewProduct(product.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[12px] py-[8px] px-[12px]"
                                                        >
                                                            Chi tiết
                                                        </button>
                                                        {canEdit && (
                                                            <button
                                                                onClick={() => handleEditClick(color?.id)}
                                                                className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]">
                                                                Sửa
                                                            </button>
                                                        )}
                                                        {canDelete && (
                                                            <button
                                                                onClick={() => handleDeleteClick(color?.id)}
                                                                className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]">
                                                                Xóa
                                                            </button>
                                                        )}
                                                    </div>
                                                </th>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center py-[10px] text-[16px] font-[500] text-gray-500">
                                                Không có màu sắc nào
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

            <CreateModalColor
                showCreateColor={showModalColor}
                setShowCreateColor={setShowModalColor}
                refreshColor={fetchColors}
            />
            <EditModalColor
                showEditColor={showModalEditSize}
                setShowEditColor={setShowModalEditSize}
                refreshColor={fetchColors}
                colorId={selectedColorId}
            />
        </div>

    );
};

export default ColorList;
