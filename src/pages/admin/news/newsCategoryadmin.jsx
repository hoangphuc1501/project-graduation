import React, { useEffect, useState } from "react";

export default function AdminNews() {
  const [showModal, setShowModal] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/newsCategories ")
      .then((res) => res.json())
      .then((data) => {
        const news = data.data.data || [];
        setNews(news);
      })
      .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
  }, []);

  return (

    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold text-black">Danh sách bài viết</h1>

      <div className="bg-white p-4 rounded shadow mt-4">
        <h2 className="text-lg font-semibold mb-2 text-2xl">Bộ lọc và tìm kiếm</h2>
        <div className="flex items-center space-x-4">
          <select className="border p-2 rounded w-1/4">
            <option value="all">Tất cả</option>
          </select>
          <input type="text" className="border p-2 rounded flex-1" placeholder="Nhập tiêu đề bài viết" />
          <button className="bg-orange-500 text-white px-4 py-2 rounded">Tìm</button>
          <select className="border p-2 rounded w-1/4">
            <option value="active">Hoạt động</option>
            <option value="inactive">Dừng hoạt động</option>
          </select>
          <button className="bg-orange-500 text-white px-4 py-2 rounded">Áp dụng</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mt-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold mb-2 text-2xl">Danh sách bài viết</h2>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            Thêm bài viết
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">STT</th>
              <th className="border p-2">Tiêu đề</th>
              <th className="border p-2">Tác giả</th>
              <th className="border p-2">Trạng thái</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {news.map((article, index) => (
              <tr key={article.id} className="text-center border hover:bg-gray-100">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{article.name}</td>
                <td className="border p-2">{article.description}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded ${article.status === 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {article.status === 0 ? "Hoạt động" : "Dừng hoạt động"}
                  </span>
                </td>
                <td className="border p-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Sửa</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm thương hiệu</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Tên danh mục</label>
                  <input type="text" className="form-control" placeholder="Nhập tên sản phẩm" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Vị trí</label>
                  <input type="number" className="form-control" placeholder="Nhập vị trí" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Trạng thái</label>
                  <select className="form-select">
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Dừng hoạt động</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                <button className="btn btn-primary">Lưu</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
