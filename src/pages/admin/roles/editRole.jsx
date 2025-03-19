import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import TextEditor from '../../../components/admin/tinymce/tinymce';
import { laravelAPI } from '../../../utils/axiosCustom';
import { toast } from 'react-toastify';


const EditRole = (props) => {
    const { showEditRoleModal, setShowEditRoleModal, fetchRoles, roleId } = props;
    const [roleName, setRoleName] = useState('');
    const [description, setDescription] = useState('');
    const [permissions, setPermissions] = useState({});
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShowEditRoleModal(false);

    // Hàm gọi API để lấy thông tin vai trò khi mở modal
    useEffect(() => {
        if (roleId) {
            fetchRoleData(roleId);
        }
    }, [roleId]);

    const fetchRoleData = async (id) => {
        try {
            const response = await laravelAPI.get(`/api/admin/roles/${id}`);
            console.log("check detail", response)
            if (response.code === 'success') {
                setRoleName(response.data.name);
                setDescription(response.data.description);
                if (response.data.permissions && Array.isArray(response.data.permissions)) {
                    setSelectedPermissions(response.data.permissions.map(p => p.id)); // Gán quyền đã chọn
                }

            }
            const permissionResponse = await laravelAPI.get('/api/admin/permissions');
            console.log("check permission list", permissionResponse);
            if (permissionResponse.code === 'success') {
                setPermissions(permissionResponse.data);
            }

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu của vai trò:', error);
        }
    };

    const handlePermissionChange = (permissionId) => {
        setSelectedPermissions((prevSelectedPermissions) => {
            if (prevSelectedPermissions.includes(permissionId)) {
                return prevSelectedPermissions.filter((id) => id !== permissionId); // Bỏ chọn
            } else {
                return [...prevSelectedPermissions, permissionId]; // Chọn
            }
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await laravelAPI.patch(`/api/admin/roles/${roleId}`, {
                name: roleName,
                description: description,
                permissions: selectedPermissions,
            });
            // console.log("check cập nhật", response)
            if (response.code === 'success') {
                toast.success(response.message);
                setShowEditRoleModal(false);
                fetchRoles();
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật vai trò:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                show={showEditRoleModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Thêm mới vai trò</h2>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Tên vai trò</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                    type="text"
                                    name='roleName'
                                    placeholder="Tên vai trò"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mô tả</label>
                            <TextEditor initialValue={description} onChange={setDescription} height={300} name="description" />
                        </div>
                        <div>
                            <h4 className="font-[700]">Vai trò này có quyền gì?</h4>
                            <p>Chọn vào module hoặc các hành động dưới đây để chọn quyền.</p>
                        </div>

                        {/* Hiển thị các quyền */}
                        {Object.keys(permissions).length > 0 ? (
                        Object.keys(permissions).map((moduleName) => (
                            <div key={moduleName}>
                                <h5 className="font-[700]">{moduleName}</h5>
                                {permissions[moduleName].map((permission) => (
                                    <div key={permission.id} className="mb-3">
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={permission.id}
                                                checked={selectedPermissions.includes(permission.id)}
                                                onChange={() => handlePermissionChange(permission.id)}
                                            />
                                            {permission.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>Không có quyền nào để chọn.</p>
                    )}
                        <div className=''>
                            <button
                                disabled={loading}
                                className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main'
                                type='submit'>
                                {loading ? 'Đang cập nhật...' : 'Cập nhật'}
                            </button>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default EditRole;