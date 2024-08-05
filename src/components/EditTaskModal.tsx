import { FormEvent, useState } from "react";
import { TaskType } from "../App";
import { updateTask } from "../firebase";

type ModalProps = {
  setId: (value: null) => void;
  task: TaskType | undefined;
};

export const EditTaskModal = ({ setId, task }: ModalProps) => {
  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(
    task?.description || ""
  );
  const editTask = (e: FormEvent) => {
    e.preventDefault();
    if (!task) return;
    updateTask({ ...task, title, description });
    setId(null);
  };

  return (
    <div className="task-modal">
      <form onSubmit={editTask}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            name="title"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            name="description"
            value={description}
          />
        </div>

        <button type="submit">Save Task</button>
        <button
          onClick={() => setId(null)}
          type="button"
          style={{ backgroundColor: "#aa4444" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
