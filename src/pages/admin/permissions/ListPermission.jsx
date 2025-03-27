import { FaCirclePlus } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";

import Swal from 'sweetalert2';
import CreatePermission from "./createPermission";
import EditPermission from "./editPermission";
import ReactPaginate from "react-paginate";


const ListPermission = () => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreatePermission, setShowCreatePermission] = useState(false);
    const [showEditPermission, setShowEditPermission] = useState(false);
    const [selectedPermissionId, setSelectedPermissionId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1
    });
    // Hàm gọi API để lấy danh sách quyền
    useEffect(() => {
        fetchPermissions(currentPage);
    }, [currentPage]);

    const fetchPermissions = async (page = 1) => {

        try {
            setLoading(true);
            const response = await laravelAPI.get("/api/admin/permissions", {
                params: {
                    page: page,
                    per_page: pagination.per_page
                }
            });
            console.log("check list permissions", response)
            if (response.code === "success") {
                setPermissions(response.data.data);
                setPagination({
                    per_page: response.data.per_page,
                    total: response.data.total,
                    last_page: response.data.last_page
                });
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách quyền:", error);
        } finally {
            setLoading(false);
        }
    };
    const groupPermissionsByModule = (data) => {
        return data.reduce((acc, item) => {
            if (!acc[item.module]) acc[item.module] = [];
            acc[item.module].push(item);
            return acc;
        }, {});
    };

    // hàm nút update
    const handleEditClick = (permissionId) => {
        setSelectedPermissionId(permissionId);
        setShowEditPermission(true);
    };

    // Hàm xử lý xóa quyền
    const handleDeletePermission = (permissionId) => {
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
                // Gọi API xóa quyền
                laravelAPI.delete(`/api/admin/permissions/${permissionId}`)
                    .then((response) => {
                        if (response.code === "success") {
                            Swal.fire({
                                title: "Xóa thành công.",
                                icon: "success",
                            });
                            fetchPermissions();
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "Xóa không thành công.",
                            icon: "error",
                        });
                        console.error("Lỗi khi xóa quyền:", error);
                    });
            }
        });
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };
    const groupedPermissions = groupPermissionsByModule(permissions);

    return (
        <>
            <div className="py-[20px]">
                <h2 className="text-[28px] text-[#000000] font-[700] text-center py-[40px]">
                    Danh sách quyền
                </h2>
                <div className="flex items-center justify-between py-[10px] mb-[10px]">
                    <button
                        onClick={() => setShowCreatePermission(true)}
                        className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main my-[20px] flex items-center gap-[20px]">
                        <span>
                            <FaCirclePlus />
                        </span>
                        Thêm mới
                    </button>
                </div>
                <div className="">
                    {loading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <>
                            <table className="w-full " >
                                <thead className="bg-[#EEEEEE]">
                                    <tr>
                                        <td></td>
                                        <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                            STT
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                            Tên Quyền
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                            Mô tả
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                            Hành động
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(groupedPermissions).map((module, idx) => (
                                        <React.Fragment key={idx}>
                                            <tr className="border-t bg-gray-200">
                                                <th colSpan="5" className="py-[10px] font-[600] text-[16px] text-[#000000] text-center">
                                                    {module}
                                                </th>
                                            </tr>
                                            {groupedPermissions[module].map((permission, index) => (
                                                    <tr key={permission?.id} className="border-t">
                                                        <td></td>
                                                        <td className="font-[400] text-[16px] text-[400] text-center">{index + 1 + (currentPage - 1) * 10}</td>
                                                        <td className="font-[600] text-[16px] text-[#000000] text-center">{permission?.name}</td>
                                                        <td className="font-[600] text-[16px] text-[#000000] text-center" dangerouslySetInnerHTML={{ __html: permission?.description || "" }}></td>
                                                        <td>
                                                            <div className="flex items-center justify-center gap-[6px] py-[10px]">
                                                                <button
                                                                    onClick={() => handleEditClick(permission?.id)}
                                                                    className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]">
                                                                    Sửa
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeletePermission(permission?.id)}
                                                                    className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]">
                                                                    Xóa
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </React.Fragment>
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
            <CreatePermission
                showCreatePermissionModal={showCreatePermission}
                setShowCreatePermissionModal={setShowCreatePermission}
                fetchPermissions={fetchPermissions}
            />
            <EditPermission
                showEditPermssionModal={showEditPermission}
                setShowEditPermissionModal={setShowEditPermission}
                fetchPermission={fetchPermissions}
                permissionId={selectedPermissionId}
            />
        </>
    );
};

export default ListPermission;
