/**
 * @api {get} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que registre um usuário no array users
 * - A request deve receber apenas o método POST
 * - A request deve receber um body com os dados do usuário
 * - O body vai seguir a interface IUserCreate, removendo o id
 * - Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser, IUserCreate } from '@/types/user.d';
import { ApiMethod } from '@/decorators/method';

const validateSchema = (data: IUserCreate) => {
	// It would be nice to use zod or yup for this
	let response = {
		valid: false,
		error: '',
		data
	};

	if (!data.name) {
		response.error = "name is required";
		return response;
	}

	if (typeof data.name !== 'string') {
		response.error = "name must be string";
		return response;
	}

	if (!data.email) {
		response.error = "email is required";
		return response;
	}

	if (typeof data.email !== 'string') {
		response.error = "email must be string";
		return response;
	}

	if (typeof data.email !== 'string') {
		response.error = "email must be string";
		return response;
	}

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
		response.error = "email format is invalid";
		return response;
	}

	response.valid = true;
	return response;
}

const users: IUser[] = [];

export default ApiMethod('POST')(async (req: NextApiRequest, res: NextApiResponse) => {

	const userSchema = validateSchema(req.body);

	if (!userSchema.valid) {
		return res.status(400).json({message: userSchema.error});
	}

	if (users.find(user => user.email === userSchema.data.email)) {
		return res.status(400).json({
			code: 4,
			message: 'Email já está em uso'
		});
	}

	users.push({
		id: users.length + 1,
		...userSchema.data,
	});

	return res.status(201).json({message: 'Usuário criado!'});
})