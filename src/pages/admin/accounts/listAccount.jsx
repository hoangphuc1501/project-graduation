import { FaCirclePlus } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import CreteAccount from "./createAccount";
import EditAccount from "./editAccount";
import DetailAccount from "./detailAccount";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { usePermission } from "../../../hooks/usePermission";

const Account = () => {
    const [users, setUsers] = useState([]);
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [showEditAccount, setShowEditAccount] = useState(false);
    const [showDetailAccount, setShowDetailAccount] = useState(false);
    const [userId, setUserId] = useState();
    const [filterStatus, setFilterStatus] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1,
    });
    const canCreate = usePermission("create_account");
    const canEdit = usePermission("edit_account");
    // const canDelete = usePermission("softDelete_account");
    const canView = usePermission("view_account");
    // lấy danh sách user
    const fetchUsers = async (page = 1) => {
        setLoading(true)
        try {
            const response = await laravelAPI.get('/api/admin/users', {
                params: {
                    page: page,
                    per_page: pagination.per_page,
                    status: filterStatus,
                    search: searchKeyword,
                    sort: sortOption,
                    roleId: filterRole
                },
            });
            // console.log("check tài khoản", response)
            if (response.code === 'success') {
                setUsers(response.data.data);
                setPagination({
                    per_page: response.data.per_page,
                    total: response.data.total,
                    last_page: response.data.last_page,
                });
            } else {
                console.error('Lấy danh sách người dùng thất bại:', response.message);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
        } finally {
            setLoading(false);
        }
    };

    // lấy danh sách vai trò
    const fetchRoles = async () => {
        try {
            const response = await laravelAPI.get("/api/admin/roles");
            // console.log("Roles data:", response);
            if (response.code === "success") {
                setRoles(response.data.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách vai trò:", error);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        fetchUsers(currentPage);
    }, [filterStatus, searchKeyword, sortOption, filterRole, currentPage]);

    // hàm nút update
    const handleEditClick = (userId) => {
        setUserId(userId);
        setShowEditAccount(true);
    };
    // hàm nut detail
    const handleDetailClick = (userId) => {
        setUserId(userId);
        setShowDetailAccount(true);
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };


    // hàm cập nhật trạng thái
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const response = await laravelAPI.patch(`/api/admin/users/${id}/status`, {
                status: !currentStatus
            });

            if (response.code === 'success') {
                toast.success(response.message);
                fetchUsers();
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái:", err);
            toast.error("Cập nhật trạng thái thất bại!");
        }
    };

    // hàm cập nhật vị trí
    const handlePositionChange = async (userId, newPosition) => {
        try {
            const response = await laravelAPI.patch(`/api/admin/users/${userId}/position`, {
                position: parseInt(newPosition),
            });

            if (response.code === 'success') {
                toast.success(response.message);
                fetchUsers();
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật vị trí:", error);
            toast.error("Cập nhật vị trí thất bại!");
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }
    if (!canView) {
        return <p className="text-[28px] font-[700] text-[#FF0000] text-center py-[30px]">Bạn không có quyền truy cập trang này.</p>;
    }
    return (
        <>
            <div className="py-[20px]">
                <h2 className="text-[28px] text-[#000000] font-[700] text-center py-[40px]">
                    Danh sách tài khoản
                </h2>
                <div className="card mb-3">
                    <div className="card-header">
                        <h3 className="text-[20px] font-[700] text-[#00000] py-[10px]">
                            Bộ lọc và tìm kiếm
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="grid grid-cols-4 gap-[10px]">
                            <div className="flex flex-col gap-[10px]">
                                <label className="text-[16px] font-[700] text-[#000000]">Trạng thái</label>
                                <select className="form-control" onChange={(e) => setFilterStatus(e.target.value)}>
                                    <option value="">Tất cả</option>
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Dừng hoạt động</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <label className="text-[16px] font-[700] text-[#000000]">Vị trí</label>
                                <select className="form-control" onChange={(e) => setSortOption(e.target.value)}>
                                    <option value="position-desc">Vị trí giảm dần</option>
                                    <option value="position-asc">Vị trí tăng dần</option>
                                    <option value="title-desc">Tên Z - A</option>
                                    <option value="title-asc">Tên A - Z</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <label className="text-[16px] font-[700] text-[#000000]">Tìm kiếm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm kiếm..."
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && fetchUsers(1)}
                                />
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <label className="text-[16px] font-[700] text-[#000000]">Vai trò</label>
                                <select className="form-control" onChange={(e) => setFilterRole(e.target.value)}>
                                    <option value="">Tất cả</option>
                                    {roles.map(role => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-header">
                        <div className="flex items-center justify-between py-[10px]">
                            <h3 className="text-[20px] text-[#000000] font-[700] ">
                                Danh sách tài khoản
                            </h3>
                            {canCreate && (
                                <button
                                    onClick={() => setShowCreateAccount(true)}
                                    className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main flex items-center gap-[20px]">
                                    <span><FaCirclePlus /></span>
                                    Thêm mới
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="w-full table table-hover table-sm">
                            <thead className="bg-[#EEEEEE]">
                                <tr>
                                    <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                        STT
                                    </td>
                                    <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                        Tên
                                    </td>
                                    <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                        Email
                                    </td>
                                    <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                        Vị trí
                                    </td>
                                    <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                        Vai trò
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
                                {users.map((user, index) => (
                                    <tr className="border-t ">
                                        <th className="!py-[20px] font-[400] text-[16px] text-[400] text-center">
                                            {index + 1 + (currentPage - 1) * 10}
                                        </th>
                                        <th className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                                            {user.fullname}
                                        </th>
                                        <th className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                                            {user.email}
                                        </th>
                                        <th className="!py-[20px] text-center">
                                            {canEdit ? (
                                                <input
                                                    type="number"
                                                    name="position"
                                                    value={user?.position}
                                                    min={1}
                                                    onChange={(e) => handlePositionChange(user?.id, e.target.value)}
                                                    className="w-[80px] border rounded-[12px] py-[4px] text-[16px] font-[400] text-center text-[#000000]"
                                                />
                                            ) : (
                                                <span className="font-[600] text-[16px] text-[#000000]">{user?.position}</span>
                                            )}
                                        </th>
                                        <th className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center w-[400px]">
                                            <div className="flex flex-wrap justify-center gap-[10px]">
                                                {user.roles.map((role, index) => (
                                                    <span key={index} className="py-[5px] px-[12px] bg-[#FF6600] text-[#ffffff] rounded-[8px]">
                                                        {role?.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </th>
                                        <th className="text-center !py-[20px]">
                                            {canEdit ? (
                                                <label className="toggle-switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={user?.status === 1}
                                                        onChange={() => handleToggleStatus(user?.id, user?.status)}
                                                    />
                                                    <div className="toggle-switch-background">
                                                        <div className="toggle-switch-handle"></div>
                                                    </div>
                                                </label>
                                            ) : (
                                                <span
                                                    className={`inline-block px-[12px] py-[6px] rounded-[12px] text-[14px] font-[600] text-[#ffffff] 
                ${user?.status === 1 ? 'bg-[#339900] ' : 'bg-[#FF0000]'}`}>
                                                    {user?.status === 1 ? "Đang hoạt động" : "Không hoạt động"}
                                                </span>
                                            )}
                                        </th>
                                        <th>
                                            <div className="!py-[20px] flex items-center justify-center gap-[6px]">
                                                <button
                                                    onClick={() => handleDetailClick(user.id)}
                                                    className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[12px] py-[8px] px-[12px]"
                                                >
                                                    Chi tiết
                                                </button>
                                                {canEdit && (
                                                    <button
                                                        onClick={() => handleEditClick(user?.id)}
                                                        className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]">
                                                        Sửa
                                                    </button>
                                                )}
                                                {/* <button
                                                className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]"
                                            >
                                                Xóa
                                            </button> */}
                                            </div>
                                        </th>
                                    </tr>
                                ))}
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
                </div>
            </div>
            <CreteAccount
                showCreateAccountModal={showCreateAccount}
                setShowCreateAccountModal={setShowCreateAccount}
                fetchUsers={fetchUsers}
            />
            <EditAccount
                showEditAccountModal={showEditAccount}
                setShowEditAccountModal={setShowEditAccount}
                userId={userId}
                fetchUsers={fetchUsers}
            />
            <DetailAccount
                showDetailAccountModal={showDetailAccount}
                setShowDetailAccountModal={setShowDetailAccount}
                userId={userId}
            />
        </>
    )
}

export default Account;