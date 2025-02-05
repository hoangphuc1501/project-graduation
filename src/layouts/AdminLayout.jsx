
import HeaderAdmin from "../components/admin/partials/HeaderAdmin";
import SidebarAdmin from "../components/admin/partials/SidebarAdmin";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminLayout = () => {
    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin />
            <>
                <Outlet />
            </>

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