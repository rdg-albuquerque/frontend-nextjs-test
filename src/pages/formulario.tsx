/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import styles from '@/styles/formulario.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
	name: string
	email: string
}

export default function Form() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>()

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		try {
			const response = await fetch('/api/users/create', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				}
			});
	
			if (!response.ok) {
				const error = await response.json();
				if (error.code === 4) {
					return alert(error.message)
				}
				throw new Error('Houve um erro ao criar a conta')
			}
			reset();
			alert('Conta criada com sucesso')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input {...register('name', {required: 'O campo nome é obrigatório'})} type="text" placeholder="Name" />
					{errors.name && (
						<span role="alert">{errors.name.message}</span>
					)}
					<input {...register('email', {
						required: "O campo e-mail é obrigatório",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "E-mail inválido"
						  }
					})}
						type='email' 
					 	placeholder="E-mail" 
					/>
					{errors.email && (
						<span role="alert">{errors.email.message}</span>
					)}

					<button type="submit" data-type="confirm">
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}
