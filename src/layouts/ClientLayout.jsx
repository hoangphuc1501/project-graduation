import Header from "../components/client/headers/header";
import { Outlet } from "react-router-dom";
import Footer from "../components/client/footer/footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { UserProvider } from "../middleware/UserContext";
const ClientLayout = () => {
    return (
        <>
            {/* <UserProvider>
                <Header/>
                <>
                    <Outlet/>
                </>
                <Footer/>
            </UserProvider> */}
            <Header/>
                <>
                    <Outlet/>
                </>
                <Footer/>
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

export default ClientLayout;