import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import uploadToCloudinary from '../../../utils/cloudinaryUpload';
import { laravelAPI } from '../../../utils/axiosCustom';
import { toast } from 'react-toastify';
import TextEditor from '../../../components/admin/tinymce/tinymce';


const CreateBrand = (props) => {
    const { showCreatebrandModal, setShowCreateBrandModal, fetchBrands } = props;
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShowCreateBrandModal(false);

    const [formData, setFormData] = useState({
        name: '',
        position: '',
        status: '1',
        image: ''
    });

    // Xử lý thay đổi hình ảnh và tải lên Cloudinary
        const handleBrandImageChange = async (event) => {
            const file = event.target.files[0];
            if (!file) return;
            const uploadedImageUrl = await uploadToCloudinary(file);
    
            if (uploadedImageUrl) {
                setFormData((prev) => ({
                    ...prev,
                    image: uploadedImageUrl,
                }));
            }
        };

        // Xử lý thay đổi trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "status" ? value.toString() : value, 
        }));
    };

    // tạo danh mục mới
    const handleCreateBrand = async (e) => {
        e.preventDefault();
        // console.log("Giá trị parentID trước khi gửi API:", formData.parentID);
        try {
            const response = await laravelAPI.post("/api/admin/brands", {
                name: formData.name,
                position: formData.position || '',
                status: formData.status,
                description: content,
                image: formData.image,
            });
            console.log("Tạo thương hiệu thành công:", response);
            if (response.code === 'success') {
                toast.success(response.message);
                fetchBrands();
                setShowCreateBrandModal(false);

                setFormData({
                    name: '',
                    position: '',
                    status: '1',
                    image: ''
                });
                setContent('');
            }
        } catch (error) {
            console.error("Lỗi khi tạo thương hiệu:", error);
            toast.error("Tạo thương hiệu thất bại!")
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Modal
                show={showCreatebrandModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleCreateBrand}>
                        <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Thêm mới thương hiệu</h2>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Tên thương hiệu</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    name='name'
                                    placeholder="Ví dụ: Vợt cầu lông"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Vị trí</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={formData.position}
                                    onChange={handleChange}
                                    type="number"
                                    name='position'
                                    placeholder="Tự Động tăng"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full" />
                            </div>
                        </div>
                        <div className="mb-[20px]">
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Hình ảnh</label>
                            <input
                                className='form-control'
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleBrandImageChange}
                            />
                            {formData.image && (
                                <div className="mt-2">
                                    <img src={formData.image} alt="Hình ảnh danh mục" className="w-32 h-32 object-cover rounded-md" />
                                </div>
                            )}
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mô tả</label>
                            <TextEditor initialValue="" onChange={setContent} height={600} name="description" />
                        </div>
                        <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="statusProductCategory"
                                    value="1"
                                    checked={formData.status === "1"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="statusProductCategory" className='text-[16px] text-[#000000] font-[500]'>Hoạt động</label>
                            </div>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="statusProduct1"
                                    value="0"
                                    checked={formData.status === "0"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="statusProduct1" className='text-[16px] text-[#000000] font-[500]'>Dừng hoạt động</label>
                            </div>
                        </div>
                        <div className=''>
                            <button
                                disabled={loading}
                                className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main' type='submit'>
                                {loading ? "Đang xử lý..." : "Tạo mới"}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateBrand;