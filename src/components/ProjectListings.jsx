import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { getProjects } from '../api/Projects'
import ProjectListing from "./ProjectListing";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.log("Fetch error data", error);
            } finally {
                setLoading(false);
            }

        }

        fetchProjects();
    }, []);

    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                {/* Title */}
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    My Projects
                </h2>

                {/* Projects Grid */}

                {loading ? (
                    <div className="flex justify-center items-center h-60">
                        <Spinner loading={loading} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {
                            projects.map((project) => (
                                <ProjectListing key={project.id} project={project} />
                            ))
                        }
                    </div>
                )}


            </div>
        </section>
    );
}

export default Projects;