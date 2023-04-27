export default function validation(input) {
	let errors = {};
	let regexName = /^[A-Za-z ]{4,}$/;
    let regexDescription = /^[A-Za-z ]{10,}$/;
	let regexStock = /^[1-9][0-9]*$/;
	let regexUrl = /^.*\.(jpg|jpeg|png)$/i;

	if (input.name && !regexName.test(input.name.trim())) {
		errors.name = 'El nombre debe tener mínimo 4 caracteres. *';
	}

    if (input.description && !regexDescription.test(input.description.trim())) {
		errors.description = 'La descripción debe tener mínimo 10 caracteres. *';
	}

	if (input.age && !regexStock.test(input.age)) {
		errors.age = 'La edad debe ser mayor a 1. *';
	}

	if (input.weight && !regexStock.test(input.weight)) {
		errors.weight = 'El peso debe ser mayor a 1. *';
	}

	if (input.image && !regexUrl.test(input.image.trim())) {
		errors.image = 'La imagen no tiene un formato válido';
	}

	return errors;
}