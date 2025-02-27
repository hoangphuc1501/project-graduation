import { useState, useEffect } from "react";

// const targetDate = new Date("2025-02-31T23:59:59");
const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(targetDate) - new Date();
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center gap-[10px] text-[16px] text-[#ffffff] font-[700]">
            <span>Chỉ còn:</span>
            <span className="bg-[#ffffff] text-[#FEA200] rounded-[8px] px-[8px] py-[3px]">{timeLeft.days}</span>
            <span>:</span>
            <span className="bg-[#ffffff] text-[#FEA200] rounded-[8px] px-[8px] py-[3px]">{timeLeft.hours}</span>
            <span>:</span>
            <span className="bg-[#ffffff] text-[#FEA200] rounded-[8px] px-[8px] py-[3px]">{timeLeft.minutes}</span>
            <span>:</span>
            <span className="bg-[#ffffff] text-[#FEA200] rounded-[8px] px-[8px] py-[3px]">{timeLeft.seconds}</span>
            {/* Còn {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds} */}
        </div>
    );
};
export default CountdownTimer;