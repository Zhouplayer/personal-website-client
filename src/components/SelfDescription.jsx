import React from 'react'

function SelfDescription() {
    return (
        <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 px-6 py-16">
            <div className="container mx-auto max-w-5xl text-center">
                {/* About Me Section */}
                <section className="mb-16">
                    <h1 className="text-5xl font-bold text-indigo-600 mb-6">About Me</h1>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Hello! My name is <strong>Frank Zhou</strong>. I am a passionate computer science student pursuing a Bachelor of Science in Computer Science at the University of British Columbia.
                        With a strong foundation in software development, I specialize in creating innovative solutions that are both functional and efficient.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        I have experience in developing applications using Java, Python, and Kotlin, and I am always eager to learn and collaborate on exciting projects.
                        I am fluent in English, French, and Mandarin, and I enjoy working in diverse environments.
                    </p>
                </section>

                {/* Education Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-8">Education</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">University of British Columbia</h3>
                            <p className="text-gray-600">Vancouver, BC</p>
                            <p className="text-gray-700">Bachelor of Science: Computer Science Major</p>
                            <p className="text-gray-500 text-sm">Graduating April 2028</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Kwantlen Polytechnic University</h3>
                            <p className="text-gray-600">Surrey, BC</p>
                            <p className="text-gray-700">Bachelor of Technology: Information Technology</p>
                            <p className="text-gray-500 text-sm">2023 - 2024</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Cégep Gérald-Godin</h3>
                            <p className="text-gray-600">Montreal, QC</p>
                            <p className="text-gray-700">Diploma of Collegial Studies in Computer Techniques</p>
                            <p className="text-gray-500 text-sm">2020 - 2023</p>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-8">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Personal Finance Manager</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Achieved maintainability using MVC, ensuring streamlined structure.</li>
                                <li>Developed a functional app with JavaFX, enhancing UI responsiveness.</li>
                                <li>Managed data with SQLite and DAO, improving data retrieval speed.</li>
                                <li>Ensured reliability by facilitating testing, reducing bugs.</li>
                            </ul>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Super Slot Machine</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Leveraged ConstraintLayout and RecyclerView for enhanced usability.</li>
                                <li>Used Kotlin collections for data efficiency, ensuring smooth display.</li>
                                <li>Optimized interaction with View Binding and listeners for a better experience.</li>
                                <li>Supported multiple languages for seamless adaptability.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Volunteer Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-8">Volunteer Experience</h2>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-left">
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li><strong>Water Distributor</strong> | Race Event (2022)</li>
                            <li><strong>Donation Packer</strong> | Ecole secondaire Dorval Jean XXIII, Dorval, QC (2022)</li>
                            <li><strong>Donation Packer</strong> | Maxi, Dorval, QC (2022)</li>
                        </ul>
                    </div>
                </section>

                {/* Technical Skills Section */}
                <section>
                    <h2 className="text-3xl font-bold text-indigo-500 mb-8">Technical Skills</h2>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-left">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-indigo-600 mb-4">Programming Languages:</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Java</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Python</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">C/C++</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Kotlin</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">SQL</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">JavaScript</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Bash</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-indigo-600 mb-4">Frameworks:</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">React</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Node.js</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Flask</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-indigo-600 mb-4">Developer Tools:</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Git</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">MacOS</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Linux</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">VS Code</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Visual Studio</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Android Studio</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">IntelliJ</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Eclipse</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-indigo-600 mb-4">Languages:</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">English</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">French</span>
                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">Chinese (Mandarin)</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SelfDescription