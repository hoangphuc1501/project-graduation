import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { laravelAPI } from "../../../utils/axiosCustom";

// Đăng ký các thành phần cần thiết cho biểu đồ cột
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserRegisterChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("day");

        const fetchUserRegistrationData = async () => {
            try {
                const response = await laravelAPI.get(`/api/admin/dashboard/user-registration-statistics?type=${type}`);
                // console.log("check thống kê user", response)
                if (response.code === "success") {
                    const data = response.data;

                    // Tạo danh sách ngày và số lượng user đăng ký
                    const labels = data.map(item => item.label);
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

    useEffect(() => {
        fetchUserRegistrationData();
    }, [type]);


    return (
        <div className="w-full mt-[60px]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-[20px] text-[#000000] font-[700] text-center w-full">
                    📈 Thống kê số lượng người dùng đăng ký
                </h3>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border text-[16px] font-[400] text-[#000000] py-[10px] px-[10px] rounded-[10px]"
                >
                    <option value="day">Ngày</option>
                    <option value="month">Tháng</option>
                    <option value="year">Năm</option>
                </select>
            </div>

            {loading ? (
                <p>Đang tải biểu đồ...</p>
            ) : (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: "Số lượng"
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: type === "day" ? "Ngày" : type === "month" ? "Tháng" : "Năm"
                                }
                            }
                        }
                    }}
                />
            )}
        </div>
    );
};

export default UserRegisterChart;
