import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
const Breadcrumb = () => {
    return (
        <div className="py-[15px] bg-[#F5F5F5]">
            <div className="container px-[16px] mx-auto">
                <nav className="flex flex-wrap items-center gap-1 p-1">
                    <Link to="/" class="inline-flex items-center gap-[10px] text-[16px] text-[#333333] font-[400] transition-all duration-300 ease-in hover:text-main">
                        <FaHome />
                    </Link>
                    <span
                        className="inline-block mx-[6px] text-[16px] select-none pointer-events-none opacity-50 text-[#333333]">
                        /
                    </span>
                    <Link
                        to="*"
                        className="inline-flex items-center gap-[10px] text-[16px] text-[#333333] font-[400] transition-all duration-300 ease-in hover:text-main">
                        Components
                    </Link>
                    <span class="inline-block mx-[6px] text-[16px] select-none pointer-events-none opacity-50 text-[#333333]">
                        /
                    </span>
                    <Link
                        to="*"
                        className="inline-flex items-center gap-[10px] text-[16px] text-[#333333] font-[400] transition-all duration-300 ease-in hover:text-main">
                        Breadcrumb</Link>
                    <span class="inline-block mx-[6px] text-[16px] select-none pointer-events-none opacity-50 text-[#333333]">
                        /
                    </span>
                    <span
                        to="*"
                        className="inline-flex items-center gap-[10px] text-[16px] text-main font-[400] ">
                        Breadcrumb
                    </span>
                </nav>
            </div>
        </div>
    )
}

export default Breadcrumb;