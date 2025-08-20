import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

// Create an Axios instance, set the base URL and default configuration
const apiClient = axios.create({
    baseURL: apiBaseUrl, // Flask backend URL
    headers: {
        "Content-Type": "application/json", // Setting the default request header
    },
});

// get person info
export const getBirthdayPersonInfo = async (personName) => {
    try {
        const response = await apiClient.post("/birthday", { friend_name: personName }); // send POST requset
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
};