import { FaEdit } from "react-icons/fa";

const ButtonEditUser = (props) => {
    const { onClick } = props;
    return (
        <>
            <button
                type="button"
                className="font-[500] text-[20px] text-[#888888] hover:text-main absolute right-[0]"
                onClick={onClick}>
                <FaEdit />
            </button>
        </>
    )
}

const ButtonUpdateUser = (props) => {
    const { onClick, text, type } = props;
    return (
        <>
            <button
                type= {type}
                className="text-[20px] text-[#ffffff] font-[600] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main w-full"
                onClick={onClick}>
                {text}
            </button>
        </>
    )
}

export { ButtonEditUser, ButtonUpdateUser };
