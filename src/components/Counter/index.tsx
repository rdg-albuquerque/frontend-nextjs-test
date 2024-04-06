import { useState, useEffect, useRef } from 'react';

type CounterProps = {
	initialCount: number;
};

export const Counter: React.FC<CounterProps> = ({ initialCount }) => {
	const [count, setCount] = useState(initialCount);
	const shouldEffectRun = useRef<boolean>(false);

	useEffect(() => {
		return () => { shouldEffectRun.current = true };
    }, [])

	useEffect(() => {
		if (!shouldEffectRun.current) return;
		console.log('Componente montado!');

		const onCounterMountEvent = new CustomEvent('onCounterMount');
		window.dispatchEvent(onCounterMountEvent);

		return () => {
			console.log('Componente desmontado!');

			const onCounterUnmountEvent = new CustomEvent('onCounterUnmount');
			window.dispatchEvent(onCounterUnmountEvent);
		};
	}, []);

	useEffect(() => {
		if (!shouldEffectRun.current) return;
		console.log('Componente atualizado!');

		const onCounterUpdateEvent = new CustomEvent<{count: number}>('onCounterUpdate', {
			detail: {count}
		})
		window.dispatchEvent(onCounterUpdateEvent);
	}, [count]);

	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
	};

	return (
		<div>
			<h2>Contador: {count}</h2>
			<button onClick={handleIncrement}>Incrementar +</button>
		</div>
	);
};
