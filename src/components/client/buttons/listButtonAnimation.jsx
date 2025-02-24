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

const ButtonSeeMore = () => {
    return (
        <div className="button-see-more">
            <button class="cta">
                <span>Xem thêm</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            </button>
        </div>
    )
}

export { ListButtonAnimation, ButtonSeeMore };