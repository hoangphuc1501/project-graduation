import "./button.css";
import { FaArrowRightLong } from "react-icons/fa6";

const ButtonSeeMore = ({ onClick, text, type = "button", className = "" }) => {
    return (
        <div className="button-see-more">
            <button 
            type={type}
            onClick={onClick}
            className={`cta ${className}`}>
                <span>{text}</span>
                <FaArrowRightLong className="see-more-arrow" />
            </button>
        </div>
    )
}

export default ButtonSeeMore;