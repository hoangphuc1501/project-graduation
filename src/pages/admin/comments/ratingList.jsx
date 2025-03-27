import { useEffect, useState } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const RatingList = () => {
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1
    });

    useEffect(() => {
        fetchRatings(currentPage);
    }, [currentPage, searchKeyword]);

    const fetchRatings = async (page = 1) => {
        try {
            setLoading(true);
            const response = await laravelAPI.get("/api/admin/ratings", {
                params: {
                    page,
                    per_page: pagination.per_page,
                    search: searchKeyword
                }
            });
            // console.log("check list comment", response)
            if (response.code === "success") {
                setRatings(response.data.data);
                setPagination({
                    per_page: response.data.per_page,
                    total: response.data.total,
                    last_page: response.data.last_page
                });
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    // hàm xóa
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Đánh giá này sẽ bị xóa vĩnh viễn!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await laravelAPI.delete(`/api/admin/ratings/${id}`);

                    if (response.code === "success") {
                        Swal.fire({
                            title: "Đã xóa!",
                            text: "Đánh giá đã được xóa thành công.",
                            icon: "success"
                        });

                        fetchRatings();
                    } else {
                        Swal.fire({
                            title: "Lỗi!",
                            text: "Không thể xóa đánh giá. Vui lòng thử lại!",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa đánh giá:", error);
                    Swal.fire({
                        title: "Lỗi!",
                        text: "Có lỗi xảy ra, vui lòng thử lại!",
                        icon: "error"
                    });
                }
            }
        });
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };

    return (
        <div className="py-[60px]">
            <h2 className="text-[28px] font-[700] text-[#00000] text-center pb-[30px]">Quản lý đánh giá</h2>
            <div className="card mb-3">
                <div className="card-header">
                    <h3 className="text-[20px] font-[700] text-[#00000] py-[10px]">
                        Tìm kiếm
                    </h3>
                </div>
                <div className="card-body">
                    <div className="">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm..."
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && fetchRatings(1)}
                        />
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body">
                    {loading ? (
                        <p className="text-center text-[16px] font-[600]">Đang tải dữ liệu...</p>
                    ) : (
                        <>
                            <table className="table table-hover table-sm">
                            <thead className="bg-[#EEEEEE]">
                                    <tr>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">STT</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center w-[30%]">Tên sản phẩm</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Tên khách hàng</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Số sao</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Nội dung</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Thời gian bình luận</th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Tác vụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ratings.length > 0 ? (
                                        ratings.map((rating, index) => (
                                            <tr key={rating.id}>
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center">{index + 1 + (currentPage - 1) * 10}</td>
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center w-[30%]">{rating.product?.title || "Không xác định"}</td>
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center">{rating.user?.fullname || "Không xác định"}</td>
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center">{rating.star}</td>
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center">{rating.content}</td>
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center">{new Date(rating.createdAt).toLocaleString()}</td>
                                                <td className="flex items-center justify-center gap-[6px] !py-[20px]">
                                                    <div className="">
                                                        <button
                                                            onClick={() => handleDelete(rating.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]">
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4 text-[16px] font-[600]">Không có đánh giá nào.</td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                            <div className="flex items-center justify-center mt-[20px]">
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
                        </>
                    )}
                </div>
            </div>
        </div>
    )

}

export default RatingList;