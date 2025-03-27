import StatisticsList from './statisticsList';
import OrderDasboard from './orderDashboard';
import RevenueChart from './revenueChart';
import UserRegisterChart from './userChart';
import OrderStatusChart from './oderStatusChart';
// import React, { useState, useEffect } from "react";



const Dashboard = () => {
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     // Giả lập thời gian tải dữ liệu (có thể thay thế bằng API call)
    //     const fetchData = async () => {
    //         setLoading(true);
    //         await new Promise((resolve) => setTimeout(resolve, 5000)); 
    //         setLoading(false);
    //     };

    //     fetchData();
    // }, []);

    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <p className="text-[24px] font-[600] text-gray-500"> Đang tải dữ liệu...</p>
    //         </div>
    //     );
    // }


    return (
        <div className='py-[60px]'>
            <h2 className="text-[28px] font-[700] text-[#00000] text-center">Thống kê</h2>
            <StatisticsList/>
            <div className='flex gap-[20px]'>
                <div className='w-[60%] shadow-[0_0_6px_#dddddd] py-[20px] px-[20px] rounded-[10px]'>
                <RevenueChart/>
                <UserRegisterChart/>
                <OrderStatusChart/>
                </div>
                <div className='flex-1 shadow-[0_0_6px_#dddddd] py-[20px] px-[20px] rounded-[10px]'>
                    <OrderDasboard/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
