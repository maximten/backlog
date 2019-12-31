import { NextApiRequest, NextApiResponse } from 'next';
import * as path from 'path';
import * as fs from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const dataPath = path.resolve('./data/data.json');
  if (req.method === 'POST') {
    const { body } = req;
    const data = JSON.stringify(body);
    fs.writeFileSync(dataPath, data);
    res.write(data);
  } else {
    const data = fs.readFileSync(dataPath);
    res.write(data);
  }
  res.end();
};
