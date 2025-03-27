import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { laravelAPI } from "../../../utils/axiosCustom";
import Swal from "sweetalert2";


const TrashBrandList = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1,
    });


    // danh sách thương hiệu
    const fetchTrashBrands = async (page = 1) => {
        setLoading(true);
        try {
            const response = await laravelAPI.get("/api/admin/trash/brands", {
                params: {
                    page: page,
                    per_page: pagination.per_page
                }
            });
            // console.log("check brand list:", response);
            if (response.code === "success") {
                setBrands(response.data.data || []);
                setPagination({
                    per_page: response.data.per_page,
                    total: response.data.total,
                    last_page: response.data.last_page
                });
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu thương hiệu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrashBrands(currentPage);
    }, [currentPage]);

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };

    // /xóa vĩnh viễn
    const handleForceDeleteBrand = async (BrandId) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Thương hiệu này sẽ bị Xóa vĩnh viễn.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await laravelAPI.delete(
                        `/api/admin/brands/${BrandId}`
                    );
                    // console.log("xóa", response)
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Xóa thành công.",
                            icon: "success",
                        });
                        fetchTrashBrands();
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
    // Khôi phục
    const handleRestoreBrand = async (BrandId) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Thương hiệu này sẽ được khôi phục.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await laravelAPI.patch(
                        `/api/admin/brands/restore/${BrandId}`
                    );
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Khôi phục thành công.",
                            icon: "success",
                        });
                        fetchTrashBrands();
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Khôi phục không thành công.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi khôi phục thương hiệu:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Khôi phục không thành công.",
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
                    <div className="flex items-center justify-between">
                        <h3 className="text-[20px] font-[700] text-[#00000]">Danh sách thương hiệu</h3>
                    </div>
                </div>
                <div className="card-body">
                    {loading ? (
                        <p className="text-center text-[16px] font-[600]">Đang tải dữ liệu...</p>
                    ) : (
                        <div>
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
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center"> {index + 1 + (currentPage - 1) * 10}</td>
                                                <td className="!py-[20px] flex items-center justify-center">
                                                    <img
                                                        src={brand?.image}
                                                        alt={brand?.name}
                                                        className="w-[100px] h-[100px]" />

                                                </td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center"> {brand?.name}</td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center"> {brand?.name}</td>
                                                <td className="!py-[20px] text-center">
                                                    <label class="toggle-switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={brand?.status === 1}
                                                        />
                                                        <div class="toggle-switch-background">
                                                            <div class="toggle-switch-handle"></div>
                                                        </div>
                                                    </label>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-[6px] !py-[20px]">

                                                        <button
                                                            onClick={() => handleRestoreBrand(brand?.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]">
                                                            Khôi phục
                                                        </button>
                                                        <button
                                                            onClick={() => handleForceDeleteBrand(brand?.id)}
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
                            <div className="flex items-center justify-center mt-[10px]">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="›"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={1}
                                    pageCount={pagination.last_page}
                                    previousLabel="‹"
                                    forcePage={currentPage - 1}
                                    containerClassName="pagination"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    activeClassName="active"
                                />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default TrashBrandList;