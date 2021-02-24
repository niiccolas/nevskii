import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  console.log({ session });
  if (session) {
    res.send({
      content:
        'A message from "api/secret/index.ts" Welcome to the secret page',
    });
  } else {
    res.send({
      error: 'You need to be signed in',
    });
  }
};
