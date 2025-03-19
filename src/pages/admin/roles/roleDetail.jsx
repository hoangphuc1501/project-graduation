import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { laravelAPI } from '../../../utils/axiosCustom';

const RoleDetail = (props) => {
    const { showDetailRoleModal, setShowDetailRoleModal, roleId } = props;
    const [roleName, setRoleName] = useState('');
    const [description, setDescription] = useState('');
    const [permissions, setPermissions] = useState([]);
    const handleClose = () => setShowDetailRoleModal(false);

    useEffect(() => {
        if (roleId) {
            fetchRoleData(roleId);
        }
    }, [roleId]);

    const fetchRoleData = async (id) => {
        try {
            const response = await laravelAPI.get(`/api/admin/roles/${id}`);
            console.log("check detail", response);
            if (response.code === 'success') {
                setRoleName(response.data.name);
                setDescription(response.data.description);
                setPermissions(response.data.permissions); 
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu của vai trò:', error);
        }
    };
    return (
        <>


            <Modal
                show={showDetailRoleModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                <div>
                    <h5 className="font-[700]">Tên vai trò:</h5>
                    <p>{roleName}</p>
                </div>
                <div className="mt-3">
                    <h5 className="font-[700]">Mô tả:</h5>
                    <p>{description}</p>
                </div>
                <div className="mt-3">
                    <h5 className="font-[700]">Các quyền của vai trò:</h5>
                    {permissions.length > 0 ? (
                        <ul>
                            {permissions.map((permission) => (
                                <li key={permission.id}>
                                    {permission.name} 
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Vai trò này chưa được cấp quyền nào.</p>
                    )}
                </div>
            </Modal.Body>
            </Modal>
        </>
    );
}

export default RoleDetail;