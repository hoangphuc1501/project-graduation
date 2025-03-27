import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { laravelAPI } from "../../../utils/axiosCustom";

// Đăng ký các thành phần cần thiết cho biểu đồ cột
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserRegisterChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRegistrationData = async () => {
            try {
                const response = await laravelAPI.get("/api/admin/dashboard/user-registration-statistics?days=7");
                // console.log("check thống kê user", response)
                if (response.code === "success") {
                    const data = response.data;

                    // Tạo danh sách ngày và số lượng user đăng ký
                    const labels = data.map(item => item.date);
                    const userCounts = data.map(item => item.userCount);

                    setChartData({
                        labels,
                        datasets: [
                            {
                                label: "Số lượng người dùng đăng ký",
                                data: userCounts,
                                backgroundColor: "rgba(54, 162, 235, 0.6)",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRegistrationData();
    }, []);

    if (loading) return <p>Đang tải biểu đồ...</p>;

    return (
        <div className="w-[100%] mt-[60px]">
            <h3 className="text-[20px] text-[#000000] font-[700] mb-[20px] text-center">📊 Thống kê số lượng người dùng đăng ký theo ngày</h3>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Số lượng người dùng đăng ký mỗi ngày"
                        },
                        legend: {
                            display: true
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Số lượng người dùng"
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Ngày"
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default UserRegisterChart;
