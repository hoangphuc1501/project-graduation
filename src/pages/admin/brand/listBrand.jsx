import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { laravelAPI } from "../../../utils/axiosCustom";
import CreateBrand from "./createBrand";
import EditBrand from "./editBrand";
import DetailBrand from "./detailBrand";


const ListBrand = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateBrand, setShowCreateBrand] = useState(false);
    const [showDetailBrand, setShowDetailBrand] = useState(false);
    const [brandId, setBrandId] = useState('');
    const [showEditBrand, setShowEditBrand] = useState(false);

    // danh sách thương hiệu
    const fetchBrands = async () => {
        try {
            const response = await laravelAPI.get("/api/admin/brands");
            // console.log("check brand list:", response);
            if (response.code === "success") {
                setBrands(response.data.data || []);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu thương hiệu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    // hàm nút update
    const handleEditClick = (brandId) => {
        setBrandId(brandId);
        setShowEditBrand(true);
    };

    // // show chi tiết
    const handleDetailClick = (brandId) => {
        setBrandId(brandId);
        setShowDetailBrand(true);
    };


    const handleDeleteBrand = async (brandId) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Thương hiệu này sẽ bị chuyển vào thùng rác.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await laravelAPI.patch(`/api/admin/brands/softDelete/${brandId}`);
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Xóa thành công.",
                            icon: "success",
                        });
                        fetchBrands();
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Xóa không thành công.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa thương hiệu:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Xóa không thành công.",
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <div className="py-[60px]">
            <h2 className="text-[28px] font-[700] text-[#00000] text-center pb-[30px]">Quản lý thương hiệu</h2>
            <div className="card mb-3">
                <div className="card-header">
                    <h3 className="text-[20px] font-[700] text-[#00000] py-[10px]">Bộ lọc và tìm kiếm</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-3">
                            <select className="form-control">
                                <option value="">Tất cả</option>
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Dừng hoạt động</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <select className="form-control">
                                <option value="position-desc">Vị trí giảm dần</option>
                                <option value="position-asc">Vị trí tăng dần</option>
                                <option value="title-desc">Tiêu đề từ Z đến A</option>
                                <option value="title-asc">Tiêu đề từ A đến Z</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <input type="text" className="form-control" placeholder="Tìm kiếm..." />
                        </div>
                        <div className="col-3">
                            <form action="/admin/products-category/change-multi" method="POST">
                                <div className="input-group">
                                    <select className="form-control">
                                        <option value="active">Hoạt động</option>
                                        <option value="inactive">Dừng hoạt động</option>
                                        <option value="delete">Xóa</option>
                                    </select>
                                    <div className="input-group-append">
                                        <button 
                                        className="font-[600] text-[16px] text-[#ffffff] py-[8px] px-[20px] rounded-r-[8px] bg-main flex items-center gap-[20px]"
                                        type="submit">Áp dụng</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[20px] font-[700] text-[#00000]">Danh sách thương hiệu</h3>
                        <button
                            onClick={() => setShowCreateBrand(true)}
                            className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main flex items-center gap-[20px] my-[10px]">
                            <span><FaCirclePlus /></span>
                            Thêm mới
                        </button>

                    </div>
                </div>
                <div className="card-body">
                    {loading ? (
                        <p className="text-center text-[16px] font-[600]">Đang tải dữ liệu...</p>
                    ) : (
                        <table className="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th ></th>
                                    <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">STT</th>
                                    <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Hình ảnh</th>
                                    <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Tên thương hiệu</th>
                                    <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Vị trí</th>
                                    <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Trạng thái</th>
                                    <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Tác vụ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {brands.length > 0 ? (
                                    brands.map((brand, index) => (
                                        <tr key={brand.id}>
                                            <td className="!py-[20px]"><input type="checkbox" name="" id="" /></td>
                                            <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center"> {index + 1}</td>
                                            <td className="!py-[20px] flex items-center justify-center">
                                                <img
                                                    src={brand?.image}
                                                    alt={brand?.name}
                                                    className="w-[100px] h-[100px]" />

                                            </td>
                                            <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center"> {brand?.name}</td>
                                            <td className="!py-[20px] text-center">
                                                <input
                                                    type="number"
                                                    name="" id=""
                                                    value={brand?.position}
                                                    min={1}
                                                    className="w-[80px] border rounded-[12px] py-[4px] !border-[#000000] text-[20px] font-[400] text-center text-[#000000]" />
                                            </td>
                                            <td className="!py-[20px] text-center">
                                                <label class="toggle-switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={brand?.status === 1}
                                                        onChange={() => { }}
                                                    />
                                                    <div class="toggle-switch-background">
                                                        <div class="toggle-switch-handle"></div>
                                                    </div>
                                                </label>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center gap-[6px] !py-[20px]">
                                                    <button
                                                        onClick={() => handleDetailClick(brand?.id)}
                                                        className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[12px] py-[8px] px-[12px]">
                                                        Chi tiết</button>
                                                    <button
                                                        onClick={() => handleEditClick(brand?.id)}
                                                        className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]">
                                                        Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBrand(brand?.id)}
                                                        className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]">
                                                        Xóa</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center py-[10px]">
                                            Không có Thương hiệu nào.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <CreateBrand
            showCreatebrandModal={showCreateBrand}
            setShowCreateBrandModal={setShowCreateBrand}
            fetchBrands={fetchBrands}
            />

            <EditBrand
            showEditBrandModal={showEditBrand}
            setShowEditBrandModal={setShowEditBrand}
            fetchBrands={fetchBrands}
            brandId={brandId}
            />

            <DetailBrand
            showDetailBrandModal={showDetailBrand}
            setShowDetailBrandModal={setShowDetailBrand}
            brandId={brandId}
            />
        </div>
    )
}

export default ListBrand