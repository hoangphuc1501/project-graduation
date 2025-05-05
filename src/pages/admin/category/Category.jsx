import React, { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { laravelAPI } from "../../../utils/axiosCustom";
import CreateCategory from "./createCategory";
import EditCategory from "./editCategory";
import Swal from "sweetalert2";
import DetailCategory from "./detailCategory";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { usePermission } from "../../../hooks/usePermission";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showDetailCategory, setShowDetailCategory] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOption, setSortOption] = useState('position-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    per_page: 10,
    total: 0,
    last_page: 1,
  });
  const canCreate = usePermission("create_productCategory");
  const canEdit = usePermission("edit_productCategory");
  const canDelete = usePermission("softDelete_productCategory");
  const canView = usePermission("view_productCategory");

  // danh sách danh mục
  const fetchProductCategory = async (page = 1) => {
    setLoading(true);
    try {
      const response = await laravelAPI.get("/api/admin/productcategories", {
        params: {
          page: page,
          per_page: pagination.per_page,
          status: filterStatus,
          search: searchKeyword,
          sort: sortOption,
        },
      });
      // console.log("check category list:", response);
      if (response.code === "success") {
        setCategories(response.data.data || []);
        setPagination({
          per_page: response.data.per_page,
          total: response.data.total,
          last_page: response.data.last_page,
        });
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu danh mục sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductCategory(currentPage);
  }, [filterStatus, searchKeyword, sortOption, currentPage]);

  // hàm nút update
  const handleEditClick = (categoryId) => {
    setCategoryId(categoryId);
    setShowEditCategory(true);
  };

  // show chi tiết
  const handleDetailClick = (categoryId) => {
    setCategoryId(categoryId);
    setShowDetailCategory(true);
  };
  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // react-paginate bắt đầu từ 0
    setCurrentPage(selectedPage);
  };

  const handleDeleteCategory = async (categoryId) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Danh mục này sẽ bị chuyển vào thùng rác.",
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
            `/api/admin/productcategories/softDelete/${categoryId}`
          );
          if (response.code === "success") {
            Swal.fire({
              title: "Xóa thành công.",
              icon: "success",
            });
            fetchProductCategory();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Xóa không thành công.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Lỗi khi xóa danh mục:", error);
          Swal.fire({
            title: "Error!",
            text: "Xóa không thành công.",
            icon: "error",
          });
        }
      }
    });
  };

  // / hàm cập nhật trạng thái
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await laravelAPI.patch(`/api/admin/productcategories/${id}/status`, {
        status: !currentStatus
      });

      if (response.code === 'success') {
        toast.success(response.message);
        fetchProductCategory();
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  // hàm cập nhật vị trí
  const handlePositionChange = async (categoryId, newPosition) => {
    try {
      const response = await laravelAPI.patch(`/api/admin/productcategories/${categoryId}/position`, {
        position: parseInt(newPosition),
      });

      if (response.code === 'success') {
        toast.success(response.message);
        fetchProductCategory();
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
        Quản lý danh mục sản phẩm
      </h2>
      <div className="card mb-3">
        <div className="card-header">
          <h3 className="text-[20px] font-[700] text-[#00000] py-[10px]">
            Bộ lọc và tìm kiếm
          </h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-3 gap-[10px]">
            <div className="flex flex-col gap-[10px]">
              <label className="text-[16px] font-[700] text-[#000000]">Trạng thái</label>
              <select
                className="form-control"
                onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">Tất cả</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Dừng hoạt động</option>
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
                onKeyDown={(e) => e.key === "Enter" && fetchProductCategory(1)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h3 className="text-[20px] font-[700] text-[#00000]">
              Danh sách danh mục
            </h3>
            {canCreate && (
              <button
                onClick={() => setShowCreateCategory(true)}
                className="font-[600] text-[20px] text-[#ffffff] py-[8px] px-[20px] rounded-[12px] bg-main flex items-center gap-[20px] my-[10px]">
                <span><FaCirclePlus /></span>
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
            <div>
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th></th>
                    <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                      STT
                    </th>
                    <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                      Hình ảnh
                    </th>
                    <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                      Tên danh mục
                    </th>
                    <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                      Vị trí
                    </th>
                    <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                      Danh mục cha
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
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <tr key={category.id}>
                        <td className="!py-[20px]">
                          <input type="checkbox" name="" id="" />
                        </td>
                        <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center">
                          {index + 1 + (currentPage - 1) * 10}
                        </td>
                        <td className="!py-[20px] flex items-center justify-center">
                          <img
                            src={category?.image}
                            alt={category?.name}
                            className="w-[100px] h-[100px]"
                          />
                        </td>
                        <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                          {category?.name}
                        </td>
                        <td className="!py-[20px] text-center">
                          {canEdit ? (
                            <input
                              type="number"
                              name="position"
                              value={category?.position}
                              min={1}
                              onChange={(e) => handlePositionChange(category?.id, e.target.value)}
                              className="w-[80px] border rounded-[12px] py-[4px] text-[16px] font-[400] text-center text-[#000000]"
                            />
                          ) : (
                            <span className="font-[600] text-[16px] text-[#000000]">{category?.position}</span>
                          )}
                        </td>
                        <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                          {category?.parentName
                            ? category?.parentName
                            : "Không có"}{" "}
                        </td>
                        <td className="!py-[20px] text-center">
                          {canEdit ? (
                            <label className="toggle-switch">
                              <input
                                type="checkbox"
                                checked={category?.status === 1}
                                onChange={() => handleToggleStatus(category?.id, category?.status)}
                              />
                              <div className="toggle-switch-background">
                                <div className="toggle-switch-handle"></div>
                              </div>
                            </label>
                          ) : (
                            <span
                              className={`inline-block px-[12px] py-[6px] rounded-[12px] text-[14px] font-[600] text-[#ffffff] 
                ${category?.status === 1 ? 'bg-[#339900] ' : 'bg-[#FF0000]'}`}>
                              {category?.status === 1 ? "Đang hoạt động" : "Không hoạt động"}
                            </span>
                          )}
                        </td>
                        <td >
                          <div className="flex items-center justify-center gap-[6px] !py-[10px]">
                            <button
                              onClick={() => handleDetailClick(category?.id)}
                              className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[12px] py-[8px] px-[12px]"
                            >
                              Chi tiết
                            </button>
                            {canEdit && (
                              <button
                                onClick={() => handleEditClick(category?.id)}
                                className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]">
                                Sửa
                              </button>
                            )}

                            {canDelete && (
                              <button
                                onClick={() => handleDeleteCategory(category?.id)}
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
                      <td colSpan="9" className="text-center py-[10px]">
                        Không có danh mục sản phẩm nào.
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
      <CreateCategory
        showCreateCategoryModal={showCreateCategory}
        setShowCreateCategoryModal={setShowCreateCategory}
        fetchProductCategory={fetchProductCategory}
      />

      <EditCategory
        showEditCategoryModal={showEditCategory}
        setShowEditCategoryModal={setShowEditCategory}
        fetchProductCategory={fetchProductCategory}
        categoryId={categoryId}
      />

      <DetailCategory
        showDetailCategoryModal={showDetailCategory}
        setShowDetailCategoryModal={setShowDetailCategory}
        categoryId={categoryId}
      />
    </div>
  );
};

export default CategoryList;
