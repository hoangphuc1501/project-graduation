import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { laravelAPI } from '../../../utils/axiosCustom';


const DetailNews = (props) => {
    const { showDetailNewsModal, setShowDetailNewsModal, newsId } = props;
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShowDetailNewsModal(false);

    useEffect(() => {
        if (newsId) {
            fetchNewsDetails(newsId);
        }
    }, [newsId]);

    const fetchNewsDetails = async (id) => {
        setLoading(true);
        try {
            const response = await laravelAPI.get(`/api/admin/news/${id}`);
            console.log("check detail", response)
            if (response.code === "success") {
                setNews(response.data);
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
                show={showDetailNewsModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết bài viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p className="text-center">Đang tải...</p>
                    ) : news ? (
                        <div>
                            <p><strong>ID:</strong> {news.id}</p>
                            <p><strong>Tên bài viết:</strong> {news.title}</p>
                            {news.image ? (
                                <img src={news.image} alt={news.name} className="w-32 h-32 object-cover rounded-md" />
                            ) : (
                                <p>Không có hình ảnh</p>
                            )}
                            <p><strong>Tên tác giả:</strong> {news.author}</p>
                            <p><strong>Tên danh mục:</strong> {news.category.name}</p>
                            <p><strong>Trạng thái:</strong> {news.status === 1 ? "Hoạt động" : "Dừng hoạt động"}</p>
                            <p><strong>Nổi bật:</strong> {news.featured === 1 ? "Nổi bật" : "Không nổi bật"}</p>
                            <p><strong>Vị trí:</strong> {news.position}</p>
                            <p><strong>Ngày tạo:</strong>{new Date(news.createdAt).toLocaleString()}</p>
                            <p><strong>Ngày cập nhật:</strong> {new Date(news.updatedAt).toLocaleString()}</p>
                            <p><strong>Slug:</strong> {news.slug}</p>
                            <p><strong>Nội dung:</strong></p>
                            <div dangerouslySetInnerHTML={{ __html: news.content }} />
                            <p><strong>Hình ảnh:</strong></p>
                        </div>
                    ) : (
                        <p>Không tìm thấy bài viết</p>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DetailNews;