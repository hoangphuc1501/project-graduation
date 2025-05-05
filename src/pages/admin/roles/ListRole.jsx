import { FaCirclePlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import CreateRole from "./createRole";
import EditRole from "./editRole";
import Swal from "sweetalert2";
import RoleDetail from "./roleDetail";
import ReactPaginate from "react-paginate";
import { usePermission } from "../../../hooks/usePermission";

const ListRoles = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateRole, setShowCreateRole] = useState(false);
    const [showEditRole, setShowEditRole] = useState(false);
    const [showDetailRole, setShowDetailRole] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1,
    });
    const canCreate = usePermission("create_role");
    const canEdit = usePermission("edit_role");
    const canDelete = usePermission("delete_role");
    const canView = usePermission("view_role");
    // Hàm gọi API để lấy danh sách vai trò
    useEffect(() => {
        fetchRoles(currentPage);
    }, [currentPage]);

    const fetchRoles = async (page = 1) => {
        try {
            setLoading(true);
            const response = await laravelAPI.get("/api/admin/roles", {
                params: {
                    page: page,
                    per_page: pagination.per_page,
                },
            });
            // console.log("check list role", response)
            if (response.code === "success") {
                setRoles(response.data.data);
                setPagination({
                    per_page: response.data.per_page,
                    total: response.data.total,
                    last_page: response.data.last_page,
                });
            }
        } catch (error) {
            console.error("Error fetching roles:", error);
        } finally {
            setLoading(false);
        }
    };

    // hàm nút update
    const handleEditClick = (roleId) => {
        setSelectedRoleId(roleId);
        setShowEditRole(true);
    };

    // Hàm xử lý xóa vai trò
    const handleDeleteRole = (roleId) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Sau khi xóa sẽ không thể khôi phục!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                // Gọi API xóa vai trò
                laravelAPI
                    .delete(`/api/admin/roles/${roleId}`)
                    .then((response) => {
                        if (response.code === "success") {
                            Swal.fire({
                                title: "Xóa thành công.",
                                icon: "success",
                            });
                            fetchRoles();
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "Xóa không thành công.",
                            icon: "error",
                        });
                        console.error("Lỗi khi xóa vai trò:", error);
                    });
            }
        });
    };

    // Hàm mở modal chi tiết vai trò
    const handleDetailClick = (roleId) => {
        setSelectedRoleId(roleId);
        setShowDetailRole(true);
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };
    if (!canView) {
        return (
            <p className="text-[28px] font-[700] text-[#FF0000] text-center py-[30px]">
                Bạn không có quyền truy cập trang này.
            </p>
        );
    }
    return (
        <>
            <div className="py-[20px]">
                <h2 className="text-[28px] text-[#000000] font-[700] text-center py-[40px]">
                    Vai trò
                </h2>
                <div className="flex items-center justify-between py-[10px] mb-[10px]">
                    <h3 className="text-[20px] text-[#000000] font-[700] ">
                        Danh sách vai trò
                    </h3>
                    {canCreate && (
                        <button
                            onClick={() => setShowCreateRole(true)}
                            className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main flex items-center gap-[20px] my-[10px]"
                        >
                            <span>
                                <FaCirclePlus />
                            </span>
                            Thêm mới
                        </button>
                    )}
                </div>
                <div className="">
                    {loading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <>
                            <table className="w-full ">
                                <thead className="bg-[#EEEEEE]">
                                    <tr>
                                        <td></td>
                                        <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                            STT
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                            Tên vai trò
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                            Mô tả
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                            Tác vụ
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles?.map((role, index) => (
                                        <tr className="border-t " key={role?.id}>
                                            <th className="py-[10px]">
                                                <input type="checkbox" name="" id="" />
                                            </th>
                                            <th className="py-[10px] font-[400] text-[16px] text-[400] text-center">
                                                {index + 1 + (currentPage - 1) * 10}
                                            </th>
                                            <th className="py-[10px] font-[600] text-[16px] text-[#000000] text-center">
                                                {role?.name}
                                            </th>
                                            <th
                                                className="py-[10px] font-[600] text-[16px] text-[#000000] text-center"
                                                dangerouslySetInnerHTML={{
                                                    __html: role?.description || "",
                                                }}
                                            ></th>
                                            <th>
                                                <div className="flex items-center justify-center gap-[6px] py-[10px]">
                                                    <button
                                                        onClick={() => handleDetailClick(role?.id)}
                                                        className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[12px] py-[8px] px-[12px]"
                                                    >
                                                        chi tiết
                                                    </button>
                                                    {canEdit && (
                                                        <button
                                                            onClick={() => handleEditClick(role?.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]"
                                                        >
                                                            Sửa
                                                        </button>
                                                    )}

                                                    {canDelete && (
                                                        <button
                                                            onClick={() => handleDeleteRole(role?.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]"
                                                        >
                                                            Xóa
                                                        </button>
                                                    )}
                                                </div>
                                            </th>
                                        </tr>
                                    ))}
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
            <CreateRole
                showCreateRoleModal={showCreateRole}
                setShowCreateRoleModal={setShowCreateRole}
                fetchRoles={fetchRoles}
            />
            <EditRole
                showEditRoleModal={showEditRole}
                setShowEditRoleModal={setShowEditRole}
                fetchRoles={fetchRoles}
                roleId={selectedRoleId}
            />
            <RoleDetail
                showDetailRoleModal={showDetailRole}
                setShowDetailRoleModal={setShowDetailRole}
                roleId={selectedRoleId}
            />
        </>
    );
};

export default ListRoles;
