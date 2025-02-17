import { Link } from "react-router-dom";

const ButtonFill = ({ onClick, to, text, type = "button", className = "" }) => {
    const handleClick = (e) => {
        if (onClick) {
            onClick(e); 
        }
    };

    if (to) {
        return (
            <Link 
                to={to} 
                className={`text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main  ${className}`}
            >
                {text}
            </Link>
        );
    }

    return (
        <button 
            type={type} 
            className={`text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[50px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main ${className}`}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export { ButtonFill };
