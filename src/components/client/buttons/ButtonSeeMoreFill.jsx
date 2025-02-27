import "./button.css";

const ButtonSeeMoreFill = ({ onClick, text, type = "button", className = "" }) => {
    return (
        <>
        <button 
        type={type}
        onClick= {onClick}
        className={`btn-see-more-fill ${className} `}>
            {text}
            </button>
        </>
    )
}

export default ButtonSeeMoreFill;