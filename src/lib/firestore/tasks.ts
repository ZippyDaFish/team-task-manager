import { db } from "../firebase/firebase.config";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

export interface Task {
    id?: string;
    name: string;
    projectId: string;
    description?: string;
    completed?: boolean;
}

const tasksCol = collection(db, "tasks");

export const createTask = async (task: Task) => (await addDoc(tasksCol, task)).id;
export const getTasks = async (): Promise<Task[]> =>
    (await getDocs(tasksCol)).docs.map(d => ({ id: d.id, ...d.data() } as Task));
export const getTask = async (id: string): Promise<Task | null> => {
    const d = await getDoc(doc(db, "tasks", id));
    return d.exists() ? { id: d.id, ...d.data() } as Task : null;
};
export const updateTask = async (id: string, data: Partial<Task>) => updateDoc(doc(db, "tasks", id), data);
export const deleteTask = async (id: string) => deleteDoc(doc(db, "tasks", id));

export const getTasksByProject = async (projectId: string): Promise<Task[]> => {
    const q = query(tasksCol, where("projectId", "==", projectId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Task));
};