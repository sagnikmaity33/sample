import { getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from '@auth0/nextjs-auth0';

// Explicit return type: Promise<Session | null>
export const getAuth0Session = async (
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<Session | null> => {
  if (req && res) {
    return await getSession(req, res);
  }
  return await getSession(); // overload without req/res
};

// Explicit return type: Promise<boolean>
export const isAuthenticated = async (
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<boolean> => {
  const session = await getAuth0Session(req, res);
  return Boolean(session?.user);
};
