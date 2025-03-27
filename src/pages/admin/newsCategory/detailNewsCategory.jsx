import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { laravelAPI } from '../../../utils/axiosCustom';


const DetailNewsCategory = (props) => {
    const { showDetailCategoryModal, setShowDetailCategoryModal, categoryId } = props;
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShowDetailCategoryModal(false);

    useEffect(() => {
        if (categoryId) {
            fetchCategoryDetails(categoryId);
        }
    }, [categoryId]);

    const fetchCategoryDetails = async (id) => {
        setLoading(true);
        try {
            const response = await laravelAPI.get(`/api/admin/newscategories/${id}`);
            //  console.log("check voucher detail", response)
            if (response.code === "success") {
                setCategory(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin danh mục:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Modal
                show={showDetailCategoryModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Chi tiết danh mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {loading ? (
                    <p className="text-center">Đang tải...</p>
                ) : category ? (
                    <div>
                        <p><strong>ID:</strong> {category.id}</p>
                        <p><strong>Tên danh mục:</strong> {category.name}</p>
                        <p><strong>Trạng thái:</strong> {category.status === 1 ? "Hoạt động" : "Dừng hoạt động"}</p>
                        <p><strong>Vị trí:</strong> {category.position}</p>
                        <p><strong>Slug:</strong> {category.slug}</p>
                        <p><strong>Mô tả:</strong></p>
                        <div dangerouslySetInnerHTML={{ __html: category.description }} />
                        <p><strong>Hình ảnh:</strong></p>
                        {category.image ? (
                            <img src={category.image} alt={category.name} className="w-32 h-32 object-cover rounded-md" />
                        ) : (
                            <p>Không có hình ảnh</p>
                        )}
                    </div>
                ) : (
                    <p>Không tìm thấy danh mục</p>
                )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DetailNewsCategory;