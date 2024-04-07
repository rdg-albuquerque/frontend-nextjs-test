import { useState } from 'react';

import { IToastMessage } from '@/types/toast-message.d';

import styles from './style.module.css';
import { useToast } from '@/contexts/toast-context';

type ToastMessageProps = {
	content: IToastMessage;
};

export const ToastMessage: React.FC<ToastMessageProps> = ({ content: data }) => {
	const {removeToast} = useToast();

	const handleRemoveToast = () => {
		removeToast(data.id)
	}

	return (
		<div className={styles.container} data-toast-type={data.type} data-toast-id={data.id}>
			<span data-content>{data.message}</span>

			<span data-close onClick={handleRemoveToast}>╳</span>
		</div>
	);
};
