import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function BirthdayCard({
    birthdayTitle,
    birthdayMessage,
    cakeImage,
    carouselImage,
    audioSrc,
    audioRef,
    playMusic,
    volume,
    setVolume
}) {
    const [randomSelectedImage] = useState(Math.random() > 0.5 ? cakeImage : carouselImage);
    const [fireworks, setFireworks] = useState([]);

    // 🎆 不停地产生烟花（每 1.5 秒生成一个新的烟花）
    useEffect(() => {
        const interval = setInterval(() => {
            const newFireworks = Array.from({ length: Math.floor(Math.random() * 2) + 3 }, () => ({
                id: Date.now() + Math.random(),
                startX: Math.random() * 80 + 10,
                delay: Math.random() * 1.5,
                color: ["#FF3D00", "#FFEB3B", "#2196F3", "#9C27B0", "#00FF00"][Math.floor(Math.random() * 5)]
            }));

            setFireworks((prev) => [...prev, ...newFireworks]);
        }, 1500); // 每 1.5 秒生成 2~3 个烟花

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="birthday-container relative overflow-hidden bg-gradient-to-br from-red-600 via-red-400 to-orange-300 min-h-screen flex flex-col items-center justify-center text-center p-6">

            {/* 🎆 烟花效果 */}
            <div className="absolute inset-0 pointer-events-none">
                {fireworks.map(({ id, startX, delay, color }) => (
                    <Firework key={id} startX={startX} delay={delay} color={color} />
                ))}
            </div>

            {/* 🎉 生日标题 */}
            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in">
                {birthdayTitle}
            </h1>

            {/* 🎂 生日祝福语 */}
            <p className="text-lg text-white mt-4">{birthdayMessage}</p>

            {/* 主要图片展示 */}
            <div className="w-full flex justify-center py-6">
                <img
                    src={randomSelectedImage}
                    alt="Birthday Content"
                    className="max-w-sm w-64 md:w-80 lg:w-96 aspect-auto rounded-lg shadow-lg"
                />
            </div>

            {/* 🎵 音乐播放按钮 */}
            {audioSrc && (
                <div>
                    <audio ref={audioRef} src={audioSrc} />
                    <button
                        onClick={playMusic}
                        className="bg-white text-black px-5 py-2 mt-4 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
                    >
                        🎵 播放音乐
                    </button>

                    {/* 🎚️ 音量调节 */}
                    <div className="mt-4">
                        <label className="block text-white font-semibold">🔈 音量</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full mt-2"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

// 🎇 烟花组件
function Firework({ startX, delay, color }) {
    const [explode, setExplode] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setExplode(true), 2000); // 2秒后爆炸
        return () => clearTimeout(timer);
    }, []);

    // 生成多条光束
    const sparks = Array.from({ length: 16 }, (_, i) => ({
        id: i,
        angle: (i * 22.5) * (Math.PI / 180), // 16条光束，每条间隔 22.5°
        distance: Math.random() * 80 + 50, // 爆炸后扩散更远
        color: ["#FF3D00", "#FFEB3B", "#2196F3", "#9C27B0", "#00FF00"][Math.floor(Math.random() * 5)]
    }));

    return (
        <motion.div
            initial={{ y: 500, opacity: 1 }}
            animate={{ y: explode ? -150 : -600, opacity: explode ? 0 : 1 }}
            transition={{ duration: 2, delay }}
            className="absolute bottom-0 w-2 h-2 rounded-full"
            style={{ left: `${startX}%`, backgroundColor: color }}
        >
            {explode &&
                sparks.map(({ id, angle, distance, color }) => (
                    <motion.div
                        key={id}
                        className="absolute w-2 h-2 rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            opacity: 0
                        }}
                        transition={{ duration: 1.5 }}
                    />
                ))}
        </motion.div>
    );
}

export default BirthdayCard;