import { React, useState } from "react";

function BirthdayCard({ birthdayTitle, birthdayMessage, cakeImage, carouselImage, audioSrc, audioRef, playMusic, volume, setVolume }) {

    const [randomSelectedImage] = useState(Math.random() > 0.5 ? cakeImage : carouselImage);

    return (
        <div className="birthday-container bg-gradient-to-br from-[#ff85a2] via-[#ffb6c1] to-[#ff69b4]">
            {/* 🎊 掉落元素 */}
            <div className="falling-elements">
                <span className="falling-item">❤️</span>
                <span className="falling-item">🎈</span>
                <span className="falling-item">🎁</span>
                <span className="falling-item">⭐</span>
                <span className="falling-item">🎊</span>
            </div>

            {/* 🎉 生日标题 */}
            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in">
                {birthdayTitle}
            </h1>

            {/* 🎂 生日祝福语 */}
            <p className="text-lg text-white mt-4">{birthdayMessage}</p>

            {/* 主要图片展示 */}
            <div className="w-full flex justify-center py-6">
                <img src={randomSelectedImage} alt={"Birthday Content"}
                    className="max-w-sm w-64 md:w-80 lg:w-96 aspect-auto rounded-lg shadow-lg" />
            </div>

            {/* 🎵 音乐播放按钮 */}
            {audioSrc && (
                <div>
                    <audio ref={audioRef} src={audioSrc} />
                    <button
                        onClick={playMusic}
                        className="play-button hover:scale-105 transition-transform"
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
                            className="volume-slider"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default BirthdayCard;