import { nodeAPI } from '../../utils/axiosCustom';

// api đăng ký
const registerUserApi = async (fullname, email, phone, password) => {
    const userData = {
        fullname,
        email,
        phone,
        password,
    };

    return await nodeAPI.post("/user/register", userData);
};

// api đăng nhập
const LoginUserApi = async ( email,password) => {
    const userData = {email,password};

    return await nodeAPI.post("/user/login", userData);
};

// api quên mật khẩu
const fogotUserApi = async (email) => {
    return await nodeAPI.post("/user/password/forgot", { email })
}

// api xác nhận mã otp
const ComfirmOtpApi = async (email, otp) => {
    return await nodeAPI.post("/user/password/otp", {email, otp});
}

const ChangePasswordApi = async(email, oldPassword, newPassword) => {
    return await nodeAPI.post("/user/password/change", {
        email,
        oldPassword,
        newPassword,
    });
}

export {registerUserApi, LoginUserApi, fogotUserApi, ComfirmOtpApi, ChangePasswordApi}