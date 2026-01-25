
import axiosInstance from "./axios";

export const getUser = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null;
}


export const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post("/login", { email, password });
        const { id, token } = response.data;
        localStorage.setItem("user", JSON.stringify({ id, token }));
        return { id, token };


    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    localStorage.removeItem("user");
}


export async function verifyEmailCode(email: string, code: string) {
    try {
        const response = await axiosInstance.post("/verify-email", { email, code });
        return response.data;
    } catch (error) {
        throw error;
    }
}
