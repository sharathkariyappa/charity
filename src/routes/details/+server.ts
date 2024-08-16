import { json } from '@sveltejs/kit';

import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';
import { prisma } from '$lib/server/prisma';

export async function POST({ request ,cookies}) {
    try {
        const body = await request.json();
		console.log('body',body);
       const email_cookie = cookies.get('email');
        console.log(body,email_cookie);
        
        const userUpdateData = {
			where: {
			  email: email_cookie
			},
			data: {
			  phoneNumber: body.phoneNumber,
			  address: body.address,
			  employment: body.employment,
			  salary: body.salary,
			  dateOfBirth: "2001-12-12T00:00:00Z", // Adjusted to include time and timezone
			  emailVerified: true
			}
		  };
		  
		await prisma.user.update(userUpdateData);
		  

		cookies.set('email', '', {
			httpOnly: false,
			path: '/',
			secure: process.env.NODE_ENV !== 'development',
			maxAge: 0 
		  });

		

        return json({ status:'succes' });
    } catch (error) {
        return json({ message: error.message }, { status: 500 });
    }
}
