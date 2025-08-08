import { getSession } from '@auth0/nextjs-auth0';

export const getAuth0Session = async (req: any, res: any) => {
  return await getSession(req, res);
};

export const isAuthenticated = async (req: any, res: any) => {
  const session = await getAuth0Session(req, res);
  return !!session?.user;
};