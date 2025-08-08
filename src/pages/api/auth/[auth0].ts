import { getSession, Session } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get the current Auth0 session.
 * If req/res are not provided, will attempt to get the session without them.
 */
export const getAuth0Session = async (
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<Session | null | undefined> => {
  if (!req || !res) {
    return getSession(); // Allowed to return undefined
  }
  return getSession(req, res);
};

/**
 * Check if the user is authenticated.
 * Returns a boolean instead of relying on `any` or nullish checks.
 */
export const isAuthenticated = async (
  req?: NextApiRequest,
  res?: NextApiResponse
): Promise<boolean> => {
  const session = await getAuth0Session(req, res);
  return Boolean(session?.user);
};
