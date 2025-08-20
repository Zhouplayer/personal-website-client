import { useState, useEffect } from "react"
import { FaArrowLeft, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getSProjectByID } from "../api/Projects"
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function ProjectPage() {

    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getSProjectByID(id);
                setProject(data);
            } catch (error) {
                console.log("Fetch error data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    return (
        loading ? (
            <div className="flex justify-center items-center h-60">
                <Spinner loading={loading} />
            </div>
        ) : (
            <>
                {/* Back to Project Listings */}
                <section>
                    <div className="container m-auto py-6 px-6">
                        <Link
                            to="/projects"
                            className="text-indigo-500 hover:text-indigo-600 flex items-center"
                        >
                            <FaArrowLeft className="mr-2" /> Back to Project Listings
                        </Link>
                    </div>
                </section>

                {/* Main Content */}
                <section className="bg-indigo-50 py-10">
                    <div className="container m-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Left Section - Project Details */}
                            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                                {/* Project Title */}
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                    {project.title}
                                </h1>

                                {/* Project Category */}
                                <div className="text-gray-500 text-sm mb-4">
                                    Category: {project.category}
                                </div>

                                {/* Project Status */}
                                <div
                                    className={`text-sm font-medium mb-4 ${project.status === "Completed"
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                        }`}
                                >
                                    <FaCheckCircle
                                        className={`inline text-lg mr-1 ${project.status === "Completed"
                                            ? "text-green-500"
                                            : "text-yellow-500"
                                            }`}
                                    />
                                    Status: {project.status}
                                </div>

                                {/* Project Completion Date */}
                                <div className="text-gray-600 text-sm mb-6">
                                    <FaCalendarAlt className="inline text-indigo-500 mr-1" />
                                    Completed: {project.completedDate || "N/A"}
                                </div>

                                {/* Project Description */}
                                <h3 className="text-indigo-800 text-lg font-bold mb-4">
                                    Project Description
                                </h3>
                                <p className="text-gray-700 mb-6">{project.description}</p>

                                {/* Tech Stack */}
                                <h3 className="text-indigo-800 text-lg font-bold mb-4">
                                    Tech Stack
                                </h3>
                                <ul className="list-disc pl-5 text-gray-700 mb-6">
                                    {project.techStack?.map((tech, index) => (
                                        <li key={index} className="mb-2">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>

                                {/* Tools Used */}
                                <h3 className="text-indigo-800 text-lg font-bold mb-4">
                                    Tools Used
                                </h3>
                                <ul className="list-disc pl-5 text-gray-700">
                                    {project.tools?.map((tool, index) => (
                                        <li key={index} className="mb-2">
                                            {tool}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right Section - Enhanced Layout */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-8">
                                {/* Project Links */}
                                <div>
                                    <h3 className="text-indigo-800 text-lg font-bold mb-4">
                                        Project Links
                                    </h3>
                                    <div className="flex flex-col space-y-4">
                                        {project.repositoryLink && (
                                            <a
                                                href={project.repositoryLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="h-[36px] bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm text-center"
                                            >
                                                GitHub Repository
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Current Status Section */}
                                <div>
                                    <h3 className="text-indigo-800 text-lg font-bold mb-4">
                                        Current Status
                                    </h3>
                                    <div
                                        className={`w-full p-4 rounded-lg text-center ${project.status === "Completed"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"
                                            }`}
                                    >
                                        {project.status}
                                    </div>
                                    <p className="text-gray-600 text-sm mt-2">
                                        The project is currently marked as{" "}
                                        <span
                                            className={`font-bold ${project.status === "Completed"
                                                ? "text-green-600"
                                                : "text-yellow-600"
                                                }`}
                                        >
                                            {project.status}
                                        </span>
                                        . Check the repository for details.
                                    </p>
                                </div>

                                {/* Completion Date Section */}
                                <div>
                                    <h3 className="text-indigo-800 text-lg font-bold mb-4">
                                        Completion Date
                                    </h3>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <FaCalendarAlt className="text-indigo-500 mr-2" />
                                        {project.completedDate || "N/A"}
                                    </div>
                                    <p className="text-gray-600 text-sm mt-2">
                                        The project was completed on the specified date or
                                        is expected to be done by the mentioned timeline.
                                    </p>
                                </div>

                                {/* Visual Design Section */}
                                <div>
                                    <h3 className="text-indigo-800 text-lg font-bold mb-4">
                                        Visual Design
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {project.visualDesign}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    )
}

export default ProjectPage