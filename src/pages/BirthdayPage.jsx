import { React, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import BirthdayCardTangJinglan from "../components/birthday/BirthdayCardTangJinglan";
import BirthdayCardZhouYouyou from "../components/birthday/BirthdayCardYouyou";
import BirthdayCardNiannian from "../components/birthday/BirthdayCardNiannian";
import CountdownTimer from "../components/birthday/CountdownTimer";
import { getBirthdayPersonInfo } from '../api/Birthday'
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
        const fetchPersonInfo = async () => {
            try {
                const data = await getBirthdayPersonInfo(friendName);
                setAudioSrc(data.music);
                setBirthdayTitle(data.name);
                setBirthdayMessage(data.message);
                setCakeSrc(data.cake);
                setCarouselSrc(data.carousel);

                // 🎂 解析服务器返回的生日日期
                const [year, month, day] = data.date.split("/").map(Number);
                const birthday = { day, month, year };
                setBirthdayDate(birthday);
            } catch (error) {
                console.log("Fetch error data", error);
                setBirthdayTitle("🎈 抱歉，找不到生日信息 🎁");
                setBirthdayMessage("请联系管理员添加生日祝福！");
            }

        }

        fetchPersonInfo();
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
            <div className="min-h-screen flex items-center justify-center text-gray-800 text-2xl">
                正在加载生日信息...
            </div>
        );
    }

    // 根据 `friendName` 选择不同的生日卡片
    const renderContent = () => {
        if (isBirthday) {
            switch (friendName) {
                case "TangJinglan":
                    return <BirthdayCardTangJinglan
                        birthdayTitle={birthdayTitle}
                        birthdayMessage={birthdayMessage}
                        cakeImage={cakeImage}
                        carouselImage={carouselImage}
                        audioSrc={audioSrc}
                        audioRef={audioRef}
                        playMusic={playMusic}
                        volume={volume}
                        setVolume={setVolume}
                    />;
                case "Youyou":
                    return <BirthdayCardZhouYouyou
                        birthdayTitle={birthdayTitle}
                        birthdayMessage={birthdayMessage}
                        cakeImage={cakeImage}
                        carouselImage={carouselImage}
                        audioSrc={audioSrc}
                        audioRef={audioRef}
                        playMusic={playMusic}
                        volume={volume}
                        setVolume={setVolume}
                    />;
                case "Niannian":
                    return <BirthdayCardNiannian
                        birthdayTitle={birthdayTitle}
                        birthdayMessage={birthdayMessage}
                        cakeImage={cakeImage}
                        carouselImage={carouselImage}
                        audioSrc={audioSrc}
                        audioRef={audioRef}
                        playMusic={playMusic}
                        volume={volume}
                        setVolume={setVolume}
                    />;
                default:
                    break;
            }
        }

        // 如果不是生日，或者 `friendName` 不匹配，显示倒计时
        return showCountdown ? <CountdownTimer birthday={birthdayDate} /> : null;
    };

    return renderContent();
}

export default BirthdayPage;