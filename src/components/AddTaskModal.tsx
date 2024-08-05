import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import randomColor from "randomcolor";
import { createTask } from "../firebase";

type ModalProps = {
  setAddModal: (value: boolean) => void;
};

export const AddTaskModal = ({ setAddModal }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addTask = (e: FormEvent) => {
    e.preventDefault();
    createTask(
      uuidv4(),
      title,
      description,
      randomColor({
        alpha: 0.3,
        format: "rgba",
        luminosity: "light",
      }),
      false
    );

    setAddModal(false);
  };
  return (
    <div className="task-modal">
      <form onSubmit={addTask}>
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

        <button type="submit">Add Task</button>
        <button
          onClick={() => setAddModal(false)}
          type="button"
          style={{ backgroundColor: "#aa4444" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
