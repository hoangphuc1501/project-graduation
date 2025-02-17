import { Link } from "react-router-dom";

const WishListButtonViewAll = () => {
    return (
        <>
            <div className="mt-[100px] text-center">
            <Link to="/wishList" className="text-[16px] text-[#ffffff] font-[500] bg-main py-[8px] px-[30px] rounded-[8px] border !border-main hover:bg-transparent hover:text-main">Xem tất cả</Link>
            </div>
        </>
    )
}

export {WishListButtonViewAll};