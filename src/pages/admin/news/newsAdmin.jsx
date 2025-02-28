import React from "react";
import { useEffect, useState } from "react";


export default function AdminNews() {
    const [news, setnews] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/news")
            .then((res) => res.json())
            .then((data) => {
                // Ensure we're extracting the 'data' field which contains the users array
                const newssList = data.data?.data || [];  // Access the data inside `data` field
                setnews(newssList);  // Set users to the extracted list
                console.log(data)
            })
            .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
    }, []);
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 p-6 overflow-auto">
                <h1 className="text-2xl font-bold text-black">Danh sách tin tức</h1>

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
                        <h2 className="text-lg font-semibold mb-2 text-2xl ">Danh sách tin tức</h2>
                        <button
                            className="bg-orange-500 text-white px-4 py-2 rounded"
                        // onClick={() => setShowModal(true)}
                        >
                            Thêm tin tức
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
                            {Array.isArray(news) ? news.map((article, index) => (
                                <tr key={article.id} className="text-center border hover:bg-gray-100">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{article.title}</td>
                                    <td className="border p-2">{article.author}</td>
                                    <td className="border p-2">
                                        <span className={`px-2 py-1 rounded ${article.status === "Hoạt động" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                                            {article.status}
                                        </span>
                                    </td>
                                    <td className="border p-2">
                                        <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Sửa</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan="5" className="text-center p-4">Không có dữ liệu</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
