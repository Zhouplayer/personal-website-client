import { React, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import BirthdayCard from "../components/birthday/BirthdayCard";
import CountdownTimer from "../components/birthday/CountdownTimer";
import "../styles/BirthdayPage.css";

function BirthdayPage() {
    const { friendName } = useParams();
    const [birthdayDate, setBirthdayDate] = useState(null); // 🎂 生日日期
    const [isBirthday, setIsBirthday] = useState(false); // 🎉 是否是生日
    const [showCountdown, setShowCountdown] = useState(false); // ⏳ 是否显示倒计时
    const [birthdayTitle, setBirthdayTitle] = useState("🎉 生日快乐！ 🎂");
    const [birthdayMessage, setBirthdayMessage] = useState("祝你生日快乐！");
    const [audioSrc, setAudioSrc] = useState("");
    const [cakeImage, setCakeSrc] = useState("");
    const [carouselImage, setCarouselSrc] = useState("");
    const [volume, setVolume] = useState(0.1);
    const audioRef = useRef(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/birthday", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ friend_name: friendName }) // 🎯 发送 JSON 数据
        })
            .then(response => response.json())
            .then(data => {
                if (data.music && data.date) {
                    setAudioSrc(data.music);
                    setBirthdayTitle(data.name);
                    setBirthdayMessage(data.message);
                    setCakeSrc(data.cake);
                    setCarouselSrc(data.carousel);

                    // 🎂 解析服务器返回的生日日期
                    const [year, month, day] = data.date.split("/").map(Number);
                    const birthday = { day, month, year };
                    setBirthdayDate(birthday);
                } else {
                    setBirthdayTitle("🎈 抱歉，找不到生日信息 🎁");
                    setBirthdayMessage("请联系管理员添加生日祝福！");
                }
            })
            .catch(error => console.error("Error fetching birthday data:", error));
    }, [friendName]);

    useEffect(() => {
        if (birthdayDate) {
            const today = new Date();
            if (today.getDate() === birthdayDate.day && today.getMonth() + 1 === birthdayDate.month) {
                setIsBirthday(true);
            } else {
                setIsBirthday(false);
            }
            // ✅ 当 birthdayDate 确认后，再决定是否显示 CountdownTimer
            setShowCountdown(true);
        }
    }, [birthdayDate]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const playMusic = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    // 🎯 如果生日数据还未加载，显示加载状态
    if (!birthdayDate) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-pink-300 text-gray-800 text-2xl">
                正在加载生日信息...
            </div>
        );
    }

    return isBirthday ? (
        <BirthdayCard
            birthdayTitle={birthdayTitle}
            birthdayMessage={birthdayMessage}
            cakeImage={cakeImage}
            carouselImage={carouselImage}
            audioSrc={audioSrc}
            audioRef={audioRef}
            playMusic={playMusic}
            volume={volume}
            setVolume={setVolume}
        />
    ) : (
        showCountdown && <CountdownTimer birthday={birthdayDate} />
    );
}

export default BirthdayPage;