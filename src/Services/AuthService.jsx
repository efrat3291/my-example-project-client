import axios from "axios";

const API_URL = "http://localhost:3000";

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`,
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
        );
        const token = response.data.token;

        localStorage.setItem('authToken', token);
        return token;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}