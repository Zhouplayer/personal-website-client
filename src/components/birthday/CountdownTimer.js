import React, { useState, useEffect, useCallback } from "react";

function CountdownTimer({ birthday }) {
    const calculateTimeLeft = useCallback(() => {
        const now = new Date();
        const targetDate = new Date(now.getFullYear(), birthday.month - 1, birthday.day);

        // 如果生日已经过了，设置为明年
        if (now > targetDate) {
            targetDate.setFullYear(now.getFullYear() + 1);
        }

        const difference = targetDate - now;
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }, [birthday]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-pink-300 text-gray-800 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold">🎂 倒计时至生日 🎉</h1>
            <p className="text-lg md:text-2xl mt-4">还有：</p>
            <div className="text-3xl md:text-5xl font-bold mt-2">
                {timeLeft.days} 天 {timeLeft.hours} 时 {timeLeft.minutes} 分 {timeLeft.seconds} 秒
            </div>
            <p className="text-lg md:text-xl mt-4">惊喜不会迟到，但得按生日钟点来 ~ 🎁</p>
        </div>
    );
}

export default CountdownTimer;