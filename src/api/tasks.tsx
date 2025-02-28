import { Task } from "../types";

// Use relative URL in development, full URL in production
const API_URL =
  import.meta.env.MODE === "development"
    ? "/api/tasks" // Uses Vite proxy for local development
    : "https://task-manager-backend-upfr.onrender.com/api/tasks";

export const fetchTasksAPI = async (): Promise<Task[]> => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("Fetched data:", data);
    if (!Array.isArray(data)) {
      throw new Error("Fetched tasks is not an array");
    }
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  try {
    console.log("Sending task to backend:", task);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    console.log("Response from backend:", data);
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTaskAPI = async (updatedTask: Task): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}/${updatedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTaskAPI = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
