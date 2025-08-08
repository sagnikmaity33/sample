import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH !== 'false';

  try {
    if (bypassAuth) {
      return res.status(200).json({ user: { name: 'Test User', email: 'test@example.com' } });
    }

    const session = await getSession(req, res);
    
    if (session?.user) {
      return res.status(200).json({ user: session.user });
    } else {
      return res.status(401).json({ error: 'Not authenticated' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
}


