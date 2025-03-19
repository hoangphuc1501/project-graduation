import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { laravelAPI } from '../../../utils/axiosCustom';


const DetailBrand = (props) => {
    const { showDetailBrandModal, setShowDetailBrandModal, brandId } = props;
    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShowDetailBrandModal(false);

    useEffect(() => {
        if (brandId) {
            fetchBrandDetail(brandId);
        }
    }, [brandId]);

    const fetchBrandDetail = async (id) => {
        setLoading(true);
        try {
            const response = await laravelAPI.get(`/api/admin/brands/${id}`);
            if (response.code === "success") {
                setBrand(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin thương hiệu:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Modal
                show={showDetailBrandModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Chi tiết thương hiệu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {loading ? (
                    <p className="text-center">Đang tải...</p>
                ) : brand ? (
                    <div>
                        <p><strong>ID:</strong> {brand.id}</p>
                        <p><strong>Tên thương hiệu:</strong> {brand.name}</p>
                        <p><strong>Trạng thái:</strong> {brand.status === "1" ? "Hoạt động" : "Dừng hoạt động"}</p>
                        <p><strong>Vị trí:</strong> {brand.position}</p>
                        <p><strong>Slug:</strong> {brand.slug}</p>
                        <p><strong>Mô tả:</strong></p>
                        <div dangerouslySetInnerHTML={{ __html: brand.description }} />
                        <p><strong>Hình ảnh:</strong></p>
                        {brand.image ? (
                            <img src={brand.image} alt={brand.name} className="w-32 h-32 object-cover rounded-md" />
                        ) : (
                            <p>Không có hình ảnh</p>
                        )}
                    </div>
                ) : (
                    <p>Không tìm thấy thương hiệu</p>
                )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DetailBrand;