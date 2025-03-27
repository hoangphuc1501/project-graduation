import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { laravelAPI } from "../../../utils/axiosCustom";

// Đăng ký các thành phần cần thiết cho biểu đồ tròn
ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const fetchOrderStatusData = async () => {
            try {
                const response = await laravelAPI.get("/api/admin/dashboard/order-status-statistics");
                console.log("check thống kê status order", response)
                if (response.code === "success") {
                    const data = response.data;

                    // Tạo danh sách trạng thái và số lượng đơn hàng
                    const labels = data.map(item => item.status);
                    const counts = data.map(item => item.count);
                    // Tổng số lượng đơn hàng để tính phần trăm
                    const totalOrders = counts.reduce((sum, count) => sum + count, 0);
                    setChartData({
                        labels,
                        datasets: [
                            {
                                label: "Số lượng đơn hàng",
                                data: counts,
                                backgroundColor: [
                                    "#FFA500",
                                    "#007BFF",
                                    "#8A2BE2",
                                    "#28A745",
                                    "#DC3545"
                                ],
                                borderColor: "#fff",
                                borderWidth: 2
                            }
                        ]
                    });
                    setOptions({
                        responsive: true,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        let count = tooltipItem.raw;
                                        let percentage = ((count / totalOrders) * 100).toFixed(2);
                                        return ` ${labels[tooltipItem.dataIndex]}: ${count} (${percentage}%)`;
                                    }
                                }
                            }
                        }
                    });
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderStatusData();
    }, []);

    if (loading) return <p>Đang tải biểu đồ...</p>;

    return (
        <div className="w-[50%] mt-[60px] mx-auto">
            <h3 className="text-[20px] text-[#000000] font-[700] mb-[20px] text-center">📊 Thống kê số lượng đơn hàng theo trạng thái</h3>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default OrderStatusChart;
