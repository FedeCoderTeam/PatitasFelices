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
		errors.description = 'La descripción debe tener entre 10 y 80 caracteres. *';
	}

	if (input.price && !regexStock.test(input.price)) {
		errors.price = 'El precio debe ser mayor a 1';
	}

	if (input.stock && !regexStock.test(input.stock)) {
		errors.stock = 'El stock debe ser mayor o igual a 0';
	}

	if (input.brand && !regexName.test(input.brand)) {
		errors.brand = 'La marca debe tener entre 4 y 20 caracteres. *';
	}

	if (input.image && !regexUrl.test(input.image.trim())) {
		errors.image = 'La imagen no tiene un formato válido';
	}

	return errors;
}