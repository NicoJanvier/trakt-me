import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

async function handler(req: NextApiRequest,res: NextApiResponse) {
  const cookies = new Cookies(req, res);
  cookies.set('token');
  res.end();
}
export default handler;