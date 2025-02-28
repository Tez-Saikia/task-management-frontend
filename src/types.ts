export type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  importance: "Low" | "High" | "Complete";
  status: "To Do" | "On Progress" | "Done";
};
