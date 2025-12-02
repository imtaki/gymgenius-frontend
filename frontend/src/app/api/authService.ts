
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
        document.cookie = `userId=${id}; path=/; secure; samesite=strict;`;
        return { id, token };


    } catch (error) {
        throw error;
    }
    return null;
};

export const logout = async () => {
    localStorage.removeItem("user");
}
