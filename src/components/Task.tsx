import { CircleCheckBig, CircleX, Pencil, Trash2 } from "lucide-react";
import { TaskRecord, TaskType } from "../App";
import { Dispatch, SetStateAction } from "react";
import { getTasks, killTask, updateTask } from "../firebase";

type TaskProps = {
  task: TaskType;
  setId: (value: string) => void;
  setTasks: Dispatch<SetStateAction<TaskRecord>>;
  showCompleted: boolean;
};
export const Task = ({ setId, task, setTasks, showCompleted }: TaskProps) => {
  const completeTask = () => {
    updateTask({
      ...task,
      isCompleted: !task.isCompleted,
    });
    getTasks(setTasks);
  };

  const deleteTask = () => {
    killTask(task.id);
    getTasks(setTasks);
  };
  if (!showCompleted && task.isCompleted) {
    return null;
  }
  return (
    <div className="task" style={{ backgroundColor: task.bgColor }}>
      <h2>{task.title}</h2>

      <p>{task.description}</p>
      <div className="task-actions">
        <button
          onClick={function () {
            setId(task.id);
          }}
        >
          <Pencil size={20} />
        </button>
        <button onClick={deleteTask}>
          <Trash2 size={20} />
        </button>

        <button onClick={completeTask}>
          {task.isCompleted ? (
            <CircleX size={20} />
          ) : (
            <CircleCheckBig size={20} />
          )}
        </button>
      </div>
    </div>
  );
};
