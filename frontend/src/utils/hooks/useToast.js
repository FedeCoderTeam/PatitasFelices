import { toast } from 'react-hot-toast';

const useToast = () => {
	const notify = (message, options) => {
		toast(message, options);
	};

	const success = (message, options) => {
		notify(message, {
			...options,
			icon: '✅',
			style: {
				borderRadius: '20px',
				background: '#333',
				color: '#fff',
			},
		});
	};

	const error = (message, options) => {
		notify(message, {
			...options,
			icon: '❌',
			style: {
				borderRadius: '20px',
				background: '#333',
				color: '#fff',
			},
		});
	};

	const warning = (message, options) => {
		notify(message, {
			...options,
			icon: '⚠️',
			style: {
				borderRadius: '20px',
				background: '#333',
				color: '#fff',
			},
		});
	};

	const loading = (message, options) => {
		notify(message, {
			...options,
			icon: '⏳',
			style: {
				borderRadius: '20px',
				background: '#333',
				color: '#fff',
			},
		});
	};

	return { success, error, warning, loading };
};

export default useToast;

//COMO USAR EL HOOK

//IMPORTARLO

// import useToast from '../../../hooks/useToast';  //ESTO VARIA SEGUN LA CARPETA DONDE SE INVOCA

//DECLARAR QUE TIPO NOTIFICACION VOY A USAR

// const { success } = useToast();

//DECLARAR UNA FUNCION QUE ENVIE EL MESANJE Y EL TIEMPO DE DURACION

// const handlerNotify = () => {
// 	success('Bien ahi pibes', { duration: 2000 });
// };

//COLOCAR UN EVENTO QUE DISPARE ESA FUNCION

//<button onClick={handlerNotify}>Felicitar</button>
