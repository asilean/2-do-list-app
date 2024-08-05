import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { Dispatch, SetStateAction } from "react";
import { TaskRecord, TaskType } from "../App";

function getDB() {
  const firebaseConfig = {
    apiKey: "AIzaSyDeHtGarTHun5zKGop9EXK3hQO4336rzfE",
    authDomain: "do-list-react.firebaseapp.com",
    databaseURL:
      "https://do-list-react-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "do-list-react",
    storageBucket: "do-list-react.appspot.com",
    messagingSenderId: "176998716944",
    appId: "1:176998716944:web:d804d29e9b92ae8fd01c95",
  };
  const app = initializeApp(firebaseConfig);

  const database = getDatabase(app);
  return database;
}

export function createTask(
  id: string,
  title: string,
  description: string,
  bgColor: string,
  isCompleted: boolean
) {
  const db = getDB();
  set(ref(db, "todos/" + id), {
    id,
    title,
    description,
    bgColor,
    isCompleted,
  });
}

export function getTasks(setTasks: Dispatch<SetStateAction<TaskRecord>>) {
  const db = getDB();
  const dbRef = ref(db);
  get(child(dbRef, "todos/")).then((snapshot) => {
    if (snapshot.exists()) {
      setTasks(snapshot.val());
    }
  });
}

export function updateTask(task: TaskType) {
  const db = getDB();
  set(ref(db, "todos/" + task.id), {
    ...task,
  });
}

export function killTask(id: string) {
  const db = getDB();
  set(ref(db, "todos/" + id), null);
}
