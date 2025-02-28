import { Task } from "../types"; 

const TaskItem = ({
  task,
  updateTaskStatus,
  deleteTask, 
}: {
  task: Task;
  updateTaskStatus: (id: number, newStatus: Task["status"]) => void;
  deleteTask: (id: number) => void; // Function to delete task
}) => {
  return (
    <div className="task-todo-card">
      {/* Importance & Status in Same Line */}
      <div className="task-header">
        <div
          className="task-importance"
          style={{
            backgroundColor:
              task.importance === "Complete"
                ? "rgba(131, 194, 157, 0.21)"
                : task.importance === "High"
                ? "rgba(216, 114, 125, 0.10)"
                : "rgba(223, 168, 116, 0.2)",
            color:
              task.importance === "Complete"
                ? "#68B266"
                : task.importance === "High"
                ? "#D8727D"
                : "#D58D49",
            width: task.importance === "Complete" ? "4rem" : "2rem",
            textAlign: "center",
          }}
        >
          <span>{task.importance}</span>
        </div>

        {/* Always Visible Status Dropdown */}
        <select
          value={task.status}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "delete") {
              deleteTask(task.id); 
            } else {
              updateTaskStatus(task.id, value as Task["status"]); 
            }
          }}
          className="task-status-dropdown"
        >
          <option className="task-item-options" value="To Do">
            To Do
          </option>
          <option className="task-item-options" value="On Progress">
            On Progress
          </option>
          <option className="task-item-options" value="Done">
            Done
          </option>
          <option className="task-item-options" disabled>
            ──────────
          </option>
          <option className="task-delete" value="delete">
            ✖ Remove Task
          </option>
        </select>
      </div>

      <h3 className="task-todo-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <p className="task-todo-deadline">
        <strong>Deadline:</strong> {task.deadline}
      </p>
    </div>
  );
};

export default TaskItem;
