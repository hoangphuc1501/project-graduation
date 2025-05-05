import { useEffect, useState } from "react";
import { ButtonEditUser, ButtonUpdateUser } from "../buttons/buttonEditUser";
import { laravelAPI } from "../../../utils/axiosCustom";
import { toast } from "react-toastify";
import Loading from "../animations/loading";
import { data } from "react-router-dom";
const Info = () => {
    const [isFullNameDisabled, setIsFullNameDisabled] = useState(true);
    const [isEmailDisabled, setIsEmailDisabled] = useState(true);
    const [isPhoneDisabled, setIsPhoneDisabled] = useState(true);
    const [isAddressDisabled, setIsAddressDisabled] = useState(true);
    // const [isBirthdayDisabled, setIsBirthdayDisabled] = useState(true);
    const [isCreateDisabled, setIsCreateDisabled] = useState(true);
    const [loading, setLoading] = useState(true);


    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        birthday: "",
        create: "",
        gender: "nam",
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setLoading(true)
        try {
            // const token = localStorage.getItem("token");
            const response = await laravelAPI.get("/api/user/profile");
            // console.log("check info user:", response)
            if (response.code === "success") {
                setUserData({
                    fullName: response.user.fullname,
                    email: response.user.email,
                    phone: response.user.phone,
                    address: response.user.address,
                    birthday: response.user.birthday,
                    create: response.user.createdAt,
                    gender: response.user.gender === true || response.user.gender === 1 ? "Nam" : "Nữ",
                });
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
        } finally {
            setLoading(false);
        }
    };

    // cập nhật thông tin
    const handleUpdateUser = async () => {
        try {

            const genderBoolean = userData.gender === "Nam";

            const response = await laravelAPI.patch(
                "/api/user/updateProfile",
                {
                    fullname: userData.fullName,
                    email: userData.email,
                    phone: userData.phone,
                    address: userData.address,
                    birthday: userData.birthday,
                    gender: genderBoolean,
                }
            );
            // console.log("check info user:", response)
            if (response.code === "success") {
                toast.success(response.message);
                fetchUserData();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin:", error);
            toast.error("Có lỗi xảy ra! Vui lòng thử lại.");
        }
    };
    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-[300px]">
                    <Loading />
                </div>
            ) : (
                <div className="w-[50%] mx-auto">
                    <div className="pb-[60px] flex flex-col gap-[20px] items-center">
                        <div className="w-[100px] h-[120px] ">
                            <img src="https://static-smember.cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png" alt="" className="w-full h-full" />
                        </div>
                        <h3 className="text-[16px] font-[700] text-[#000000] ">Phạm Hoàng Phúc</h3>
                    </div>
                    <form action="" method="post" className="flex flex-col gap-[30px] mb-[30px]">
                        <div className="relative flex items-center form-field">
                            <input
                                type="text"
                                onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                                readOnly={isFullNameDisabled}
                                onBlur={() => setIsFullNameDisabled(true)}
                                value={userData.fullName}
                                id="fullname"
                                required
                                className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${userData.fullName ? "filled" : ""}`} />
                            <label htmlFor="fullname">
                                Họ và tên
                            </label>
                            <ButtonEditUser onClick={() => setIsFullNameDisabled(false)} />
                        </div>
                        <div className="relative flex items-center form-field">
                            <input
                                type="email"
                                // onChange={(e) => setEmail(e.target.value)}
                                readOnly={isEmailDisabled}
                                onBlur={() => setIsEmailDisabled(true)}
                                value={userData.email}
                                id="email"
                                required
                                className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${userData.email ? "filled" : ""}`} />
                            <label htmlFor="email">
                                Email
                            </label>
                        </div>
                        <div className="relative flex items-center form-field">
                            <input
                                type="text"
                                // onChange={(e) => setPhone(e.target.value)}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                readOnly={isPhoneDisabled}
                                onBlur={() => setIsPhoneDisabled(true)}
                                value={userData.phone}
                                id="phone"
                                required
                                className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${userData.phone ? "filled" : ""}`} />
                            <label htmlFor="phone">
                                Số điện thoại
                            </label>
                            <ButtonEditUser onClick={() => setIsPhoneDisabled(false)} />
                        </div>
                        <div className="relative flex items-center form-field">
                            <input
                                type="text"
                                // onChange={(e) => setAddress(e.target.value)}
                                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                readOnly={isAddressDisabled}
                                onBlur={() => setIsAddressDisabled(true)}
                                value={userData.address}
                                id="address"
                                required
                                className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${userData.address ? "filled" : ""}`} />
                            <label htmlFor="address">
                                Địa chỉ
                            </label>
                            <ButtonEditUser onClick={() => setIsAddressDisabled(false)} />
                        </div>
                        <div className="relative flex items-center">
                            <input
                                type="date"
                                onChange={(e) => setUserData({ ...userData, birthday: e.target.value })}
                                // readOnly={isBirthdayDisabled}
                                // onBlur={() => setIsBirthdayDisabled(true)}
                                value={userData.birthday ? userData.birthday.split("T")[0] : ""}
                                id="birthday"
                                required
                                className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${userData.birthday ? "filled" : ""}`} />
                            <label htmlFor="birthday" className="absolute bottom-[38px] text-[14px] font-[500] text-[#000000]">
                                Ngày sinh
                            </label>
                            {/* <ButtonEditUser onClick={() => setIsBirthdayDisabled(false)} /> */}
                        </div>
                        <div className="relative flex items-center form-field">
                            <input
                                type="text"
                                // onChange={(e) => setCreate(e.target.value)}
                                onChange={(e) => setUserData({ ...userData, create: e.target.value })}
                                readOnly={isCreateDisabled}
                                onBlur={() => setIsCreateDisabled(true)}
                                value={formatDate(userData.create)}
                                id="create"
                                required
                                className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${userData.create ? "filled" : ""}`} />
                            <label htmlFor="create">
                                Ngày tham gia
                            </label>
                        </div>
                        <div className="flex items-center gap-[60px] mt-[10px]" >
                            <h3 className="text-[16px] text-[#000000] font-[500]">Giới tính :</h3>
                            <div className="flex items-center gap-[30px]">
                                <div className="flex items-center gap-[10px]">
                                    <input
                                        type="radio"
                                        id="man"
                                        name="gender"
                                        checked={userData.gender === "Nam"}
                                        onChange={() => setUserData({ ...userData, gender: "Nam" })}
                                    />
                                    <label htmlFor="man" className="font-[500] text-[16px] text-[#000000]"> Nam</label>
                                </div>
                                <div className="flex items-center gap-[10px]">
                                    <input
                                        type="radio"
                                        id="women"
                                        name="gender"
                                        checked={userData.gender === "Nữ"}
                                        onChange={() => setUserData({ ...userData, gender: "Nữ" })}
                                    />
                                    <label htmlFor="women" className="font-[500] text-[16px] text-[#000000]"> Nữ</label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[12px]">
                            <ButtonUpdateUser text="Cập nhật" onClick={handleUpdateUser} />
                        </div>
                    </form>

                </div>
            )}
        </>
    )
}

export { Info }