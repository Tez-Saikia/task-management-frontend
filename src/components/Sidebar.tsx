import TaskForm from "./TaskForm";
import ExpiredTaskIcon from "../Imgs/Expired-Task.png";
import ActiveTaskIcon from "../Imgs/Active-Task.png";
import CompletedTaskIcon from "../Imgs/Complete-Task.png";

type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  importance: "Low" | "High" | "Complete";
  status: "To Do" | "On Progress" | "Done";
};

const Sidebar = ({
  tasks = [], 
  addNewTask,
}: {
  tasks?: Task[];
  addNewTask: (task: Task) => void;
}) => {
  const today = new Date().toISOString().split("T")[0];

  const expiredTasks = tasks.filter(
    (task) => task.deadline < today && task.status !== "Done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) =>
      task.deadline >= today &&
      (task.status === "To Do" || task.status === "On Progress")
  ).length;

  const completedTasks = tasks.filter((task) => task.status === "Done").length;

  const TasksDetails = [
    {
      id: 1,
      icon: ExpiredTaskIcon,
      title: "Expired Tasks",
      count: expiredTasks,
    },
    {
      id: 2,
      icon: ActiveTaskIcon,
      title: "Pending Tasks",
      count: pendingTasks,
    },
    {
      id: 3,
      icon: CompletedTaskIcon,
      title: "Completed Tasks",
      count: completedTasks,
    },
  ];

  return (
    <div className="sidebar-container">
      {TasksDetails.map((task) => (
        <div key={task.id} className="task-card">
          <img src={task.icon} alt={task.title} className="task-icon" />
          <span className="task-title">{task.title}</span>
          <span className="task-count">{task.count}</span>
        </div>
      ))}
      <TaskForm addNewTask={addNewTask} />
    </div>
  );
};

export default Sidebar;
