import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

// Create an Axios instance, set the base URL and default configuration
const apiClient = axios.create({
    baseURL: apiBaseUrl, // Flask backend URL
    headers: {
        "Content-Type": "application/json", // Setting the default request header
    },
});

// Get list of projects
export const getProjects = async () => {
    try {
        const response = await apiClient.get("/projects"); // send GET request to /api/projects
        return response.data.projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
};

// get specific project by ID
export const getSProjectByID = async (id) => {
    try {
        const response = await apiClient.get(`/projects/${id}`); // send GET request to /api/projects
        return response.data;
    } catch (error) {
        console.error(`Error fetching project with ID ${id}:`, error);
        throw error;
    }
};

// Get resume file from the backend
export const getResumeFile = async () => {
    try {
        // Send a GET request to the backend's /api/resume endpoint
        const response = await apiClient.get("/resume", {
            responseType: "blob", // Ensure the response is binary file data
        });

        // Return the .pdf file as a Blob object
        return new Blob([response.data], { type: "application/pdf" });
    } catch (error) {
        console.error("Error fetching the resume file:", error);
        throw error;
    }
};