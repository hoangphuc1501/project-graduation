import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { laravelAPI } from '../../../utils/axiosCustom';
import { toast } from 'react-toastify';


const EditModalSize = (props) => {
    const { showEditsize, setShowEditSize, sizeId, refreshSizes  } = props;
    const handleClose = () => setShowEditSize(false);

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState(1);

    useEffect(() => {
        if (showEditsize && sizeId) {
            fetchSizeDetails(sizeId);
        }
    }, [showEditsize, sizeId]); 

    const fetchSizeDetails = async (id) => {
        try {
            const response = await laravelAPI.get(`/api/admin/sizes/${id}`);
            const { name, position, status } = response.data;
            setName(name);
            setPosition(position || "");
            setStatus(status);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleUpdateSize = async (e) => {
        e.preventDefault();

        try {
            const response = await laravelAPI.patch(`/api/admin/sizes/${sizeId}`, {
                name,
                position: position || null,
                status,
            });
            toast.success(response.message);
            refreshSizes();
            handleClose();
        } catch (error) {
            console.error("Lỗi cập nhật kích thước:", error);
            toast.error(error.response?.message || "Có lỗi xảy ra!");
        } 
    };
    return (
        <>

            <Modal
                show={showEditsize}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdateSize}>
                        <h2 className='text-[24px] text-[#000000] font-[700] text-center pb-[20px]'>Thêm mới Kích thước</h2>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Tên kích thước</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    name='title'
                                    placeholder="Tên kích thước"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent  w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px]'>
                            <label className='text-[18px] text-[#000000] font-[700] pb-[8px]' >Vị trí</label>
                            <div className="border border-[#b3b3b3] px-[20px] py-[15px] rounded-[25px]">
                                <input
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    type="number"
                                    name='position'
                                    placeholder="Tự Động tăng"
                                    className="flex-1 text-[#000000] text-[16px] font-[400] bg-transparent w-full" />
                            </div>
                        </div>
                        <div className='px-[10px] mb-[20px] flex items-center gap-[40px]'>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="statusProduct"
                                    checked={status === 1}
                                    onChange={() => setStatus(1)}
                                />
                                <label htmlFor="statusProduct" className='text-[16px] text-[#000000] font-[500]'>Hoạt động</label>
                            </div>
                            <div className='flex items-center gap-[8px]'>
                                <input
                                    type="radio"
                                    name="status"
                                    id="statusProduct1"
                                    checked={status === 0}
                                    onChange={() => setStatus(0)}
                                />
                                <label htmlFor="statusProduct1" className='text-[16px] text-[#000000] font-[500]'>Dừng hoạt động</label>
                            </div>
                        </div>
                        <div className=''>
                            <button className='text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main' type='submit'>Cập nhật</button>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditModalSize;