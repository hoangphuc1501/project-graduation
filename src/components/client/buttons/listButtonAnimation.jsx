import "./button.css";


const ListButtonAnimation = ({ onClick, to, text, type = "button", className = "" }) => {
    return (
        <>
            <div className={`button-animation ${className}`}>
                <button
                    type={type}
                    className="btn"
                    onClick={onClick}
                >
                    <strong>{text}</strong>
                    <div id="container-stars">
                        <div id="stars"></div>
                    </div>

                    <div id="glow">
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </button>
            </div>
        </>
    )
}


export { ListButtonAnimation };