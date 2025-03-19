import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import TextEditor from '../../../components/admin/tinymce/tinymce';
import { laravelAPI } from '../../../utils/axiosCustom';
import { toast } from 'react-toastify';


const CreatePermission = (props) => {
    const { showCreatePermissionModal, setShowCreatePermissionModal, fetchPermissions } = props;
    const [permissionName, setPermissionName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [module, setModule] = useState("");
    const [slug, setSlug] = useState("");
    const handleClose = () => setShowCreatePermissionModal(false);

    // Hàm gọi API để tạo vai trò mới
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await laravelAPI.post('/api/admin/permissions', {
                name: permissionName,
                description: description,
                module: module,
                slug: slug,
            });
            // console.log("check thêm permission", response)
            if (response.code === 'success') {
                toast.success(response.message);
                setShowCreatePermissionModal(false);
                fetchPermissions()

                // Reset form
                setPermissionName('');
                setDescription('');
                setModule('');
                setSlug('');
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
                show={showCreatePermissionModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Thêm mới quyền</h2>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Tên quyền</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={permissionName}
                                    onChange={(e) => setPermissionName(e.target.value)}
                                    type="text"
                                    name='title'
                                    placeholder="Ví dụ: Thêm sản phẩm"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Slug</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    type="text"
                                    name='title'
                                    placeholder="Ví dụ: create_product"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Nhóm quyền</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={module}
                                    onChange={(e) => setModule(e.target.value)}
                                    type="text"
                                    name='title'
                                    placeholder="Ví dụ: Sản phẩm"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mô tả</label>
                            <TextEditor initialValue="" onChange={setDescription} height={300} name="description" />
                        </div>
                        <div className=''>
                            <button
                                disabled={loading}
                                className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main'
                                type='submit'>
                                {loading ? 'Đang tạo quyền...' : 'Tạo mới'}
                            </button>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default CreatePermission;