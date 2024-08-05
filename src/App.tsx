import { useEffect, useRef, useState } from "react";
import { AddTaskModal } from "./components/AddTaskModal";
import { Task } from "./components/Task";
import { EditTaskModal } from "./components/EditTaskModal";
import { Eye, EyeOff } from "lucide-react";
import autoAnimate from "@formkit/auto-animate";
import { getTasks } from "./firebase";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  bgColor: string;
};

export interface TaskRecord {
  [key: string]: TaskType;
}

function App() {
  const [id, setId] = useState<string | null>(null);
  const [addmodal, setAddModal] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [tasks, setTasks] = useState<TaskRecord>({});
  useEffect(() => {
    getTasks(setTasks);
  }, [addmodal, id]);
  /* const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: 1,
      title: "Social Media",
      isCompleted: false,
      bgColor: randomColor({
        alpha: 0.3,
        format: "rgba",
        luminosity: "light",
      }),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi id quaerat magnam assumenda porro eum corporis quam et laudantium aspernatur.",
    },
    {
      id: 2,
      title: "Social Media",
      isCompleted: false,
      bgColor: randomColor({
        alpha: 0.3,
        format: "rgba",
        luminosity: "light",
      }),
      description:
        "adkljaskjdkasjdajkshdasjkdhkjasdaksjdhjashkdhaksdhashdhaskjdashdkashdksajkdjasjkdjkashdjkasdjkasbilalsjkfkshfshfsdkf",
    },
    {
      id: 3,
      title: "Social Media",
      isCompleted: false,
      bgColor: randomColor({
        alpha: 0.3,
        format: "rgba",
        luminosity: "light",
      }),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi id quaerat magnam assumenda porro eum corporis quam et laudantium aspernatur.",
    },
  ]); */

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <>
      {addmodal && <AddTaskModal setAddModal={setAddModal} />}

      {id != null && <EditTaskModal setId={setId} task={tasks[id]} />}

      <h1>Ertelemegeç</h1>
      <div className="show-completed">
        <button
          onClick={() => {
            setShowCompleted(!showCompleted);
          }}
        >
          {showCompleted ? <Eye /> : <EyeOff />}
        </button>
      </div>
      <div className="task-list" ref={parent}>
        {Object.keys(tasks).map((taskId) => (
          <Task
            showCompleted={showCompleted}
            setTasks={setTasks}
            task={tasks[taskId]}
            key={taskId}
            setId={setId}
          />
        ))}
        <button
          className="addtask"
          onClick={() => {
            setAddModal(true);
          }}
        >
          +
        </button>
      </div>
    </>
  );
}

export default App;
