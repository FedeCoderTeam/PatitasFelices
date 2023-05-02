export default function validation(input) {
	let errors = {};

	if (!input.password) {
		errors.password = 'La contraseña es obligatoria. *';
	}

	return errors;
}