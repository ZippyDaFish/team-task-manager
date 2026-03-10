import { db } from "../firebase/firebase.config";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export interface Org {
    id?: string;
    name: string;
    ownderUid: string;
}

const orgsCol = collection(db, "orgs");

export const createOrg = async (org: Org) => (await addDoc(orgsCol, org)).id;
export const getOrgs = async (): Promise<Org[]> =>
    (await getDocs(orgsCol)).docs.map(d => ({ id: d.id, ...d.data() } as Org));
export const getOrg = async (id: string): Promise<Org | null> => {
    const d = await getDoc(doc(db, "orgs", id));
    return d.exists() ? { id: d.id, ...d.data() } as Org : null;
};
export const updateOrg = async (id: string, data: Partial<Org>) => updateDoc(doc(db, "orgs", id), data);
export const deleteOrg = async (id: string) => deleteDoc(doc(db, "orgs", id));