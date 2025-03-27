import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { laravelAPI } from '../../../utils/axiosCustom';

const DetailVoucher = (props) => {
    const { showDetailVoucherModal, setShowDetailVoucherModal, voucherId } = props;
    const [voucher, setVoucher] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShowDetailVoucherModal(false);


    useEffect(() => {
        if (voucherId) {
            fetchVoucherDetail(voucherId);
        }
    }, [voucherId]);

    const fetchVoucherDetail = async (id) => {
        setLoading(true);
        try {
            const response = await laravelAPI.get(`/api/admin/vouchers/${id}`);
            // console.log("check voucher detail", response)
            if (response.code === 'success') {
                setVoucher(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết voucher:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Modal
                show={showDetailVoucherModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Chi tiết mã khuyến mãi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {loading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : voucher ? (
                    <div className="space-y-2">
                        <p><strong>Tên mã:</strong> {voucher?.name}</p>
                        <p><strong>Mã:</strong> {voucher?.code}</p>
                        <p><strong>Loại giảm giá:</strong> {voucher?.discountType === 1 ? "Giảm %" : "Giảm tiền"}</p>
                        <p><strong>Giá trị giảm:</strong> {voucher?.discountValue.toLocaleString()}</p>
                        <p><strong>Mô tả:</strong> {voucher?.description}</p>
                        <p><strong>Trạng thái:</strong> {voucher?.status === "active" ? "Hoạt động" : "Dừng hoạt động"}</p>
                        <p><strong>Đơn hàng tối thiểu:</strong> {voucher?.minOrderValue?.toLocaleString()}</p>
                        <p><strong>Đơn hàng tối đa:</strong> {voucher?.maxOrderValue?.toLocaleString()}</p>
                        <p><strong>Giảm tối đa:</strong> {voucher?.maxDiscount?.toLocaleString()}</p>
                        <p><strong>Ngày bắt đầu:</strong> {new Date(voucher?.startDate).toLocaleString()}</p>
                        <p><strong>Ngày kết thúc:</strong> {new Date(voucher?.endDate).toLocaleString()}</p>
                        <p><strong>Số lần sử dụng:</strong> {voucher?.numberOfUses}/{voucher?.usageLimit}</p>
                    </div>
                ) : (
                    <p>Không tìm thấy voucher.</p>
                )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DetailVoucher;