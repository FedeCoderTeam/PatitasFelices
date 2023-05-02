export default function validation(input) {
	let errors = {};
	let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	let regexUrl = /^.*\.(jpg|jpeg|png)$/i;

	if (input.password && !regexPassword.test(input.password)) {
		errors.password = 'Debe tener mínimo 8 caracteres, una letra mayuscula y un número. *';
	}

	// if (input.image && !regexUrl.test(input.image.trim())) {
	// 	errors.image = 'La imagen no tiene un formato válido';
	// }

	return errors;
}