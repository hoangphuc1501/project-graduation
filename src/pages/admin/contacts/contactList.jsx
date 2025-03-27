import React, { useEffect, useState } from 'react';
import { laravelAPI } from '../../../utils/axiosCustom';
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("position-desc");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        per_page: 10,
        total: 0,
        last_page: 1
    });

    useEffect(() => {
        fetchContacts(currentPage);
    }, [sortOption, searchKeyword, currentPage]);

    // hàm show dữ liệu contact
    const fetchContacts = async (page = 1) => {
        try {
            setLoading(true);
            const response = await laravelAPI.get(`/api/admin/contacts`, {
                params: {
                    page: page,
                    per_page: pagination.per_page,
                    sort: sortOption,
                    search: searchKeyword
                }
            });
            // console.log("check contact", response);
            setContacts(response.data.data);
            setPagination({
                per_page: response.data.per_page,
                total: response.data.total,
                last_page: response.data.last_page
            });
        } catch (error) {
            console.error("Lỗi khi gọi API danh sách liên hệ:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa?",
            text: "Bạn sẽ không thể khôi phục liên hệ này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await laravelAPI.delete(`/api/admin/contacts/${id}`);
                    if (response.code === "success") {
                        Swal.fire({
                            title: "Đã xóa!",
                            text: "Liên hệ đã được xóa.",
                            icon: "success"
                        });
                        fetchContacts(currentPage);
                    } else {
                        Swal.fire({
                            title: "Lỗi!",
                            text: response.message || "Xảy ra lỗi khi xóa.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Lỗi!",
                        text: "Không thể kết nối đến máy chủ.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="py-[20px]">
            <h2 className="text-[28px] text-[#000000] font-[700] text-center py-[40px]">
                Quản lý liên hệ
            </h2>
            <div className="card mb-3">
                <div className="card-header">
                    <h3 className="text-[20px] font-[700] text-[#00000] py-[10px]">
                        Bộ lọc và tìm kiếm
                    </h3>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-2 gap-[20px]">
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
                                onKeyDown={(e) => e.key === "Enter" && fetchContacts(1)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header">
                    <div className="flex items-center justify-between py-[10px] mb-[10px]">
                        <h3 className="text-[20px] text-[#000000] font-[700] ">
                            Danh sách liên hệ
                        </h3>
                    </div>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-[40px] text-[18px] font-[600] text-gray-500">
                            Đang tải dữ liệu liên hệ...
                        </div>
                    ) : (
                        <>
                            <table className="w-full table table-hover table-sm">
                                <thead className="bg-[#EEEEEE]">
                                    <tr>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            STT
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Họ và tên
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Email
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Số điện thoại
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center w-[30%]">
                                            Nội dung
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Vị trí
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Ngày gửi
                                        </td>
                                        <td className="font-[700] text-[16px] text-[#000000] !py-[10px] text-center">
                                            Tác vụ
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.length > 0 ? (
                                        contacts.map((contact, index) => (
                                            <tr key={contact.id} className="border-t">
                                                <th className="!py-[20px] font-[400] text-[16px] text-[400] text-center">
                                                    {index + 1 + (currentPage - 1) * 10}
                                                </th>
                                                <th className="!py-[20px] font-[600] text-[16px] text-[#000000] text-center">
                                                    {contact?.fullName}
                                                </th>
                                                <th className="!py-[20px] font-[400] text-[16px] text-[400] text-center">
                                                    {contact?.email}
                                                </th>
                                                <th className="!py-[20px] font-[400] text-[16px] text-[400] text-center">
                                                    {contact?.phone}
                                                </th>
                                                <th className="!py-[20px] font-[400] text-[16px] text-[400] text-center w-[30%]">
                                                    {contact?.content}
                                                </th>
                                                <th className="!py-[20px] text-center">
                                                    <input
                                                        type="number"
                                                        name=""
                                                        id=""
                                                        value={contact?.position}
                                                        min={1}
                                                        className="w-[80px] border rounded-[12px] py-[4px] text-[16px] font-[400] text-center text-[#000000]"
                                                    />
                                                </th>
                                                <th className="!py-[20px] font-[400] text-[16px] text-[400] text-center">
                                                    {new Date(contact?.createdAt).toLocaleString()}
                                                </th>
                                                <th>
                                                    <div className="flex items-center justify-center gap-[6px]">
                                                        <button
                                                            onClick={() => handleDeleteClick(contact?.id)}
                                                            className="text-[16px] font-[600] text-[#ffffff] bg-[#FF0000] rounded-[8px] py-[8px] px-[12px]"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </th>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center py-[10px] text-[16px] font-[500] text-gray-500">
                                                Không có liên hệ nào
                                            </td>
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

    );
}

export default ContactList;