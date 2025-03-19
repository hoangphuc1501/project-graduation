
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "../middleware/UserContext";
import LoginAdmin from "../components/admin/partials/loginAdmin";
const LoginLayout = () => {
    return (
        <>
            <UserProvider>
                <LoginAdmin/>
            </UserProvider>
            
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

export default LoginLayout;