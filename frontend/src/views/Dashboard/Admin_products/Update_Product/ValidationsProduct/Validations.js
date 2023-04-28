export default function validation(input) {
	let errors = {};
	let regexName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s,.]{4,}$/;
    let regexDescription = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s,.]{10,}$/;
	let regexStock = /^[1-9][0-9]*$/;
	let regexUrl = /^.*\.(jpg|jpeg|png)$/i;

	if (input.name && !regexName.test(input.name.trim())) {
		errors.name = 'Debe tener mínimo 4 caracteres. *';
	}

    if (input.description && !regexDescription.test(input.description.trim())) {
		errors.description = 'Debe tener mínimo 10 caracteres. *';
	}

	if (input.price && !regexStock.test(input.price)) {
		errors.price = 'Debe ser mayor a 1. *';
	}

	if (input.stock && !regexStock.test(input.stock)) {
		errors.stock = 'Debe ser mayor o igual a 0. *';
	}

	if (input.brand && !regexName.test(input.brand)) {
		errors.brand = 'Debe tener mínimo 4 caracteres. *';
	}

	if (input.image && !regexUrl.test(input.image.trim())) {
		errors.image = 'La imagen no tiene un formato válido';
	}

	return errors;
}