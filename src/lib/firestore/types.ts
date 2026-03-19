export interface User {
  id?: string;
  name: string;
  email: string;
  orgId: string;
  role: string;
}

export interface Org {
  id?: string;
  name: string;
  description?: string;
}

export interface UserWithOrg {
  user: User;
  org: Org | null;
}