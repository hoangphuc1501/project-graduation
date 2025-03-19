import React, { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { laravelAPI } from "../../../utils/axiosCustom";
import CreateCategory from "./createCategory";
import EditCategory from "./editCategory";
import Swal from "sweetalert2";
import DetailCategory from "./detailCategory";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showDetailCategory, setShowDetailCategory] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [showEditCategory, setShowEditCategory] = useState(false);

  // danh sách danh mục
  const fetchProductCategory = async () => {
    try {
      const response = await laravelAPI.get("/api/admin/productcategories");
      // console.log("check category list:", response);
      if (response.code === "success") {
        setCategories(response.data.data || []);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu danh mục sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductCategory();
  }, []);

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
          const response = await laravelAPI.patch(`/api/admin/productcategories/softDelete/${categoryId}`);
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

  return (
    <div className="py-[60px]">
      <h2 className="text-[28px] font-[700] text-[#00000] text-center pb-[30px]">Quản lý Danh Mục</h2>
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
            <h3 className="text-[20px] font-[700] text-[#00000]">Danh sách danh mục</h3>
            <button
              onClick={() => setShowCreateCategory(true)}
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
                  <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Tên danh mục</th>
                  <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Vị trí</th>
                  <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Danh mục cha</th>
                  <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Trạng thái</th>
                  <th className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">Tác vụ</th>
                </tr>
              </thead>
              <tbody>

                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <tr key={category.id}>
                      <td className="!py-[20px]"><input type="checkbox" name="" id="" /></td>
                      <td className="!py-[20px] font-[400] text-[16px] text-[400] text-center"> {index + 1}</td>
                      <td className="!py-[20px] flex items-center justify-center">
                        <img
                          src={category?.image}
                          alt={category?.name}
                          className="w-[100px] h-[100px]" />

                      </td>
                      <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center"> {category?.name}</td>
                      <td className="!py-[20px] text-center">
                        <input
                          type="number"
                          name="" id=""
                          value={category?.position}
                          min={1}
                          className="w-[80px] border rounded-[12px] py-[4px] !border-[#000000] text-[20px] font-[400] text-center text-[#000000]" />
                      </td>
                      <td className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center"> {category?.parentName ? category?.parentName : "Không có"}  </td>
                      <td className="!py-[20px] text-center">
                        <label class="toggle-switch">
                          <input
                            type="checkbox"
                            checked={category?.status === 1}
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
                          onClick={() => handleDetailClick(category?.id)}
                            className="text-[16px] font-[600] text-[#ffffff] bg-[#0d6efd] rounded-[12px] py-[8px] px-[12px]">
                            Chi tiết</button>
                          <button
                            onClick={() => handleEditClick(category?.id)}
                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FFCC00] rounded-[8px] py-[8px] px-[12px]">
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category?.id)}
                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]">
                            Xóa</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-[10px]">
                      Không có sản phẩm nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
  )

}

export default CategoryList;