import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import TextEditor from '../../../components/admin/tinymce/tinymce';
import { laravelAPI } from '../../../utils/axiosCustom';
import { toast } from 'react-toastify';


const CreateRole = (props) => {
    const { showCreateRoleModal, setShowCreateRoleModal, fetchRoles } = props;
    const [roleName, setRoleName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState({});
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const handleClose = () => setShowCreateRoleModal(false);

    // Hàm gọi API để lấy danh sách quyền (permissions)
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await laravelAPI.get('/api/admin/permissionGetAll');
                // console.log('Permissions data:', response);
                if (response.code === 'success') {
                    setPermissions(response.data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách quyền:', error);
            }
        };
        fetchPermissions();
    }, []);

    const handlePermissionChange = (permissionId) => {
        setSelectedPermissions((prevSelectedPermissions) => {
            if (prevSelectedPermissions.includes(permissionId)) {
                return prevSelectedPermissions.filter((id) => id !== permissionId); // Bỏ chọn
            } else {
                return [...prevSelectedPermissions, permissionId]; // Chọn
            }
        });
    };

    // Hàm gọi API để tạo vai trò mới
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await laravelAPI.post('/api/admin/roles', {
                name: roleName,
                description: description,
                permissions: selectedPermissions,
            });
            // console.log("check thêm role", response)
            if (response.code === 'success') {
                toast.success(response.message);
                setShowCreateRoleModal(false);
                fetchRoles()

                // Reset form
                setRoleName('');
                setDescription('');
                setSelectedPermissions([]);
            }
        } catch (error) {
            console.error('Lỗi khi thêm vai trò:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                show={showCreateRoleModal}
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
                                    name='title'
                                    placeholder="Tên vai trò"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mô tả</label>
                            <TextEditor initialValue="" onChange={setDescription} height={300} name="description" />
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <h4 className="text-[16px] text-[#000000] font-[700] pb-[8px]">Vai trò này có quyền gì?</h4>
                            <p className='text-[16px] text-[#000000] font-[400]'>Chọn vào module hoặc các hành động dưới đây để chọn quyền.</p>
                        </div>

                        {/* Lặp qua các module */}
                        {Object.keys(permissions).map((moduleName) => (
                            <div key={moduleName} className='card mb-[20px] px-[20px] py-[20px] rounded-[10px]'>
                                <h5 className="text-[16px] text-[#000000] font-[700] pb-[8px]">{moduleName}</h5>
                                <div className="flex items-center gap-[30px] flex-wrap">
                                    {permissions[moduleName].map((permission) => (
                                        <div key={permission.id} >
                                            <label className='flex items-center gap-[6px] py-[4px]'>
                                                <input
                                                    type="checkbox"
                                                    value={permission.id}
                                                    checked={selectedPermissions.includes(permission.id)}
                                                    onChange={() => handlePermissionChange(permission.id)}
                                                />
                                                <span className='text-[16px] text-[#000000] font-[400] cursor-pointer'>{permission.name}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className=''>
                            <button
                                disabled={loading}
                                className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main'
                                type='submit'>
                                {loading ? 'Đang tạo vai trò...' : 'Tạo mới'}
                            </button>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default CreateRole;