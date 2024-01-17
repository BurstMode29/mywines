import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Example data, replace with actual data
    const wineData = {
      name: 'Example Wine',
      year: 2022,
      type: 'Red',
      varietal: 'CabernetSauvignon',
      rating: 4.5,
      consumed: true,
      dateConsumed: new Date(),
    };

    // Use Prisma to create a new record in the "Wines" table
    const createdWine = await prisma.wine.create({
      data: wineData,
    });

    return res.status(200).json({ createdWine });
  } catch (error) {
    console.error('Error adding wine:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
