const AddToCartForm = () => {
    return (
        <>
            <form action="" method="post" className="pb-[10px]">
                <input type="number" className="border" min={1} value={1} />
                <div className="flex justify-between items-center py-[12px]">
                    <button className="w-[58%] bg-[#E95221] border !border-[#E95221] hover:bg-transparent py-[16px] rounded-[4px] text-[16px] text-[#FFFFFF] hover:text-[#E95221] font-[700] uppercase">
                        Thêm vào giỏ hàng
                    </button>
                    <button className="w-[40%] bg-[#ffb916] hover:bg-transparent border !border-[#ffb916] py-[16px] rounded-[4px] text-[16px] text-[#FFFFFF] hover:text-[#ffb916] font-[700] uppercase">
                        Mua ngay
                    </button>
                </div>
                <div className="">
                    <button className="w-[100%] bg-[#008FE5] hover:bg-transparent border !border-[#008FE5] py-[16px] rounded-[4px] text-[16px] text-[#FFFFFF] hover:text-[#008FE5] font-[700]">
                        Tư vấn qua zalo
                    </button>
                </div>
            </form>
        </>
    )
}

export default AddToCartForm;