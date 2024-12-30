import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api";

// 创建 Axios 实例，设置基础 URL 和默认配置
const apiClient = axios.create({
    baseURL: apiBaseUrl, // Flask 后端的 URL
    headers: {
        "Content-Type": "application/json", // 设置默认请求头
    },
});

// 获取项目列表
export const getProjects = async () => {
    try {
        const response = await apiClient.get("/projects"); // 发送 GET 请求到 /api/projects
        return response.data.projects; // 返回数据
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error; // 抛出错误以便前端处理
    }
};

// 获取项目
export const getSProjectByID = async (id) => {
    try {
        const response = await apiClient.get(`/projects/${id}`); // 发送 GET 请求到 /api/projects
        return response.data; // 返回数据
    } catch (error) {
        console.error(`Error fetching project with ID ${id}:`, error);
        throw error; // 抛出错误以便前端处理
    }
};