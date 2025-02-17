import { useState } from "react";
import { ButtonEditUser, ButtonUpdateUser } from "../buttons/buttonEditUser";
const Info = () => {
    const [isFullNameDisabled, setIsFullNameDisabled] = useState(true);
    const [isEmailDisabled, setIsEmailDisabled] = useState(true);
    const [isPhoneDisabled, setIsPhoneDisabled] = useState(true);
    const [isAddressDisabled, setIsAddressDisabled] = useState(true);
    const [isBirthdayDisabled, setIsBirthdayDisabled] = useState(true);
    const [isGenderDisabled, setIsGenderDisabled] = useState(true);
    const [isCreateDisabled, setIsCreateDisabled] = useState(true);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [create, setCreate] = useState("");

    return (
        <>
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
                            onChange={(e) => setFullName(e.target.value)}
                            readOnly={isFullNameDisabled}
                            onBlur={() => setIsFullNameDisabled(true)}
                            value={fullName}
                            id="fullname"
                            required
                            className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${fullName ? "filled" : ""}`} />
                        <label htmlFor="fullname">
                            Họ và tên
                        </label>
                        <ButtonEditUser onClick={() => setIsFullNameDisabled(false)} />
                    </div>
                    <div className="relative flex items-center form-field">
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly={isEmailDisabled}
                            onBlur={() => setIsEmailDisabled(true)}
                            value={email}
                            id="email"
                            required
                            className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${email ? "filled" : ""}`} />
                        <label htmlFor="email">
                            Email
                        </label>
                    </div>
                    <div className="relative flex items-center form-field">
                        <input
                            type="text"
                            onChange={(e) => setPhone(e.target.value)}
                            readOnly={isPhoneDisabled}
                            onBlur={() => setIsPhoneDisabled(true)}
                            value={phone}
                            id="phone"
                            required
                            className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${phone ? "filled" : ""}`} />
                        <label htmlFor="phone">
                            Số điện thoại
                        </label>
                        <ButtonEditUser onClick={() => setIsPhoneDisabled(false)} />
                    </div>
                    <div className="relative flex items-center form-field">
                        <input
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            readOnly={isAddressDisabled}
                            onBlur={() => setIsAddressDisabled(true)}
                            value={address}
                            id="address"
                            required
                            className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${address ? "filled" : ""}`} />
                        <label htmlFor="address">
                            Địa chỉ
                        </label>
                        <ButtonEditUser onClick={() => setIsAddressDisabled(false)} />
                    </div>
                    <div className="relative flex items-center form-field">
                        <input
                            type="text"
                            onChange={(e) => setBirthday(e.target.value)}
                            readOnly={isBirthdayDisabled}
                            onBlur={() => setIsBirthdayDisabled(true)}
                            value={birthday}
                            id="birthday"
                            required
                            className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${birthday ? "filled" : ""}`} />
                        <label htmlFor="birthday">
                            Ngày sinh
                        </label>
                        <ButtonEditUser onClick={() => setIsBirthdayDisabled(false)} />
                    </div>
                    <div className="relative flex items-center form-field">
                        <input
                            type="text"
                            onChange={(e) => setCreate(e.target.value)}
                            readOnly={isCreateDisabled}
                            onBlur={() => setIsCreateDisabled(true)}
                            value={create}
                            id="create"
                            required
                            className={`flex-1 text-[#000000] font-[500] text-[16px] border-b px-[10px] py-[10px] peer bg-transparent ${create ? "filled" : ""}`} />
                        <label htmlFor="create">
                            Ngày tham gia
                        </label>
                        <ButtonEditUser onClick={() => setIsCreateDisabled(false)} />
                    </div>
                    <div className="flex items-center gap-[60px] mt-[10px]" >
                        <h3 className="text-[16px] text-[#000000] font-[500]">Giới tính :</h3>
                        <div className="flex items-center gap-[30px]">
                        <div className="flex items-center gap-[10px]">
                            <input type="radio" id="man" name="gender" />
                            <label htmlFor="man" className="font-[500] text-[16px] text-[#000000]"> Nam</label>
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <input type="radio" id="women" name="gender" />
                            <label htmlFor="women" className="font-[500] text-[16px] text-[#000000]"> Nữ</label>
                        </div>
                        </div>
                    </div>
                    <div className="mt-[12px]">
                        <ButtonUpdateUser text="Cập nhật"/>
                    </div>
                </form>

            </div>
        </>
    )
}

export { Info }