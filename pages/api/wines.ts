import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const wines = await prisma.wine.findMany();
    res.status(200).json(wines);
    const result =
      await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "Wines" (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      year INT NOT NULL,
      type ENUM ('Red', 'White', 'Rosé', 'WhiteBlend', 'RedBlend') NOT NULL,
      varietal ENUM ('CabernetSauvignon', 'Merlot', 'Shiraz', 'CheninBlanc', 'SauvignonBlanc', 'Verdelho', 'Chardonnay', 'Durif') NOT NULL,
      rating FLOAT,
      consumed BOOLEAN,
      dateConsumed TIMESTAMP
    );`;
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error creating table:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
