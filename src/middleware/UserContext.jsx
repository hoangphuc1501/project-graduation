import { createContext, useState, useEffect } from "react";
import { laravelAPI, nodeAPI } from "../utils/axiosCustom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser,token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         const storedToken = localStorage.getItem("token");
//         if (storedUser && storedToken) {
//             setUser(JSON.parse(storedUser));
//             setToken(storedToken);
//         }
//     }, []);

//     useEffect(() => {
//         if (user && token) {
//             localStorage.setItem("user", JSON.stringify(user));
//             localStorage.setItem("token", token);
//         }
//     }, [user, token]); // Cập nhật localStorage khi user hoặc token thay đổi

//     return (
//         <UserContext.Provider value={{ user, setUser, token, setToken }}>
//             {children}
//         </UserContext.Provider>
//     );
// };


// export const UserContext = createContext({
//     isAuthenticated: false,
//     user: {
//         email: "",
//         fullname: ""
//     },
//     token: null,
//     setUser: () => { },
//     setToken: () => { },
//     fetchAccount: () => { }
// })

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState({
//         isAuthenticated: false,
//         user: {
//             email: "",
//             fullname: ""
//         }
//     });
//     // const [token, setToken] = useState(localStorage.getItem("token") || null);
//     const getToken = () => {
//         return localStorage.getItem("token");
//     };

//     // Đồng bộ token với localStorage
//     // useEffect(() => {
//     //     const handleStorageChange = () => {
//     //         const storedToken = localStorage.getItem("token");
//     //         setToken(storedToken); // Cập nhật token ngay lập tức khi localStorage thay đổi
//     //     };

//     //     window.addEventListener("storage", handleStorageChange);
//     //     return () => window.removeEventListener("storage", handleStorageChange);
//     // }, []);

//     const setToken = (token) => {
//         console.log("🚀 Đặt token vào localStorage:", token);
//         localStorage.setItem("token", token);

//         // Cập nhật axios ngay lập tức
//         nodeAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         laravelAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     };

//     const fetchAccount = async () => {
//         // if (!token) return;
//         const storedToken = getToken();
//         if (!storedToken) {
//             console.log("Không tìm thấy token trong localStorage");
//             return;
//         }
//         try {
//             const res = await nodeAPI.get("/user/account");

//             // console.log("check thông tin user", res)
//             if (res) {
//                 setUser({
//                     isAuthenticated: true,
//                     user: {
//                         email: res.user.email ?? "Không có email",
//                         fullname: res.user.fullname ?? "Không có tên"
//                     }
//                 });
//             }
//         } catch (error) {
//             console.error("Lỗi khi lấy tài khoản:", error);
//             setUser({ isAuthenticated: false, user: { email: "", fullname: "" } });
//             setToken(null);
//             localStorage.removeItem("token");
//         }
//     };

//     // Lắng nghe thay đổi của token và gọi fetchAccount
//     useEffect(() => {
//         fetchAccount();
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser, setToken, fetchAccount }}>
//             {children}
//         </UserContext.Provider>
//     );
// };