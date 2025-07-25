import { accessTokenKey, authTokenKey, refreshTokenKey } from '@modules/auth/lib/constants';
import type { NextApiRequest, NextApiResponse } from 'next';

export type ILogoutResponse = {
  message: string;
  success: boolean;
};
export default function logout(req: NextApiRequest, res: NextApiResponse<ILogoutResponse>) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed', success: false });
    return;
  }

  // Clear the cookie
  const hostname = new URL(req.headers.origin).hostname;
  const domain = hostname.split('.').slice(-2).join('.');
  res.setHeader('Set-Cookie', [
    `${authTokenKey}=; Domain=${hostname}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    `${accessTokenKey}=; Domain=${domain}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    `${refreshTokenKey}=; Domain=${domain}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
  ]);

  res.status(200).json({ message: 'Logout Successfully', success: true });
}
