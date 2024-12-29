import { useState, useEffect } from "react"
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
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
                <section>
                    <div className='container m-auto py-6 px-6'>
                        <Link
                            to='/projects'
                            className='text-indigo-500 hover:text-indigo-600 flex items-center'
                        >
                            <FaArrowLeft className='mr-2' /> Back to Project Listings
                        </Link>
                    </div>
                </section>

                <section className='bg-indigo-50'>
                    <div className='container m-auto py-10 px-6'>
                        <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                            <main>
                                <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                                    <div className='text-gray-500 mb-4'>{project.type}</div>
                                    <h1 className='text-3xl font-bold mb-4'>{project.title}</h1>
                                    <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                                        <FaMapMarker className='text-orange-700 mr-1' />
                                        <p className='text-orange-700'>{project.location}</p>
                                    </div>
                                </div>

                                <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                                    <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                                        Project Description
                                    </h3>

                                    <p className='mb-4'>{project.description}</p>

                                    <h3 className='text-indigo-800 text-lg font-bold mb-2'>
                                        Salary
                                    </h3>

                                    <p className='mb-4'>{project.salary} / Year</p>
                                </div>
                            </main>

                            {/* <!-- Sidebar --> */}
                            <aside>
                                <div className='bg-white p-6 rounded-lg shadow-md'>
                                    <h3 className='text-xl font-bold mb-6'>Company Info</h3>

                                    <h2 className='text-2xl'>{project.company.name}</h2>

                                    <p className='my-2'>{project.company.description}</p>

                                    <hr className='my-4' />

                                    <h3 className='text-xl'>Contact Email:</h3>

                                    <p className='my-2 bg-indigo-100 p-2 font-bold'>
                                        {project.company.contactEmail}
                                    </p>

                                    <h3 className='text-xl'>Contact Phone:</h3>

                                    <p className='my-2 bg-indigo-100 p-2 font-bold'>
                                        {' '}
                                        {project.company.contactPhone}
                                    </p>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </>
        )
    )
}

export default ProjectPage