import { useEffect, useState } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import CreateModalSize from "../../../components/admin/products/createSizeModal";
import { FaCirclePlus } from "react-icons/fa6";
import EditModalSize from "../../../components/admin/products/editSizeModal";
import Swal from "sweetalert2";


const SizeList = () => {
    const [sizes, setsizes] = useState([]);
    const [showModalSize, setShowModalSize] = useState(false);
    const [showModalEditSize, setShowModalEditSize] = useState(false);
    const [selectedSizeId, setSelectedSizeId] = useState(null);


    useEffect(() => {
        fetchSizes();
    }, []);

    // hàm call api list
    const fetchSizes = async () => {
        try {
            const response = await laravelAPI.get("/api/admin/sizes");
            // console.log(response);
            if (response.code === "success") {
                setsizes(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách kích thước:", error);
        }
    };

    // nút bấm cập nhật
    const handleEditClick = (id) => {
        setSelectedSizeId(id);
        setShowModalEditSize(true);
    };
    // hàm xóa 
    const handleDeleteClick = async (id) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await laravelAPI.patch(`/api/admin/sizes/softDelete/${id}`);
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Xóa thành công!",
                            icon: "success",
                        });
                        fetchSizes();
                    } else {
                        Swal.fire({
                            title: "Lỗi!",
                            text: response.message || "Có lỗi xảy ra khi xóa!",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa:", error);
                    Swal.fire({
                        title: "Lỗi!",
                        text: "Không thể kết nối đến máy chủ.",
                        icon: "error",
                    });
                }
            }
        });
    };
    
    return (
        <div className="py-[20px]">
            <h2 className="text-[28px] text-[#000000] font-[700] text-center py-[40px]">
                Danh sách kích thước
            </h2>
            <div className="flex items-center justify-between py-[10px] mb-[10px]">
                <h3 className="text-[20px] text-[#000000] font-[700] ">
                    Danh sách kích thước
                </h3>

                <button
                    onClick={() => setShowModalSize(true)}
                    className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main my-[20px] flex items-center gap-[20px]">
                    <span><FaCirclePlus /></span>
                    Thêm mới
                </button>
            </div>
            <div className="">
                <table className="w-full">
                    <thead className="bg-[#EEEEEE]">
                        <tr>
                            <td></td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                STT
                            </td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                Tên kích thước
                            </td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                Vị trí
                            </td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                Trạng thái
                            </td>
                            <td className="font-[700] text-[16px] text-[#000000] py-[10px] text-center">
                                Hành động
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {sizes.map((size, index) => (
                            <tr className="border-t " key={size.id}>
                                <th className="py-[10px]">
                                    <input type="checkbox" name="" id="" />{" "}
                                </th>
                                <th className="py-[10px] font-[400] text-[16px] text-[400] text-center">
                                    {index + 1}
                                </th>
                                <th className="py-[10px] font-[600] text-[16px] text-[#000000] text-center">
                                    {size.name}
                                </th>
                                <th className="py-[10px] text-center">
                                    <input
                                        type="number"
                                        name=""
                                        id=""
                                        value={size.position}
                                        min={1}
                                        className="w-[80px] border rounded-[12px] py-[4px] !border-[#000000] text-[20px] font-[400] text-center text-[#000000]"
                                    />
                                </th>
                                <th className="text-center">
                                    <label class="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={size.status === 1}
                                            onChange={() => { }}
                                        />
                                        <div class="toggle-switch-background">
                                            <div class="toggle-switch-handle"></div>
                                        </div>
                                    </label>
                                </th>
                                <th>
                                    <div className="flex items-center justify-center gap-[6px]">
                                        <button
                                            // onClick={() => handleViewProduct(product.id)}
                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[12px] py-[8px] px-[12px]"
                                        >
                                            Chi tiết
                                        </button>
                                        <button
                                            onClick={() => handleEditClick(size.id)}
                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(size.id)}
                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateModalSize
                showCreatesize={showModalSize}
                setShowCreateSize={setShowModalSize}
                refreshSizes={fetchSizes}
            />
            <EditModalSize
                showEditsize={showModalEditSize}
                setShowEditSize={setShowModalEditSize}
                sizeId={selectedSizeId}
                refreshSizes={fetchSizes}
            />
        </div>

    );
};

export default SizeList;
