import axiosInstance from "./axios";

export const getMealsByUserId = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/meals/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching meals:", error);
        throw error;
    }
};

export const createMealForUser = async (userId: string, mealData: any) => {
    try {
        const response = await axiosInstance.post(`/meals/user/${userId}`, mealData);
        return response.data;
    } catch (error) {
        console.error("Error creating meal:", error);
        throw error;
    }
};

export const deleteMealById = async (mealId: string) => {
    try {
        const response = await axiosInstance.delete(`/meals/${mealId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting meal:", error);
        throw error;
    }
};
