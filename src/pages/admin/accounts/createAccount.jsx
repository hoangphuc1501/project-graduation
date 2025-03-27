import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { laravelAPI } from '../../../utils/axiosCustom';
import { toast } from 'react-toastify';

const CreteAccount = (props) => {
    const { showCreateAccountModal, setShowCreateAccountModal, fetchUsers } = props;
    const handleClose = () => setShowCreateAccountModal(false);

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        roles: [],
    });

    const [roles, setRoles] = useState([]);

    // Fetch danh sách vai trò
    useEffect(() => {
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
        fetchRoles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (e) => {
        const selectedRoles = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({ ...formData, roles: selectedRoles });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await laravelAPI.post("/api/admin/users", formData);
            // console.log("Register response:", response);
            if (response.code === "success") {
                toast.success(response.message);
                setFormData({
                    fullname: "",
                    email: "",
                    phone: "",
                    password: "",
                    roles: [],
                });
                setShowCreateAccountModal(false);
                fetchUsers();      
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            toast.error("Đăng ký thất bại!");
        }
    };


    return (
        <>

            <Modal
                show={showCreateAccountModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form
                        className='px-[20px]'
                        onSubmit={handleSubmit}>
                        <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Thêm mới tài khoản</h2>

                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Email</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleChange}
                                    className="flex-1 text-[#000000] text-[16px]"
                                />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faEnvelope} />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Họ và tên</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    name="fullname"
                                    className="flex-1 text-[#000000] text-[16px]"
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faUser} />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Số điện thoại</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    name="phone"
                                    className="flex-1 text-[#000000] text-[16px]"
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faPhone} />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mật khẩu</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px] flex gap-x-[20px] items-center mb-[20px]">
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    name="password"
                                    className="flex-1 text-[#000000] text-[16px]"
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon className="text-[#636d77]" icon={faLock} />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Vai trò</label>
                            <select
                                className='border w-full py-[10px] px-[10px] rounded-[10px] text-[16px] font-[400] text-[#000000] outline-none'
                                multiple
                                name="roles"
                                onChange={handleRoleChange}>
                                {roles?.length > 0 ? (
                                    roles?.map((role) => (
                                        <option 
                                        className='py-[10px]'
                                        key={role?.id} 
                                        value={role?.id}>
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
                            className="font-[700] bg-main text-[16px] text-white hover:!text-main w-full py-[12px] rounded-[15px] my-[12px] hover:bg-white border !border-main ">Tạo mới</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreteAccount;