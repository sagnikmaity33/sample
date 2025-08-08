import type { NextApiRequest, NextApiResponse } from 'next';
// import { isAuthenticated } from '../../lib/auth0'; // Kept inactive

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    // If you want to re-enable Auth0 later:
    // const authenticated = await isAuthenticated(req, res);
    // if (!authenticated) {
    //   res.status(401).json({ error: 'Unauthorized' });
    //   return;
    // }

    // Example static response for now
    res.status(200).json({ message: 'User data will go here once Auth0 is enabled.' });
  } catch (error) {
    console.error('Error in /api/me:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
