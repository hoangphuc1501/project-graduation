import React, { useEffect, useState } from "react";
import {  Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { laravelAPI } from "../../../utils/axiosCustom";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const RevenueChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await laravelAPI.get("/api/admin/dashboard/revenue-statistics?days=7");
                // console.log("check data  chart", response)
                const data = response.data;

                const labels = data.map((item) => item.date);
                const revenueData = data.map((item) => item.revenue);
                const ordersData = data.map((item) => item.orders_count);

                setChartData({
                    labels,
                    datasets: [
                        {
                            type: "bar",
                            label: "Doanh thu (VNĐ)",
                            data: revenueData,
                            backgroundColor: "rgba(54, 162, 235, 0.6)",
                            yAxisID: "y1",
                        },
                        {
                            type: "line",
                            label: "Số đơn hàng",
                            data: ordersData,
                            borderColor: "rgba(255, 99, 132, 1)",
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                            fill: false,
                            tension: 0.4,
                            yAxisID: "y2",
                        },
                    ],
                });
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };

        fetchRevenueData();
    }, []);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    return (
        <div className="w-[100%]">
            <h3 className="text-[20px] text-[#000000] font-[700] mb-[20px] text-center">📊 Thống kê doanh thu và đơn hàng</h3>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    scales: {
                        y1: {
                            type: "linear",
                            position: "left",
                            title: { display: true, text: "Doanh thu (VNĐ)" },
                        },
                        y2: {
                            type: "linear",
                            position: "right",
                            title: { display: true, text: "Số đơn hàng" },
                            grid: { drawOnChartArea: false },
                        },
                    },
                }}
            />
        </div>
    );
};

export default RevenueChart;
