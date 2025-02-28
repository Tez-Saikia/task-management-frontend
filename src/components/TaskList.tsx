import TaskItem from "./TaskItem";
import { Task } from "../types";
import { updateTaskAPI } from "../api/tasks";

const TaskList = ({
  tasks,
  deleteTask,
  setLocalTasks,
}: {
  tasks: Task[];
  deleteTask: (id: number) => Promise<void>;
  setLocalTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const updateTaskStatus = async (id: number, status: Task["status"]) => {
    try {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        const updatedImportance: Task["importance"] = status === "Done" ? "Complete" : "Low"; 
        const updatedTask: Task = { ...tasks[taskIndex], status, importance: updatedImportance };
  
        await updateTaskAPI(updatedTask);
  
        setLocalTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === id ? updatedTask : t))
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  

  return (
    <div className="task-list-container">
      {/* To Do Section */}
      <div className="to-do-container">
        <div className="todo-header">
          <div className="todo-dot"></div>
          <h3 className="todo-title">To Do</h3>
          <div className="todo-number">
            {tasks.filter((task) => task.status === "To Do").length}
          </div>
        </div>
        <div className="todo-margin"></div>
        {tasks
          .filter((task) => task.status === "To Do")
          .map((task) => (
            <TaskItem
              key={`task-${task.id}-${task.title}`}
              task={task}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          ))}
      </div>

      {/* On Progress Section */}
      <div className="on-progress-container">
        <div className="progress-header">
          <div className="progress-dot"></div>
          <h3 className="progress-title">On Progress</h3>
          <div className="progress-number">
            {tasks.filter((task) => task.status === "On Progress").length}
          </div>
        </div>
        <div className="progress-margin"></div>
        {tasks
          .filter((task) => task.status === "On Progress")
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          ))}
      </div>

      {/* Done Section */}
      <div className="done-container">
        <div className="done-header">
          <div className="done-dot"></div>
          <h3 className="done-title">Done</h3>
          <div className="done-number">
            {tasks.filter((task) => task.status === "Done").length}
          </div>
        </div>
        <div className="done-margin"></div>
        {tasks
          .filter((task) => task.status === "Done")
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskList;
