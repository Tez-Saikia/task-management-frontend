import { useState, useEffect } from "react";
import "../styles/task.css";
import { LuSearch } from "react-icons/lu";
import TaskList from "../components/TaskList";
import CategorySlider from "../components/CategorySlider";
import Sidebar from "../components/Sidebar";
import { Task } from "../types";
import { fetchTasksAPI, createTask, deleteTaskAPI } from "../api/tasks";

interface HomeProps {
  localTasks: Task[];
  setLocalTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Home: React.FC<HomeProps> = ({ localTasks, setLocalTasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasksAPI();
        if (!Array.isArray(fetchedTasks))
          throw new Error("Fetched tasks is not an array");

        // ✅ Ensure we don't add duplicate tasks
        const uniqueTasks = Array.from(
          new Map(fetchedTasks.map((task) => [task.id, task])).values()
        );

        setLocalTasks(uniqueTasks); // Replace local state instead of merging
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setLocalTasks([]); // Fallback to an empty list
      }
    };

    getTasks();
  }, []); // ✅ Only runs once

  const handleAddTask = async (newTask: Partial<Task>) => {
    try {
      await createTask(newTask); // ✅ Backend updates the task list
      const updatedTasks = await fetchTasksAPI(); // ✅ Fetch updated list
      const uniqueTasks = Array.from(
        new Map(updatedTasks.map((task) => [task.id, task])).values()
      );
      setLocalTasks(uniqueTasks); // ✅ Ensure full sync
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskAPI(id); // ✅ Pass number directly
      const updatedTasks = await fetchTasksAPI();
      setLocalTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = localTasks.filter((task) => {
    const title = task.title?.toLowerCase() || "";
    const description = task.description?.toLowerCase() || "";
    const matchesSearch =
      title.includes(searchQuery.toLowerCase()) ||
      description.includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? task.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="home_container">
      <div className="row">
        <div className="search-container">
          <input
            className="search-box"
            type="text"
            placeholder="Search Project"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-icon">
            <LuSearch />
          </div>
        </div>
        <CategorySlider setFilterStatus={setFilterStatus} />
      </div>

      <div className="task-main-container">
        <Sidebar tasks={filteredTasks} addNewTask={handleAddTask} />
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          setLocalTasks={setLocalTasks}
        />
      </div>
    </div>
  );
};

export default Home;
