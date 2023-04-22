import useToast from '../../hooks/useToast';

export default function ViewA() {
	const { success, error, warning, loading } = useToast();

	const handlerNotify = () => {
		loading('Loading...', { duration: 2000 });

		setTimeout(() => {
			error('Error al crear', { duration: 2000 });
		}, 2000);

		setTimeout(() => {
			warning('Faltan datos', { duration: 2000 });
		}, 4000);

		setTimeout(() => {
			success('Creado con exito', { duration: 2000 });
		}, 6000);
	};

	return (
		<>
			<div>Este es View A</div>
			<button onClick={handlerNotify}>Felicitar</button>
		</>
	);
}
