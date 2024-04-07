/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser } from '@/types/user.d';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { ApiMethod } from '@/decorators/method';

export default ApiMethod('GET')(async (req: NextApiRequest, res: NextApiResponse) => {
	const users: Array<IUser> = Array.from({length: 10}, (a, b) => b + 1)
	.map((id) => {
		const fullName = faker.person.fullName();
		const [firstName, lastName] = fullName.split(' ');
		return {
			id,
			name: fullName,
			email: faker.internet.email({firstName, lastName}).toLowerCase(),
		}
	})
	.sort((a, b) => a.id - b.id);

	return res.status(200).json(users);
});

