import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
  const { user } = locals;
  console.log(user);
  
  try {
    // Fetch all donor data associated with the user from the database
    const donors = await prisma.donor.findMany({
      where: { donor_id: user.name }
    });


    // Return the sanitized donors in the response as an array
    return json(donors);
  } catch (error) {
    // Log the error and return a 500 Internal Server Error response
    console.error('Error fetching donors:', error);
    return json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
