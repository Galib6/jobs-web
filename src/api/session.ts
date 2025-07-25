import { ISession } from '@modules/auth/lib/interfaces';
import { getServerAuthSession } from '@modules/auth/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface ISessionResponse {
  message: string;
  success: boolean;
  data: ISession;
}
export default function getSession(req: NextApiRequest, res: NextApiResponse<ISessionResponse>) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed', success: false, data: null });
    return;
  }

  const session = getServerAuthSession(req);

  res.status(200).json({ message: 'Session Get Successfully', success: true, data: session });
}
