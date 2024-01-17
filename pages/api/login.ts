import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
