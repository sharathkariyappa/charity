import { RegisterUserSchema, type RegisterUserInput } from '$lib/validations/user.schema.js';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';
import { prisma } from '$lib/server/prisma';

export async function POST({ request,cookies }) {
	try {
		const body = (await request.json()) as RegisterUserInput;
		const data = RegisterUserSchema.parse(body);

		const hashedPassword = await bcrypt.hash(data.password, 12);
		const cookieOptions = {
			httpOnly: false,
			path: '/',
			secure: process.env.NODE_ENV !== 'development',
			maxAge: 12000000000
		};

		const user = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
				photo: data.photo
			}
		})
		
		cookies.set('email',data.email.toString(), cookieOptions);
		console.log(cookies.get('email'));
		return json({ status: 'success', data: { ...user, password: undefined } }, { status: 201 });
	} catch (error: any) {
		if (error instanceof ZodError) {
			return json({ message: 'failed validations', error: error.flatten() }, { status: 400 });
		}

		if (error.code === 'P2002') {
			return json({ message: 'user with that email already exists' }, { status: 409 });
		}

		return json({ message: error.message }, { status: 500 });
	}
}
