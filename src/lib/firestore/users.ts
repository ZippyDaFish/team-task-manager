import { db } from "../firebase/firebase.config";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export interface User {
    id?: string;
    name: string;
    email: string;
    orgId: string;
    role: string;
}

const usersCol = collection(db, "users");

export const createUser = async (user: User) => (await addDoc(usersCol, user)).id;
export const getUsers = async (): Promise<User[]> =>
    (await getDocs(usersCol)).docs.map(d => ({ id: d.id, ...d.data() } as User));
export const getUser = async (id: string): Promise<User | null> => {
    const d = await getDoc(doc(db, "users", id));
    return d.exists() ? { id: d.id, ...d.data() } as User : null;
};
export const updateUser = async (id: string, data: Partial<User>) => updateDoc(doc(db, "users", id), data);
export const deleteUser = async (id: string) => deleteDoc(doc(db, "users", id));