import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { laravelAPI } from '../../../utils/axiosCustom';

const DetailAccount = (props) => {
    const { showDetailAccountModal, setShowDetailAccountModal, userId } = props;
    const [user, setUser] = useState(null);
    const handleClose = () => setShowDetailAccountModal(false);

    useEffect(() => {
        if (userId) {
            const fetchUserDetails = async () => {
                try {
                    const response = await laravelAPI.get(`/api/admin/users/${userId}`);
                    // console.log("User Details:", response);

                    if (response.code === "success") {
                        setUser(response.user);
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
            fetchUserDetails();
        }
    }, [userId]);
    return (
        <>

            <Modal
                show={showDetailAccountModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Chi tiết tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {user ? (
                    <div className="p-4">
                        <p><strong>Họ và Tên:</strong> {user.fullname}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Số điện thoại:</strong> {user.phone}</p>
                        <p><strong>Địa chỉ:</strong> {user.address || "Chưa cập nhật"}</p>
                        <p><strong>Ngày sinh:</strong> {user.birthday || "Chưa cập nhật"}</p>
                        <p><strong>Giới tính:</strong> {user.gender === 1 ? "Nam" : "Nữ"}</p>
                        <p><strong>Trạng thái:</strong> {user.status === 1 ? "Hoạt động" : "Không hoạt động"}</p>
                        <p><strong>Vị trí:</strong> {user.position}</p>
                        <p><strong>Ngày tạo:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                        <p><strong>Ngày cập nhật:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
                        <p><strong>Vai trò:</strong> {user.roles.map(role => role.name).join(", ") || "Không có vai trò"}</p>
                    </div>
                ) : (
                    <p>Đang tải thông tin...</p>
                )}
                </Modal.Body>

            </Modal>
        </>
    );
}

export default DetailAccount;