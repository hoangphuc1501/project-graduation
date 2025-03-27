import React, { useState, useEffect } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";


const VoucherListClient = () => {
    const [vouchers, setVouchers] = useState([]);
    const [filterType, setFilterType] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    useEffect(() => {
        fetchVouchers();
    }, [filterType, currentPage]);

    const fetchVouchers = async () => {
        setLoading(true);
        try {
            const response = await laravelAPI.get("/api/vouchers", {
                params: {
                    filter_type: filterType,
                    per_page: 6,
                    page: currentPage + 1,
                },
            });
            // console.log("check voucher list", response)
            setVouchers(response.data.data);
            setPageCount(response.data.last_page);
        } catch (error) {
            console.error("Lỗi khi tải voucher:", error);
        } finally {
            setLoading(false);
        }
    };
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };
    return (
        <div className="w-full">
            <h2 className="text-[28px] font-[700] text-[#000000] text-center pb-[40px]">Mã giảm giá</h2>
            <div className="flex items-center gap-[10px] mb-[40px]">
                <button
                    className={`px-[12px] py-[8px] rounded-[8px] text-[16px] font-[400] ${filterType === "" ? "bg-main text-[#ffffff]" : "bg-[#BBBBBB] text-[#ffffff]"}`}
                    onClick={() => {
                        setFilterType("");
                        setCurrentPage(0);
                    }}

                >
                    Tất cả
                </button>
                <button
                    className={`px-[12px] py-[8px] rounded-[8px] text-[16px] font-[400] ${filterType === "money" ? "bg-main text-[#ffffff]" : "bg-[#BBBBBB] text-[#ffffff]"}`}
                    onClick={() => {
                        setFilterType("money");
                        setCurrentPage(0);
                    }}
                >
                    Giảm theo tiền
                </button>
                <button
                    className={`px-[12px] py-[8px] rounded-[8px] text-[16px] font-[400] ${filterType === "percent" ? "bg-main text-[#ffffff]" : "bg-[#BBBBBB] text-[#ffffff]"}`}
                    onClick={() => {
                        setFilterType("percent");
                        setCurrentPage(0);
                    }}
                >
                    Giảm theo phần trăm
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center">
                    <div className="loader border-4 border-gray-300 border-t-orange-500 rounded-full w-10 h-10 animate-spin"></div>
                    <span className="ml-2 text-orange-500 text-lg font-semibold">Đang tải...</span>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-[20px]">
                        {vouchers.map((voucher) => (
                            <div className="relative bg-[#ffffff] shadow-sm rounded-[12px] overflow-hidden">
                                <div className="h-[8px] bg-gradient-to-r from-orange-500 to-yellow-400"></div>
                                <div className="p-[10px]">
                                    <h3 className="text-[16px] font-[700] text-main pb-[4px]">{voucher.name}</h3>
                                    <p className="text-[16px] font-[400] text-[#777777] pb-[4px] flex items-center gap-[12px]">
                                        Nhập mã giảm ngay:
                                        <span>
                                            {voucher.discountType === 1
                                                ? `${voucher.discountValue}%`
                                                : `${voucher.discountValue.toLocaleString()}đ`}
                                        </span>
                                    </p>
                                    <p className="text-[16px] font-[400] text-[#777777] pb-[4px] flex items-center gap-[12px]">
                                        Cho đơn hàng tối thiểu:
                                        <span>{voucher.minOrderValue.toLocaleString()} <sup>đ</sup></span>
                                    </p>
                                    <p className="text-[16px] font-[400] text-[#777777] pb-[4px] flex flex-col justify-center gap-[4px]">
                                        <span>Ngày bắt đầu: {new Date(voucher?.startDate).toLocaleDateString()}</span>
                                        <span>Hết hạn: {new Date(voucher?.endDate).toLocaleDateString()}</span>
                                    </p>
                                    <div className="flex items-center justify-between my-[4px]">
                                        <span className="bg-orange-200 text-orange-800 px-[12px] py-[6px] rounded-[8px] font-[400] text-[16px]">
                                            MÃ GIẢM GIÁ
                                        </span>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(voucher.code);
                                                toast.success("Đã sao chép mã: " + voucher.code);
                                            }}
                                            className="bg-orange-500 text-[#ffffff] px-[12px] py-[6px] rounded-[8px] font-bold text-[16px]">
                                            {voucher.code}
                                        </button>
                                    </div>
                                    <div className="my-[20px]">
                                        <div className="relative w-full h-[30px] bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-orange-400 text-[12px] text-center leading-[30px] font-[600]"
                                                style={{
                                                    width: `${(voucher.usageLimit - voucher.numberOfUses) / voucher.usageLimit * 100}%`
                                                }}>
                                                Còn lại {voucher.usageLimit - voucher.numberOfUses}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[16px] font-[700] text-main pb-[4px]">
                                        Số lượng người dùng tối đa: {voucher.usageLimit}
                                    </p>
                                    <p className="text-[14px] font-[400] text-[#777777]">
                                        {voucher.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-center">
                        <ReactPaginate
                            previousLabel="‹"
                            nextLabel="›"
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            forcePage={currentPage} 
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
    );
}

export default VoucherListClient;