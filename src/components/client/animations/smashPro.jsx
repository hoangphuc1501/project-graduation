import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";

const SmashPro = () => {
    const bannerRef1 = useRef(null);
    const contentRef1 = useRef(null);
    const bannerRef2 = useRef(null);
    const contentRef2 = useRef(null);

    const startScrolling = (content) => {
        let position = 0;

        function scrollBanner() {
            position--;
            if (Math.abs(position) >= content.offsetWidth / 2) {
                position = 0;
            }
            content.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(scrollBanner);
        }

        scrollBanner();
    };

    useEffect(() => {
        const content1 = contentRef1.current;
        const content2 = contentRef2.current;

        if (content1 && content2) {
            // Duplicate content for infinite scrolling
            content1.innerHTML += content1.innerHTML;
            content2.innerHTML += content2.innerHTML;

            // Start scrolling for both lines
            startScrolling(content1);
            startScrolling(content2);
        }
    }, []);

    const generateContent = () => (
        Array(20)
            .fill("SmashPro")
            .map((item, index) => (
                <span key={index}>
                    {item} <FontAwesomeIcon icon={faSolidStar} />{" "}
                </span>
            ))
    );

    return (
        <div className="pb-[100px]">
            <div className="scrolling-banner" ref={bannerRef1}>
                <div className="scrolling-content" ref={contentRef1}>
                    {generateContent()}
                </div>
            </div>

            <div className="scrolling-banner1" ref={bannerRef2}>
                <div className="scrolling-content" ref={contentRef2}>
                    {generateContent()}
                </div>
            </div>
        </div>
    );
};

export default SmashPro;
