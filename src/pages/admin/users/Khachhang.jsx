import React, { useEffect, useState } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((res) => res.json())
      .then((data) => {
        const users = data.data.data || [];
        setUsers(users);
      })
      .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
  }, []);

  return (
  
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-black">Danh sách người dùng</h1>

        <div className="bg-white p-4 rounded shadow mt-4">
          <h2 className="text-lg font-semibold mb-2 text-2xl">Bộ lọc và tìm kiếm</h2>
          <div className="flex items-center space-x-4">
            <select className="border p-2 rounded w-1/4">
              <option value="all">Tất cả</option>
            </select>
            <input type="text" className="border p-2 rounded flex-1" placeholder="Nhập từ khóa" />
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Tìm</button>
            <select className="border p-2 rounded w-1/4">
              <option value="active">Hoạt động</option>
              <option value="inactive">Dừng hoạt động</option>
            </select>
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Áp dụng</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow mt-4">
          <h2 className="text-lg font-semibold mb-2 text-2xl ">Danh sách tài khoản</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">STT</th>
                <th className="border p-2">Họ tên</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Trạng thái</th>
                <th className="border p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="text-center border hover:bg-gray-100">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{user.fullname}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                  <span
                      className={`px-2 py-1 rounded ${user.status === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}
                    >
                      {user.status === 1 ? "Hoạt động" : "Dừng hoạt động"}
                    </span>                  </td>
                  <td className="border p-2">
                    <button className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}
