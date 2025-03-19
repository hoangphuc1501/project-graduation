import { laravelAPI } from '../../utils/axiosCustom';

// api đăng ký
const registerUserApi = async (fullname, email, phone, password) => {
    const userData = {
        fullname,
        email,
        phone,
        password,
    };

    return await laravelAPI.post("/api/user/register", userData);
};

// api đăng nhập
const LoginUserApi = async ( email,password) => {
    const userData = {email,password};

    return await laravelAPI.post("/api/user/login", userData);
};

// api quên mật khẩu
const fogotUserApi = async (email) => {
    return await laravelAPI.post("/api/user/forgotPassword", { email })
}

// api xác nhận mã otp
const ComfirmOtpApi = async (email, otp) => {
    return await laravelAPI.post("/api/user/verify-otp", {email, otp});
}

const ChangePasswordApi = async(oldPassword, newPassword) => {
    return await laravelAPI.post("/api/user/changePassword", {
        oldPassword,
        newPassword,
    });
}

export {registerUserApi, LoginUserApi, fogotUserApi, ComfirmOtpApi, ChangePasswordApi}