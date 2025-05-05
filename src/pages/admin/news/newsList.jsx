import React, { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { laravelAPI } from "../../../utils/axiosCustom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import CreateNews from "./createNews";
import EditNews from "./editNews";
import DetailNews from "./detailNews";
import { toast } from "react-toastify";
import { usePermission } from "../../../hooks/usePermission";


const NewsList = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateNews, setShowCreateNews] = useState(false);
    const [showEditNews, setShowEditNews] = useState(false);
    const [showDetailNews, setShowDetailNews] = useState(false);
    const [newsId, setNewsId] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [filterFeatured, setFilterFeatured] = useState('');
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1,
    });
    const canCreate = usePermission("create_news");
    const canEdit = usePermission("edit_news");
    const canDelete = usePermission("softDelete_news");
    const canView = usePermission("view_news");

    // fetch lại khi lọc
    useEffect(() => {
        fetchNews(currentPage);
    }, [filterStatus, searchKeyword, filterCategory, sortOption, filterFeatured, currentPage]);

    // show list new
    const fetchNews = async (page = 1) => {
        setLoading(true);
        try {
            const response = await laravelAPI.get(`api/admin/news`, {
                params: {
                    page: page,
                    per_page: pagination.per_page,
                    status: filterStatus,
                    search: searchKeyword,
                    categoryId: filterCategory,
                    sort: sortOption,
                    featured: filterFeatured,
                },
            });
            // console.log("check news list:", response);
            setNews(response.data.data);
            setPagination({
                per_page: response.data.per_page,
                total: response.data.total,
                last_page: response.data.last_page,
            });
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tin tức:", error);
        } finally {
            setLoading(false);
        }
    };

    // danh sách danh mục
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await laravelAPI.get("/api/admin/ListCategory-news");
                setCategories(response.data);
            } catch (error) {
                console.error("Lỗi lấy danh mục:", error);
            }
        };
        fetchCategories();
    }, []);

    // cập nhật
    const handleEditClick = (newsId) => {
        setNewsId(newsId);
        setShowEditNews(true);
    };

    // chi tiết
    const handleDetailClick = (newsId) => {
        setNewsId(newsId);
        setShowDetailNews(true);
    };
    // hàm chia oage
    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };
    // hàm xóa
    const handleDeleteNews = async (newsId) => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Bài viết này sẽ bị chuyển vào thùng rác.",
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
                        `/api/admin/news/softDelete/${newsId}`
                    );
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Xóa thành công.",
                            icon: "success",
                        });
                        fetchNews();
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Xóa không thành công.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa bài viết:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Xóa không thành công.",
                        icon: "error",
                    });
                }
            }
        });
    };


    // hàm cập nhật trạng thái
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const response = await laravelAPI.patch(`/api/admin/news/${id}/status`, {
                status: !currentStatus // đảo trạng thái
            });

            if (response.code === 'success') {
                toast.success(response.message);
                fetchNews();
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái:", err);
            toast.error("Cập nhật trạng thái thất bại!");
        }
    };

    // hàm cập nhật trạng thái nổi bật
    const handleToggleFeature = async (id, currentFeatured) => {
        try {
            const response = await laravelAPI.patch(`/api/admin/news/${id}/featured`, {
                featured: !currentFeatured // đảo trạng thái
            });

            if (response.code === 'success') {
                toast.success(response.message);
                fetchNews();
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái nổi bật:", err);
            toast.error("Cập nhật trạng thái thất bại!");
        }
    };

    // hàm cập nhật vị trí
    const handlePositionChange = async (newsId, newPosition) => {
        try {
            const response = await laravelAPI.patch(`/api/admin/news/${newsId}/position`, {
                position: parseInt(newPosition),
            });

            if (response.code === 'success') {
                toast.success(response.message);
                fetchNews();
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật vị trí:", error);
            toast.error("Cập nhật vị trí thất bại!");
        }
    };

    if (!canView) {
        return <p className="text-[28px] font-[700] text-[#FF0000] text-center py-[30px]">Bạn không có quyền truy cập trang này.</p>;
    }

    return (
        <div className="py-[60px]">
            <h2 className="text-[28px] font-[700] text-[#00000] text-center pb-[30px]">
                Quản lý bài viết
            </h2>
            <div className="card mb-3">
                <div className="card-header">
                    <h3 className="text-[20px] font-[700] text-[#00000] py-[10px]">
                        Bộ lọc và tìm kiếm
                    </h3>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-5 gap-[10px]">
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Trạng thái</label>
                            <select className="form-control" onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="">Tất cả</option>
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Dừng hoạt động</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Trạng thái nổi bật</label>
                            <select className="form-control" onChange={(e) => setFilterFeatured(e.target.value)}>
                                <option value="">Tất cả</option>
                                <option value="yes">Nổi bật</option>
                                <option value="no">Không nổi bật</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Vị trí</label>
                            <select
                                className="form-control"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="position-desc">Vị trí giảm dần</option>
                                <option value="position-asc">Vị trí tăng dần</option>
                                <option value="title-desc">Tiêu đề từ Z đến A</option>
                                <option value="title-asc">Tiêu đề từ A đến Z</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Tìm kiếm</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm..."
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && fetchNews(1)}
                            />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-[16px] font-[700] text-[#000000]">Danh mục</label>
                            <select
                                className="form-control"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="">Tất cả danh mục</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[20px] font-[700] text-[#00000]">
                            Danh sách bài viết
                        </h3>
                        {canCreate && (
                            <button
                                onClick={() => setShowCreateNews(true)}
                                className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main flex items-center gap-[20px] my-[10px]"
                            >
                                <span>
                                    <FaCirclePlus />
                                </span>
                                Thêm mới
                            </button>
                        )}
                    </div>
                </div>
                <div className="card-body">
                    {loading ? (
                        <p className="text-center text-[16px] font-[600]">
                            Đang tải dữ liệu...
                        </p>
                    ) : (
                        <>
                            <table className="table table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            STT
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Hình ảnh
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center w-[30%]">
                                            Tên bài viết
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Vị trí
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center w-[15%]">
                                            Danh mục
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Nổi bật
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Trạng thái
                                        </th>
                                        <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Tác vụ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {news.length > 0 ? (
                                        news.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center">
                                                    {index + 1 + (currentPage - 1) * 10}
                                                </td>
                                                <td className="!py-[20px] flex items-center justify-center">
                                                    <img
                                                        src={item.image || ""}
                                                        alt={item.title}
                                                        className="w-[100px] h-[100px]"
                                                    />
                                                </td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center w-[30%]">
                                                    {item.title}
                                                </td>
                                                <td className="!py-[20px] text-center">
                                                    {canEdit ? (
                                                        <input
                                                            type="number"
                                                            name="position"
                                                            value={item?.position}
                                                            min={1}
                                                            onChange={(e) => handlePositionChange(item?.id, e.target.value)}
                                                            className="w-[80px] border rounded-[12px] py-[4px] text-[16px] font-[400] text-center text-[#000000]"
                                                        />
                                                    ) : (
                                                        <span className="font-[600] text-[16px] text-[#000000]">{item?.position}</span>
                                                    )}
                                                </td>
                                                <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center w-[15%]">
                                                    {item.category?.name || "Không có"}
                                                </td>
                                                <td className="!py-[20px] text-center">
                                                    {canEdit ? (
                                                        <label className="toggle-switch">
                                                            <input
                                                                type="checkbox"
                                                                checked={item?.featured === 1}
                                                                onChange={() => handleToggleFeature(item?.id, item?.featured)}
                                                            />
                                                            <div className="toggle-switch-background">
                                                                <div className="toggle-switch-handle"></div>
                                                            </div>
                                                        </label>
                                                    ) : (
                                                        <span
                                                            className={`inline-block px-[12px] py-[6px] rounded-[12px] text-[14px] font-[600] text-[#ffffff] 
                ${item?.featured === 1 ? 'bg-[#339900] ' : 'bg-[#FF0000]'}`}>
                                                            {item?.featured === 1 ? "Nổi bật" : "Không nổi bật"}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="!py-[20px] text-center">
                                                    {canEdit ? (
                                                        <label className="toggle-switch">
                                                            <input
                                                                type="checkbox"
                                                                checked={item?.status === 1}
                                                                onChange={() => handleToggleStatus(item?.id, item?.status)}
                                                            />
                                                            <div className="toggle-switch-background">
                                                                <div className="toggle-switch-handle"></div>
                                                            </div>
                                                        </label>
                                                    ) : (
                                                        <span
                                                            className={`inline-block px-[12px] py-[6px] rounded-[12px] text-[14px] font-[600] text-[#ffffff] 
                ${item?.status === 1 ? 'bg-[#339900] ' : 'bg-[#FF0000]'}`}>
                                                            {item?.status === 1 ? "Đang hoạt động" : "Không hoạt động"}
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-[6px] !py-[20px]">
                                                        <button
                                                            onClick={() => handleDetailClick(item?.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[12px] py-[8px] px-[12px]"
                                                        >
                                                            Chi tiết
                                                        </button>
                                                        {canEdit && (
                                                            <button
                                                                onClick={() => handleEditClick(item?.id)}
                                                                className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]">
                                                                Sửa
                                                            </button>
                                                        )}
                                                        {canDelete && (
                                                            <button
                                                                onClick={() => handleDeleteNews(item?.id)}
                                                                className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]">
                                                                Xóa
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>

                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center py-3">
                                                Không có bài viết nào.
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
                        </>
                    )}
                </div>
            </div>
            <CreateNews
                showCreateNewsModal={showCreateNews}
                setShowCreateNewsModal={setShowCreateNews}
                fetchNews={fetchNews}
            />
            <EditNews
                showEditNewsModal={showEditNews}
                setShowEditNewsModal={setShowEditNews}
                fetchNews={fetchNews}
                newsId={newsId}
            />
            <DetailNews
                showDetailNewsModal={showDetailNews}
                setShowDetailNewsModal={setShowDetailNews}
                newsId={newsId}
            />
        </div>
    );
}

export default NewsList;