import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { laravelAPI } from '../../../utils/axiosCustom';
import { toast } from 'react-toastify';


const EditVoucher = (props) => {
    const { showEditVoucherModal, setShowEditVoucherModal, fetchVouchers, voucherId } = props;
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        discountType: 1,
        discountValue: "",
        description: "",
        status: "active",
        minOrderValue: "",
        maxOrderValue: "",
        maxDiscount: "",
        startDate: "",
        endDate: "",
        usageLimit: ""
    });

    useEffect(() => {
        if (voucherId) {
            fetchVoucherDetail(voucherId);
        }
    }, [voucherId]);

    const fetchVoucherDetail = async (id) => {
        try {
            const response = await laravelAPI.get(`/api/admin/vouchers/${id}`);
            console.log("check voucher detail", response)
            if (response.code === 'success') {
                const data = response.data;

                // Chuyển đổi định dạng ngày tháng
                const formatDateTime = (dateString) => {
                    return dateString ? dateString.slice(0, 16) : "";
                };

                setFormData({
                    ...data,
                    startDate: formatDateTime(data.startDate),
                    endDate: formatDateTime(data.endDate),
                });

            }
        } catch (error) {
            console.error("Lỗi khi tải voucher:", error);
        } finally {
            setLoading(false);
        }
    };

    const [loading, setLoading] = useState(false);
    const handleClose = () => setShowEditVoucherModal(false);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Gửi API cập nhật voucher
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await laravelAPI.patch(`/api/admin/vouchers/${voucherId}`, formData);
            console.log("check edit voucher", response)
            if (response.code === 'success') {
                toast.success(response.message);
                fetchVouchers();
                setShowEditVoucherModal(false);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật voucher:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Modal
                show={showEditVoucherModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Thêm mới mã khuyến mãi</h2>
                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Tên mã giảm giá:</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: giảm giá 10%"
                                    required
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full"
                                />
                            </div>
                        </div>
                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Mã giảm giá:</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: SMPDISCOUNT10"
                                    required
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full"
                                />
                            </div>
                        </div>

                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Loại giảm giá:</label>
                            <select
                                name="discountType"
                                value={formData.discountType}
                                onChange={handleChange}
                                className='w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]'
                            >
                                <option value={1}>Giảm theo %</option>
                                <option value={2}>Giảm theo số tiền</option>
                            </select>
                        </div>
                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Giá trị giảm:</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    type="number"
                                    name="discountValue"
                                    value={formData.discountValue}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ví dụ: 10"
                                    min={1}
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full"
                                />
                            </div>
                        </div>

                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Mô tả:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                placeholder='Nội dung'
                                onChange={handleChange}
                                className="w-full h-[150px] border rounded-[10px] px-[10px] py-[10px] outline-none text-[#000000] text-[16px] font-[400]"
                            ></textarea>
                        </div>

                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Trạng thái:</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full h-[50px] border outline-none px-[20px] rounded-[25px] text-[#000000] text-[16px] font-[500]"
                            >
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Dừng hoạt động</option>
                            </select>
                        </div>

                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Giá trị đơn hàng tối thiểu:</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    type="number"
                                    name="minOrderValue"
                                    value={formData.minOrderValue}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: 100000"
                                    min={1}
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full"
                                />
                            </div>
                        </div>

                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Giá trị đơn hàng tối đa:</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    type="number"
                                    name="maxOrderValue"
                                    value={formData.maxOrderValue}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: 200000"
                                    min={1}
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full"
                                />
                            </div>
                        </div>

                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Mức giảm tối đa:</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    type="number"
                                    name="maxDiscount"
                                    value={formData.maxDiscount}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: 200000"
                                    min={1}
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full"
                                />
                            </div>
                        </div>

                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Ngày bắt đầu:</label>
                            <input
                                type="datetime-local"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-[10px] px-[20px] py-[15px] text-[#000000] text-[16px] font-[400]"
                            />
                        </div>

                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Ngày hết hạn:</label>
                            <input
                                type="datetime-local"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-[10px] px-[20px] py-[15px] text-[#000000] text-[16px] font-[400]"
                            />
                        </div>

                        <div className="px-[10px] mb-[20px]">
                            <label className="text-[18px] text-[#000000] font-[700] pb-[8px]">Giới hạn số lần sử dụng:</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    type="number"
                                    name="usageLimit"
                                    value={formData.usageLimit}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: 100"
                                    min={1}
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main'
                        >
                            {loading ? "Đang cập nhật..." : "Cập nhật"}
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default EditVoucher;