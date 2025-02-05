const Description = () => {
    return (
        <>
            <div class="relative tab-group">
                <div
                    class="flex justify-between bg-stone-100 p-0.5 relative rounded-lg"
                    role="tablist">
                    <div class="absolute h-[50px] bg-white rounded-md shadow-sm transition-all duration-300 transform scale-x-0 translate-x-0 tab-indicator z-0"></div>
                    <a
                        href="asd"
                        class="tab-link active block text-[20px] transition-all duration-300 relative z-1 w-[49%] text-center leading-[50px] text-[#000000] font-[700] uppercase hover:text-main"
                        data-dui-tab-target="tab1-group"
                    >
                        Chi tiết sản phẩm
                    </a>
                    <a
                        href="sads"
                        class="tab-link active block text-[20px] transition-all duration-300 relative z-1 w-[49%] text-center leading-[50px] text-[#000000] font-[700] uppercase hover:text-main"
                        data-dui-tab-target="tab2-group"
                    >
                        Thông số kỹ thuật
                    </a>
                </div>
                <div class="mt-4 tab-content-container">
                    <div
                        id="tab1-group"
                        class="tab-content text-[#000000] text-[16px] block font-[400]"
                    >
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto magnam quas explicabo molestias consectetur laborum. Corrupti odit fugit </p>
                    </div>
                    <div
                        id="tab2-group"
                        class="tab-content text-[#000000] text-[16px] block font-[400] hidden"
                    >
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo amet quae, ea enim rerum at laboriosam corporis? Corporis eos voluptatum aliquid blanditiis voluptates praesentium magnam veritatis deleniti a ipsa accusantium harum accusamus illum deserunt labore, minima quod doloribus dicta pariatur qui debitis. Harum assumenda recusandae incidunt magni. Magni, beatae adipisci?</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Description;