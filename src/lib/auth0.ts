import { getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from '@auth0/nextjs-auth0';

// This function is designed to work in API routes with req/res context
export const getAuth0Session = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Session | null | undefined> => {
  return await getSession(req, res);
};

// Check if user is authenticated in API route context
export const isAuthenticated = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> => {
  const session = await getAuth0Session(req, res);
  return Boolean(session?.user);
};
