
import HeaderAdmin from "../components/admin/partials/HeaderAdmin";
import SidebarAdmin from "../components/admin/partials/SidebarAdmin";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminLayout = () => {
    return (
        <>
            <div className="flex min-h-[1000px] bg-[]">
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