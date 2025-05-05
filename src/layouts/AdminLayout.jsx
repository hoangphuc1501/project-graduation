
import { useEffect } from "react";
import HeaderAdmin from "../components/admin/partials/HeaderAdmin";
import SidebarAdmin from "../components/admin/partials/SidebarAdmin";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { laravelAPI } from "../utils/axiosCustom";
const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/loginAdmin');
        }
    }, [navigate]);
    
    const syncPermissions = async () => {
        try {
            const response = await laravelAPI.get("/api/admin/getMyPermissions");
            // console.log("check gọi permissin", response)
            if (response.code === "success") {
                localStorage.setItem("permissions", JSON.stringify(response.permissions));
            }
        } catch (error) {
            console.error("Lỗi khi đồng bộ quyền:", error);
        }
    };
    
    useEffect(() => {
        syncPermissions();
    }, []);
    return (
        <>
            <div className="flex min-h-[1000px]">
                <div className="w-[300px] h-full bg-[#1b1a1b] fixed">
                    <SidebarAdmin />
                </div>
                <div className="w-[calc(100%-300px)] border px-[20px] ml-[300px]">
                    <HeaderAdmin />
                    <>
                        <Outlet />
                    </>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default AdminLayout;