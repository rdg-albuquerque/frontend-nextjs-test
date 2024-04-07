/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */

import { useState } from 'react';
import Head from 'next/head';

import styles from '@/styles/modal.module.css';
import { Modal } from '@/components/Modal';

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	function handleModalConfirm() {
		setModalIsOpen(false);
		alert('confirmado');
	}

	function handleModalClose() {
		setModalIsOpen(false);
	}

	return (
		<>
			<main className={styles.container}>
				<button type="button" onClick={() => setModalIsOpen(true)}>
					Abrir modal de confirmação
				</button>
			</main>

			{/* Renderizar modal de confirmação */}
			{/* Nota: Eu realmente não entendi esse desafio, a descrição acima diz para
			'criar' um componente para o modal de confirmação, porém já temos um modal
			reutilizável. Seria esse componente um outro modal ou está se referindo a 
			um componente filho do modal para o conteúdo? Eu realmente to bem perdido aqui :/
			*/}
			<Modal 
				isOpen={modalIsOpen}
				title="Confirmação"
				onClose={handleModalClose}
				onConfirm={handleModalConfirm}
				footer={{ confirmText: 'Confirmar' }}
			>
				<ModalContent />
			 </Modal>
		</>
	);
}

const ModalContent: React.FC = () => {
	return <div className={styles.container}>Content goes here</div>
}
