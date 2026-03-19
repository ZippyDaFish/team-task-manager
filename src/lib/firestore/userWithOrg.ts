import { db } from "../firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import type { User, Org, UserWithOrg } from "./types.ts";

export const fetchUserWithOrg = async (uid: string): Promise<UserWithOrg | null> => {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (!userDoc.exists()) return null;

  const user = { id: userDoc.id, ...userDoc.data() } as User;

  let org: Org | null = null;
  if (user.orgId) {
    const orgDoc = await getDoc(doc(db, "orgs", user.orgId));
    if (orgDoc.exists()) {
      org = { id: orgDoc.id, ...orgDoc.data() } as Org;
    }
  }

  return { user, org };
};