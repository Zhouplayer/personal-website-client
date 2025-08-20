import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa"


function ProjectListing({ project }) {

    const [showFullDescription, setShowFullDescription] = useState(false);
    let description = project.description;

    if (!showFullDescription) {
        description = description.substring(0, 90) + '...';
    }

    return (
        <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
                {/* project title and type */}
                <div className="mb-6">
                    <div className='text-gray-600 my-2'>{project.type}</div>
                    <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                </div>

                {/* project description */}
                <div className="mb-5">
                    <h4 className="text-indigo-500 text-lg font-bold mb-2">Description:</h4>
                    <p className="text-gray-700">
                        {showFullDescription ? description : `${description.slice(0, 100)}...`}
                    </p>
                    <button
                        onClick={() => setShowFullDescription((prevState) => !prevState)}
                        className="text-indigo-500 mt-3 hover:text-indigo-600"
                    >
                        {showFullDescription ? "Show Less" : "Show More"}
                    </button>
                </div>

                <div className="border border-gray-100 mb-5"></div>
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    {/* project status */}
                    <div
                        className={`text-sm font-medium mb-3 lg:mb-0 ${project.status === "Completed" ? "text-green-600" : "text-yellow-600"
                            }`}
                    >
                        <FaCheckCircle
                            className={`inline text-lg mb-1 mr-1 ${project.status === "Completed" ? "text-green-500" : "text-yellow-500"
                                }`}
                        />
                        Status: {project.status}
                    </div>

                    {/* Read More link */}
                    <NavLink
                        to={`/projects/${project.id}`}
                        className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm whitespace-nowrap"
                    >
                        Read More
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default ProjectListing