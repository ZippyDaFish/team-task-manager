import { db } from "../firebase/firebase.config";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

export interface Project {
    id?: string;
    name: string;
    orgId: string;
    description?: string;
}

const projectsCol = collection(db, "projects");

export const createProject = async (project: Project) => (await addDoc(projectsCol, project)).id;
export const getProjects = async (): Promise<Project[]> =>
    (await getDocs(projectsCol)).docs.map(d => ({ id: d.id, ...d.data() } as Project));
export const getProject = async (id: string): Promise<Project | null> => {
    const d = await getDoc(doc(db, "projects", id));
    return d.exists() ? { id: d.id, ...d.data() } as Project : null;
};
export const updateProject = async (id: string, data: Partial<Project>) => updateDoc(doc(db, "projects", id), data);
export const deleteProject = async (id: string) => deleteDoc(doc(db, "projects", id));



export const getProjectsByOrg = async (orgId: string): Promise<Project[]> => {
  const q = query(collection(db, "projects"), where("orgId", "==", orgId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};