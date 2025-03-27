import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { laravelAPI } from '../../../utils/axiosCustom';
import { toast } from 'react-toastify';

const EditAccount = (props) => {
    const { showEditAccountModal, setShowEditAccountModal, fetchUsers, userId } = props;
    const [roles, setRoles] = useState([]);
    const handleClose = () => setShowEditAccountModal(false);
    const [formData, setFormData] = useState({
        email: "",
        roles: [],
    });
    // Fetch danh sách vai trò
    useEffect(() => {
        if (userId) {
            const fetchUserData = async () => {
                try {
                    const userResponse = await laravelAPI.get(`/api/admin/users/${userId}`);
                    // console.log("check user detail", userResponse)
                    if (userResponse.code === "success") {
                        const userData = userResponse.user;
                        setFormData({
                            email: userData.email, 
                            roles: userData.roles.map(role => role.id), // Lấy danh sách ID role
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy thông tin user:", error);
                }
            };

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

            fetchUserData();
            fetchRoles();
        }
    }, [userId])

// Xử lý chọn vai trò
    const handleRoleChange = (e) => {
        const selectedRoles = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({ ...formData, roles: selectedRoles });
    };

    // Gửi API cập nhật
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await laravelAPI.patch(`/api/admin/users/${userId}`, formData);
            if (response.code === "success") {
                toast.success(response.message);
                fetchUsers(); 
                handleClose(); 
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Lỗi cập nhật user:", error);
            toast.error("Cập nhật thất bại!");
        }
    };
    return (
        <>

            <Modal
                show={showEditAccountModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form
                    onSubmit={handleSubmit}
                        className='px-[20px]'
                    >
                        <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Cập nhật tài khoản</h2>

                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Email</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                readOnly
                                    className="flex-1 text-[#000000] text-[16px]"
                                />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faEnvelope} />
                            </div>
                        </div>

                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Vai trò</label>
                            <select
                                className='border w-full py-[10px] px-[10px] rounded-[10px] text-[16px] font-[400] text-[#000000] outline-none'
                                multiple
                                name="roles"
                                onChange={handleRoleChange}
                                value={formData.roles}>
                                {roles?.length > 0 ? (
                                    roles?.map((role) => (
                                        <option
                                        className='py-[10px]'
                                        key={role?.id} value={role?.id}>
                                            {role?.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Không có vai trò nào</option>
                                )}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="font-[700] bg-main text-[16px] text-white hover:!text-main w-full py-[12px] rounded-[15px] my-[12px] hover:bg-white border !border-main ">Cập nhật</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditAccount;