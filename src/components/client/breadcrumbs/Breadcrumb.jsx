import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x); // bỏ các phần rỗng


    return (
        <div className="py-[15px] bg-[#F5F5F5]">
            <div className="container px-[16px] mx-auto">
                <nav className="flex flex-wrap items-center gap-1 p-1">
                    <Link to="/" class="inline-flex items-center gap-[10px] text-[16px] text-[#333333] font-[400] transition-all duration-300 ease-in hover:text-main">
                        <FaHome />
                    </Link>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;

                        return (
                            <div key={index} className="flex items-center gap-1">
                                <span className="mx-[6px] opacity-50 text-[#333333]">/</span>
                                {isLast ? (
                                    <span className="text-main">{decodeURIComponent(name)}</span>
                                ) : (
                                    <Link to={routeTo} className="hover:text-main text-[#333333] transition-all duration-300">
                                        {decodeURIComponent(name)}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    )
}

export default Breadcrumb;