import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import TextEditor from '../../../components/admin/tinymce/tinymce';
import { laravelAPI } from '../../../utils/axiosCustom';
import { toast } from 'react-toastify';
import uploadToCloudinary from '../../../utils/cloudinaryUpload';


const EditNewsCategory = (props) => {
    const { showEditCategoryModal, setShowEditCategoryModal, fetchNewsCategory, categoryId } = props;
    const [categories, setCategories] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShowEditCategoryModal(false);

    const [formData, setFormData] = useState({
        name: '',
        parentID: '',
        position: '',
        status: '1',
        image: '',
    });

    // danh sách danh mục
    useEffect(() => {
        const fetchCategoriesNews = async () => {
            try {
                const response = await laravelAPI.get("/api/admin/ListCategory-news");
                // console.log("check category list:", response);
                setCategories(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách danh mục:", error);
            }
        };
        fetchCategoriesNews();
    }, []);

    useEffect(() => {
        if (categoryId) {
            fetchCategoryDetails(categoryId);
        }
    }, [categoryId]);

    // chi tiết
    const fetchCategoryDetails = async (id) => {
        try {
            const response = await laravelAPI.get(`/api/admin/newscategories/${id}`);
            // console.log("check detail", response)
            if (response.code === 'success') {
                const category = response.data;
                setFormData({
                    name: category.name,
                    parentID: category.parentID || '',
                    position: category.position || '',
                    status: String(category.status),
                    image: category.image || '',
                });
                setContent(category.description || '');
            }
        } catch (error) {
            console.error("Lỗi khi tải danh mục:", error);
        }
    };

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "status" ? value.toString() : value
        }));
    };

    const handleCategoryImageChange = async (event) => {
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

    // hàm cập nhật
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await laravelAPI.patch(`/api/admin/newscategories/${categoryId}`, {
                name: formData.name,
                parentID: formData.parentID || '',
                position: formData.position || '',
                status: formData.status,
                description: content,
                image: formData.image,
            });
            console.log("check update", response)
            if (response.code === 'success') {
                toast.success(response.message);
                fetchNewsCategory();
                setShowEditCategoryModal(false);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error);
            toast.error("Cập nhật danh mục thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>


            <Modal
                show={showEditCategoryModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleUpdateCategory}>
                    <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Sửa danh mục</h2>
                    <div className='px-[10px] mb-[20px]'>
                        <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Tên danh mục</label>
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
                    <div className='px-[10px] mb-[20px] flex flex-col'>
                        <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Danh mục sản phẩm cha</label>
                        <select
                            value={formData.parentID}
                            onChange={handleChange}
                            name="parentID"
                            id=""
                            className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'>
                            <option value="">Chọn danh mục</option>
                            {categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">Không có danh mục nào</option>
                            )}
                        </select>
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
                            onChange={handleCategoryImageChange}
                        />
                        {formData.image && (
                            <div className="mt-2">
                                <img src={formData.image} alt="Hình ảnh danh mục" className="w-32 h-32 object-cover rounded-md" />
                            </div>
                        )}
                    </div>
                    <div className='px-[10px] mb-[20px]'>
                        <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Mô tả</label>
                        <TextEditor initialValue={content} onChange={setContent} height={600} name="description" />
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
                            className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main' 
                            type='submit'
                            disabled={loading}>
                            {loading ? "Đang xử lý..." : "Cập nhật"}
                        </button>
                    </div>
                </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditNewsCategory;