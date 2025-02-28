import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskForm from "./components/TaskForm";
import { Task } from "./types";
import { useState } from "react";

function App() {
  const [localTasks, setLocalTasks] = useState<Task[]>([]);

  const addNewTask = (newTask: Task) => {
    setLocalTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home localTasks={localTasks} setLocalTasks={setLocalTasks} />}
      />
      <Route path="/tasks" element={<TaskForm addNewTask={addNewTask} />} />
    </Routes>
  );
}

export default App;
