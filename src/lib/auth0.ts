import { getSession } from '@auth0/nextjs-auth0';

export const getAuth0Session = async () => {
  return await getSession();
};

export const isAuthenticated = async () => {
  const session = await getAuth0Session();
  return !!session?.user;
}; 