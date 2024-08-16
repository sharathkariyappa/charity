import { json } from '@sveltejs/kit';

import { prisma } from '$lib/server/prisma';

export async function POST({ request ,cookies}) {
    try {
        const body = await request.json();
		console.log('body',body);
        
        const userUpdateData = {
			where: {
			  id: body.txid
			},
			data: {
            proof:body.proof,
			}
		  };
		  
		await prisma.donor.update(userUpdateData);
		  

		
		

        return json({ status:'succes' });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}
