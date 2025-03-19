import { FaCirclePlus } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import CreteAccount from "./createAccount";
import EditAccount from "./editAccount";
import DetailAccount from "./detailAccount";

const Account = () => {
    const [users, setUsers] = useState([]);
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [showEditAccount, setShowEditAccount] = useState(false);
    const [showDetailAccount, setShowDetailAccount] = useState(false);
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await laravelAPI.get('/api/admin/users');
            // console.log("check tài khoản", response)
            if (response.code === 'success') {
                setUsers(response.data.data);
            } else {
                console.error('Lấy danh sách người dùng thất bại:', response.message);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className="py-[20px]">
                <h2 className="text-[28px] text-[#000000] font-[700] text-center py-[40px]">
                    Danh sách tài khoản
                </h2>
                <div className="flex items-center justify-between py-[10px] mb-[10px]">
                    <h3 className="text-[20px] text-[#000000] font-[700] ">
                        Danh sách tài khoản
                    </h3>

                    <button
                        onClick={() => setShowCreateAccount(true)}
                        className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main my-[20px] flex items-center gap-[20px]">
                        <span><FaCirclePlus /></span>
                        Thêm mới
                    </button>
                </div>
                <div className="">
                    <table className="w-full">
                        <thead className="bg-[#EEEEEE]">
                            <tr>
                                <td></td>
                                <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                    STT
                                </td>
                                <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                    Tên
                                </td>
                                <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                    Vị trí
                                </td>
                                <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                    Vai trò
                                </td>
                                <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                    Trạng thái
                                </td>
                                <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                    Tác vụ
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr className="border-t ">
                                    <th className="py-[10px]">
                                        <input type="checkbox" name="" id="" />
                                    </th>
                                    <th className="py-[10px] font-[400] text-[16px] text-[400] text-center">
                                        {index + 1}
                                    </th>
                                    <th className="py-[10px] font-[600] text-[16px] text-[#000000] text-center">
                                        {user.fullname}
                                    </th>
                                    <th className="py-[10px] text-center">
                                        <input
                                            type="number"
                                            name=""
                                            id=""
                                            value={user.position}
                                            className="w-[80px] border rounded-[12px] py-[4px] !border-[#000000] text-[20px] font-[400] text-center text-[#000000]"
                                        />
                                    </th>
                                    <th className="py-[10px] font-[600] text-[16px] text-[#000000] text-center w-[400px]">
                                        <div className="flex flex-wrap justify-center gap-[10px]">
                                            {user.roles.map((role, index) => (
                                                <span key={index} className="py-[5px] px-[12px] bg-[#FF6600] text-[#ffffff] rounded-[8px]">
                                                    {role.name}
                                                </span>
                                            ))}
                                        </div>
                                    </th>
                                    <th className="text-center">
                                        <label class="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={user.status === 1}
                                                onChange={() => { }}
                                            />
                                            <div class="toggle-switch-background">
                                                <div class="toggle-switch-handle"></div>
                                            </div>
                                        </label>
                                    </th>
                                    <th>
                                        <div className="flex items-center justify-center gap-[6px]">
                                            <button
                                                onClick={() => handleDetailClick(user.id)}
                                                className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[12px] py-[8px] px-[12px]"
                                            >
                                                Chi tiết
                                            </button>
                                            <button
                                                onClick={() => handleEditClick(user.id)}
                                                className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]"
                                            >
                                                Sửa
                                            </button>
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