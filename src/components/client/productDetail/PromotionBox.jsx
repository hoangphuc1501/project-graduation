import TinyMceToHtml from "../decodeHTMLEntities/decodeHTMLEntities";

const PromotionBox = ({ content }) => {
    return (
        <>
            <div className="promotion-box">
                <div className="label-description">
                    <img
                        src="https://cdn.shopvnb.com/themes/images/code_dis.gif"
                        alt=""
                    />
                    <span className="">ưu đãi</span>
                </div>
                <div className="">
                    <TinyMceToHtml content={content} />
                </div>
            </div>
        </>
    )
}

export default PromotionBox;