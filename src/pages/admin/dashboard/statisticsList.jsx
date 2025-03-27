import React, { useEffect, useState } from "react";
import { laravelAPI } from "../../../utils/axiosCustom";
import { AiFillProduct } from "react-icons/ai";
import { TbBrand4Chan } from "react-icons/tb";
import { MdCategory, MdAttachMoney  } from "react-icons/md";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoNewspaperSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";
const StatisticsList = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const response = await laravelAPI.get("api/admin/dashboard");
            // console.log("check dashbord", response)
            if (response.code === 'success') {
                setData(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) return <p>Đang tải dữ liệu...</p>;


    return (
        <>
            <div className="py-[60px]">
                <div className="grid grid-cols-4 gap-[20px]">
                    <div className="flex justify-between items-center shadow-[0_0_6px_#dddddd] py-[20px] px-[30px] rounded-[10px]">
                        <div className="flex flex-col items-center gap-[8px] justify-center ">
                            <span className="text-[16px] font-[700] text-[#999999]">Tổng doanh thu</span>
                            <span className="text-[20px] font-[700] text-[#000000]">{Number(data.total_revenue).toLocaleString()} <sup>đ</sup></span>
                        </div>
                        <div className="text-[20px] font-[700] text-[#ffffff] p-[10px] rounded-[100%] bg-[#0033FF]">
                        <MdAttachMoney />
                        </div>
                    </div>
                    <div className="flex justify-between items-center shadow-[0_0_6px_#dddddd] py-[20px] px-[30px] rounded-[10px]">
                        <div className="flex flex-col items-center gap-[8px] justify-center ">
                            <span className="text-[16px] font-[700] text-[#999999]">Tổng sản phẩm</span>
                            <span className="text-[20px] font-[700] text-[#000000]">{data.total_products}</span>
                        </div>
                        <div className="text-[20px] font-[700] text-[#ffffff] p-[10px] rounded-[100%] bg-[#0033FF]">
                            <AiFillProduct />
                        </div>
                    </div>
                    <div className="flex justify-between items-center shadow-[0_0_6px_#dddddd] py-[20px] px-[30px] rounded-[10px]">
                        <div className="flex flex-col items-center gap-[8px] justify-center ">
                            <span className="text-[16px] font-[700] text-[#999999]">Tổng thương hiệu</span>
                            <span className="text-[20px] font-[700] text-[#000000]">{data.total_brands}</span>
                        </div>
                        <div className="text-[20px] font-[700] text-[#ffffff] p-[10px] rounded-[100%] bg-[#0033FF]">
                        <TbBrand4Chan />
                        </div>
                    </div>
                    <div className="flex justify-between items-center shadow-[0_0_6px_#dddddd] py-[20px] px-[30px] rounded-[10px]">
                        <div className="flex flex-col items-center gap-[8px] justify-center ">
                            <span className="text-[16px] font-[700] text-[#999999]">Tổng danh mục</span>
                            <span className="text-[20px] font-[700] text-[#000000]">{data.total_categories}</span>
                        </div>
                        <div className="text-[20px] font-[700] text-[#ffffff] p-[10px] rounded-[100%] bg-[#0033FF]">
                        <MdCategory />
                        </div>
                    </div>
                    <div className="flex justify-between items-center shadow-[0_0_6px_#dddddd] py-[20px] px-[30px] rounded-[10px]">
                        <div className="flex flex-col items-center gap-[8px] justify-center ">
                            <span className="text-[16px] font-[700] text-[#999999]">Tổng đơn hàng</span>
                            <span className="text-[20px] font-[700] text-[#000000]">{data.total_orders}</span>
                        </div>
                        <div className="text-[20px] font-[700] text-[#ffffff] p-[10px] rounded-[100%] bg-[#0033FF]">
                        <HiMiniShoppingBag />
                        </div>
                    </div>
                    <div className="flex justify-between items-center shadow-[0_0_6px_#dddddd] py-[20px] px-[30px] rounded-[10px]">
                        <div className="flex flex-col items-center gap-[8px] justify-center ">
                            <span className="text-[16px] font-[700] text-[#999999]">Tổng mã giảm giá</span>
                            <span className="text-[20px] font-[700] text-[#000000]">{data.total_voucher_codes}</span>
                        </div>
                        <div className="text-[20px] font-[700] text-[#ffffff] p-[10px] rounded-[100%] bg-[#0033FF]">
                        <RiDiscountPercentLine />
                        </div>
                    </div>
                    <div className="flex justify-between items-center shadow-[0_0_6px_#dddddd] py-[20px] px-[30px] rounded-[10px]">
                        <div className="flex flex-col items-center gap-[8px] justify-center ">
                            <span className="text-[16px] font-[700] text-[#999999]">Tổng bài viết</span>
                            <span className="text-[20px] font-[700] text-[#000000]">20.000.00</span>
                        </div>
                        <div className="text-[20px] font-[700] text-[#ffffff] p-[10px] rounded-[100%] bg-[#0033FF]">
                        <IoNewspaperSharp />
                        </div>
                    </div>
                    <div className="flex justify-between items-center shadow-[0_0_6px_#dddddd] py-[20px] px-[30px] rounded-[10px]">
                        <div className="flex flex-col items-center gap-[8px] justify-center ">
                            <span className="text-[16px] font-[700] text-[#999999]">Tổng người dùng</span>
                            <span className="text-[20px] font-[700] text-[#000000]">{data.total_users}</span>
                        </div>
                        <div className="text-[20px] font-[700] text-[#ffffff] p-[10px] rounded-[100%] bg-[#0033FF]">
                        <HiUserGroup />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default StatisticsList;
