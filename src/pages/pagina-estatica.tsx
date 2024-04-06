/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import { useEffect, useState } from 'react';

import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';
import { GetStaticProps } from 'next';

type ListProps = {
	list: ICity[]
}

export const getStaticProps: GetStaticProps<ListProps> = async () => {
	/* 
	Nota: A request abaixo irá funcionar em modo de desenvolvimento mas irá quebrar ao buildar
	a aplicação pois não podemos fazer uma request de dentro de getStaticProps para uma API route interna,
	já que getStaticProps roda no lado do servidor em tempo de build, então o endpoint da API ainda não
	existe no momento em que a página é gerada.
	Eu não entendi se faz parte do desafio resolver também esse problema, mas me parece que não,
	já que o intuito do fetch dentro de getStaticProps geralmente é fazer uma requisição para uma API externa.
	Mas de qualquer forma o que eu faria para resolver seria aplicar a lógica que gera dos dados que 
	está dentro do endpoint diretamente aqui, ou criar uma help function para retornar esses dados. 
	*/
	const response = await fetch('http://localhost:8080/api/cities/10');
	const data = await response.json();

	if (!response.ok) throw new Error('Erro ao obter os dados');

	return {
		props: { list: data },
		revalidate: 60
	}
}

export default function Lista({ list  } : ListProps) {

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de cidades</h2>

				<div data-list-container>
					{list.map((city) => (
						<div data-list-item key={city.id}>
							{city.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
