import { NavLink } from "react-router-dom";

function Hero() {
    return (
        <div className="bg-blue-50 px-4 py-20 relative">
            <div className="container-xl lg:container m-auto text-center relative z-10">
                {/* 标题和个人简介 */}
                <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
                    Hi, I'm Frank Zhou!
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                    A passionate <span className="font-semibold text-indigo-500">Computer Science Student </span>
                    and aspiring software developer.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                    I'm currently pursuing a Bachelor of Science at the University of British Columbia, where I focus on developing
                    innovative and efficient software solutions. I enjoy solving problems, learning new technologies, and creating
                    impactful projects that make a difference.
                </p>

                {/* 按钮 */}
                <div className="flex justify-center space-x-4">
                    <NavLink
                        to="/projects"
                        className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
                    >
                        View My Projects
                    </NavLink>
                    <NavLink
                        to="/aboutme"
                        className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
                    >
                        About Me
                    </NavLink>
                    <NavLink
                        href="/Xuancheng_Zhou_Resume.pdf"
                        target="_blank"
                        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                    >
                        Download Resume
                    </NavLink>
                </div>

                {/* 座右铭 */}
                <blockquote className="text-xl italic text-gray-600 mt-10 mb-10">
                    "Strive not to be a success, but rather to be of value." – Albert Einstein
                </blockquote>

                {/* 技能展示 */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-indigo-500 mb-6">My Skills</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <span className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md text-sm font-semibold">
                            Java
                        </span>
                        <span className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md text-sm font-semibold">
                            Python
                        </span>
                        <span className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md text-sm font-semibold">
                            Kotlin
                        </span>
                        <span className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md text-sm font-semibold">
                            React.js
                        </span>
                        <span className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md text-sm font-semibold">
                            Node.js
                        </span>
                        <span className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md text-sm font-semibold">
                            Flask
                        </span>
                        <span className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md text-sm font-semibold">
                            SQLite
                        </span>
                        <span className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md text-sm font-semibold">
                            Git & GitHub
                        </span>
                    </div>
                </div>

                {/* My Hobbies & Interests Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-indigo-500 mb-6">My Hobbies & Interests</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Reading</h3>
                            <p className="text-gray-600">
                                I enjoy reading books on technology, personal development, and science fiction.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Traveling</h3>
                            <p className="text-gray-600">
                                Exploring new places and cultures inspires my creativity and broadens my perspective.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Gaming</h3>
                            <p className="text-gray-600">
                                I love playing strategy and simulation games in my free time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 背景装饰 */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-100 via-white to-blue-50 opacity-20 -z-10"></div>
            <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-100 rounded-full opacity-40 blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-200 rounded-full opacity-30 blur-2xl"></div>
        </div>
    )
}

export default Hero