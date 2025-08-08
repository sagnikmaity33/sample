import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH !== 'false';

  try {
    if (bypassAuth) {
      res.status(200).json({ user: { name: 'Test User', email: 'test@example.com' } });
      return;
    }

    // If you want to re-enable Auth0 later:
    // const { getSession } = await import('@auth0/nextjs-auth0');
    // const session = await getSession(req, res);
    // if (session?.user) {
    //   res.status(200).json({ user: session.user });
    //   return;
    // }

    res.status(401).json({ error: 'Not authenticated' });
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
