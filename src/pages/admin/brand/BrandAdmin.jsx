import React, { useState, useEffect } from "react";
import { fetchBrands, addBrand, updateBrand, deleteBrand } from "../../../services/admin/brandService";

export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBrand, setEditingBrand] = useState(null);
  const [brandData, setBrandData] = useState({ name: "", image: "", description: "", position: "", status: "1" });
  const [deleteBrandId, setDeleteBrandId] = useState(null);

  useEffect(() => {
    fetchBrands().then(setBrands);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredBrands = brands.filter((brand) => brand.name.toLowerCase().includes(searchTerm));

  const handleSubmit = async () => {
    if (editingBrand) {
      await updateBrand(editingBrand.id, brandData);
    } else {
      await addBrand(brandData);
    }
    setShowModal(false);
    fetchBrands().then(setBrands);
    setEditingBrand(null);
    setBrandData({ name: "", image: "", description: "", position: "", status: "1" });
  };

  const handleDelete = async (id) => {
    await deleteBrand(id);
    fetchBrands().then(setBrands);
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold text-black">Danh sách thương hiệu</h1>
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

      <div className="bg-white p-4 rounded shadow mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách thương hiệu</h2>
          <button className="bg-orange-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>
            Thêm thương hiệu
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">STT</th>
              <th className="border p-2">Hình ảnh</th>
              <th className="border p-2">Tên thương hiệu</th>
              <th className="border p-2 text-center">Mô tả</th>
              <th className="border p-2">Vị trí</th>
              <th className="border p-2">Trạng thái</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.map((brand, index) => (
              <tr key={brand.id} className="text-center border hover:bg-gray-100">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <img src={brand.image} alt="" className="w-12 h-12 object-cover mx-auto rounded" />
                </td>
                <td className="border p-2">{brand.name}</td>
                <td className="border p-2">{brand.description}</td>
                <td className="border p-2">{brand.position}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded ${brand.status === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {brand.status === 1 ? "Hoạt động" : "Dừng hoạt động"}
                  </span>
                </td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => {
                      setEditingBrand(brand);
                      setBrandData({ name: brand.name, image: brand.image, description: brand.description, position: brand.position, status: brand.status.toString() });
                      setShowModal(true);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      setDeleteBrandId(brand.id);
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
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="text-lg font-semibold">Bạn có chắc chắn muốn xóa thương hiệu này?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setShowDeleteModal(false)}>Hủy</button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  handleDelete(deleteBrandId);
                  setShowDeleteModal(false);
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-semibold">{editingBrand ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu"}</h5>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">Tên thương hiệu</label>
              <input
                type="text"
                className="border p-2 text-black rounded w-full"
                placeholder="Nhập tên thương hiệu"
                value={brandData.name}
                onChange={(e) => setBrandData({ ...brandData, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">Mô tả</label>
              <input
                type="text"
                className="border p-2 text-black rounded w-full"
                placeholder="Nhập mô tả thương hiệu"
                value={brandData.description}
                onChange={(e) => setBrandData({ ...brandData, description: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">Hình ảnh</label>
              <input
                type="text"
                className="border p-2 text-black rounded w-full"
                placeholder="Nhập hình ảnh"
                value={brandData.image}
                onChange={(e) => setBrandData({ ...brandData, image: e.target.value })}
              />
            </div>
            {/* <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">Vị trí</label>
              <input
                type="number"
                min="0"
                className="border p-2 text-black rounded w-full"
                placeholder="Nhập vị trí"
                value={brandData.position}
                onChange={(e) => setBrandData({ ...brandData, position: e.target.value })}
              />
            </div> */}
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">Trạng thái</label>
              <select
                className="border p-2 text-black rounded w-full"
                value={brandData.status}
                onChange={(e) => setBrandData({ ...brandData, status: e.target.value })}
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
