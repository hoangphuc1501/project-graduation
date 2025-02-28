import React, { useState, useEffect } from "react";
import { fetchCategories, addCategory, updateCategory, deleteCategory } from "../../../services/admin/categoryServices";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryData, setCategoryData] = useState({ name: "", position: "", status: "1" });
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);


  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm)
  );


  const handleSubmit = async () => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, categoryData);
    } else {
      await addCategory(categoryData);
    }
    setShowModal(false);
    fetchCategories().then(setCategories);
    setEditingCategory(null);
    setCategoryData({ name: "", position: "", status: "1" });
  };

  const handleDelete = async (id) => {
    if (window) {
      await deleteCategory(id);
      fetchCategories().then(setCategories);
    }
  };

  return (

    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold text-black">Danh sách danh mục</h1>

      <div className="bg-white p-4 rounded shadow mt-4">
        <h2 className="text-lg font-semibold mb-2">Bộ lọc và tìm kiếm</h2>
        <div className="flex items-center space-x-4">
          <select className="border p-2 text-black rounded w-1/4">
            <option value="desc">Vị trí giảm dần</option>
            <option value="asc">Vị trí tăng dần</option>
            <option value="az">Tiêu đề từ A-Z</option>
            <option value="za">Tiêu đề từ Z-A</option>
          </select>
          <select className="border p-2 text-black rounded w-1/4">
            <option value="active">Hoạt động</option>
            <option value="inactive">Dừng hoạt động</option>
          </select>
          <input
            type="text"
            className="border p-2 text-black rounded flex-1"
            placeholder="Nhập từ khóa"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="bg-orange-500 text-white px-4 py-2 rounded">Tìm</button>
        </div>
      </div>

      <div className="bg-white p-4 justify-between rounded shadow mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách danh mục</h2>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            Thêm danh mục
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">STT</th>
              <th className="border p-2">Tên danh mục</th>
              <th className="border p-2">Vị trí</th>
              <th className="border p-2">Trạng thái</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => (
              <tr key={category.id} className="text-center border hover:bg-gray-100">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{category.name}</td>
                <td className="border p-2">{category.position}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded ${category.status === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {category.status === 1 ? "Hoạt động" : "Dừng hoạt động"}
                  </span>
                </td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => {
                      setEditingCategory(category);
                      setCategoryData({ name: category.name, position: category.position, status: category.status.toString() });
                      setShowModal(true);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      setDeleteCategoryId(category.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <p className="text-lg font-semibold">Bạn có chắc chắn muốn xóa danh mục này?</p>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Hủy
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    handleDelete(deleteCategoryId);
                    setShowDeleteModal(false);
                  }}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-semibold">{editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục"}</h5>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">Tên danh mục</label>
              <input
                type="text"
                className="border p-2 text-black rounded w-full"
                placeholder="Nhập tên danh mục"
                value={categoryData.name}
                onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">Vị trí</label>
              <input
                type="number"
                min="0"
                className="border p-2 text-black rounded w-full"
                placeholder="Nhập vị trí"
                value={categoryData.position}
                onChange={(e) => setCategoryData({ ...categoryData, position: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">Trạng thái</label>
              <select
                className="border p-2 text-black rounded w-full"
                value={categoryData.status}
                onChange={(e) => setCategoryData({ ...categoryData, status: e.target.value })}
              >
                <option value="1">Hoạt động</option>
                <option value="0">Dừng hoạt động</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>Hủy</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
