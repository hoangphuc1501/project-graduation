import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { laravelAPI } from '../../../utils/axiosCustom';
import TextEditor from '../../../components/admin/tinymce/tinymce';
import { toast } from 'react-toastify';
import uploadToCloudinary from '../../../utils/cloudinaryUpload';


const EditNews = (props) => {
    const { showEditNewsModal, setShowEditNewsModal, fetchNews, newsId } = props;
    const [categories, setCategories] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        categoriesId: "",
        content: '',
        author: '',
        position: '',
        featured: false,
        status: true,
        image: ''
    });

    const handleClose = () => {
        setShowEditNewsModal(false);
    };

    useEffect(() => {
        if (newsId) {
            fetchNewsDetail(newsId);
        }
    }, [newsId]);

    const fetchNewsDetail = async (id) => {
        try {
            const response = await laravelAPI.get(`/api/admin/news/${id}`);
            // console.log("check detail news",response )
            const data = response.data;
            if (response.code === 'success') {
            setFormData({
                title: data.title,
                newsCategory: data.newsCategory,
                author: data.author,
                position: data.position,
                featured: data.featured === 1 ? true : false,
                status: data.status === 1 ? true : false,
                image: data.image
            });
            setContent(data.content);
        }
        } catch (err) {
            console.error("Lỗi khi load chi tiết bài viết:", err);
            toast.error("Không thể tải dữ liệu bài viết.");
        }
    };

    // // danh sách danh mục
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

    // // Xử lý thay đổi hình ảnh và tải lên Cloudinary
    const handleImageChange = async (event) => {
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
    // // Xử lý thay đổi trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "status" ? value.toString() : value,
        }));
    };

    const handleUpdateNews = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await laravelAPI.put(`/api/admin/news/${newsId}`, {
                title: formData.title,
                content: content,
                image: formData.image,
                author: formData.author,
                position: formData.position || '',
                newsCategory: formData.newsCategory,
                status: formData.status === "1" || formData.status === true,
                featured: formData.featured === "1" || formData.featured === true,
            });

            if (res.code === 'success') {
                toast.success(res.message);
                fetchNews();
                handleClose();
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật bài viết:", err);
            toast.error("Cập nhật bài viết thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <Modal
                show={showEditNewsModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdateNews}>
                        <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Sửa bài viết</h2>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Tên bài viết</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={formData.title}
                                    onChange={handleChange}
                                    type="text"
                                    name='title'
                                    placeholder="Ví dụ: Vợt cầu lông"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="featured"
                                    id="featureNews1"
                                    value="1"
                                    checked={formData.featured === true || formData.featured === "1"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="featureNews1" className='text-[16px] text-[#000000] font-[500]'>Nổi bật</label>
                            </div>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="featured"
                                    id="featureNews"
                                    value="0"
                                    checked={formData.featured === false || formData.featured === "0"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="featureNews" className='text-[16px] text-[#000000] font-[500]'>Không nổi bật</label>
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px] flex flex-col'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]'>Danh mục bài viết</label>
                            <select
                                name="newsCategory"
                                value={formData.newsCategory}
                                onChange={handleChange}
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
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Tên tác giả</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={formData.author}
                                    onChange={handleChange}
                                    type="text"
                                    name="author"
                                    placeholder="Ví dụ: Phúc"
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
                                    name="position"
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
                                onChange={handleImageChange}
                            />
                            {formData.image && (
                                <div className="mt-2">
                                    <img src={formData.image} alt="Hình ảnh bài viết" className="w-32 h-32 object-cover rounded-md" />
                                </div>
                            )}
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Nội dung</label>
                            <TextEditor initialValue={content} onChange={setContent} height={400} name="content" />
                        </div>
                        <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="newsStatus"
                                    value="1"
                                    checked={formData.status === true || formData.status === "1"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="newsStatus" className='text-[16px] text-[#000000] font-[500]'>Hoạt động</label>
                            </div>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="newsStatus1"
                                    value="0"
                                    checked={formData.status === false || formData.status === "0"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="newsStatus1" className='text-[16px] text-[#000000] font-[500]'>Dừng hoạt động</label>
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

export default EditNews;