import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTask } from "../api/tasks";
import successIcon from "../Imgs/successIcon.png";
import { Task } from "../types"; 

const TaskForm = ({ addNewTask }: { addNewTask: (task: Task) => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState<Task["importance"]>("Low");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTask = async () => {
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);

    const newTask: Partial<Task> = {
      title,
      description,
      deadline: deadline ? deadline.toISOString().split("T")[0] : "",
      importance,
      status: "To Do",
    };

    try {
      const createdTask = await createTask(newTask);
      addNewTask(createdTask);
      setShowSuccessMessage(true);
      setTitle("");
      setDescription("");
      setImportance("Low");
      setDeadline(null);
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {showForm && (
        <div className="task-form-modal">
          <div className="task-form">
            <div className="task-header">
              <div className="task-dot"></div>
              <h3 className="task-form-title">ADD TASK</h3>
              <select
                className="select-container"
                value={importance}
                onChange={(e) =>
                  setImportance(e.target.value as Task["importance"])
                }
              >
                <option className="select-options" value="Low">
                  Low
                </option>
                <option className="select-options" value="High">
                  High
                </option>
              </select>
            </div>
            <div className="task-line"></div>
            <div className="task-heading">
              <input
                type="text"
                placeholder="Task Title"
                className="task-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="task-form-line"></div>
            <textarea
              placeholder="Task description..."
              className="task-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="task-footer">
              <button
                className="deadline-btn"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {deadline
                  ? `Deadline: ${deadline.toDateString()}`
                  : "Set Deadline"}
              </button>
              <button
                className="assigned-btn"
                onClick={handleAddTask}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Task"}
              </button>
            </div>
            {showCalendar && (
              <div className="calendar-container">
                <DatePicker
                  selected={deadline}
                  onChange={(date) => {
                    setDeadline(date);
                    setShowCalendar(false);
                  }}
                  inline
                />
              </div>
            )}
            {showSuccessMessage && (
              <div className="success-modal">
                <div className="success-content">
                  <img src={successIcon} alt="Success" />
                  <p>New task has been created successfully!</p>
                  <button onClick={() => setShowSuccessMessage(false)}>
                    Back
                  </button>
                </div>
              </div>
            )}
            <button className="close-btn" onClick={() => setShowForm(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      <div className="add-btn-container">
        <button
          type="button"
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
