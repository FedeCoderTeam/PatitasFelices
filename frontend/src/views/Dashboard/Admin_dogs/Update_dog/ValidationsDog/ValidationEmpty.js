export default function validation(input) {
	let errors = {};

	if (!input.name.trim()) {
		errors.name = 'El nombre es obligatorio. *';
	}

	if (!input.age) {
		errors.age = 'La edad es obligatoria. *';
	}

	if (!input.size) {
		errors.size = 'El tamaño es obligatorio. *';
	}

	if (!input.weight) {
		errors.weight = 'El peso es obligatorio. *';
	}

	if (!input.castrated) {
		errors.castrated = 'Este campo es obligatorio. *';
	}

	if (!input.tempers.length) {
		errors.tempers = 'Este campo es obligatorio. *';
	}

	if (!input.colors.length) {
		errors.colors = 'Este campo es obligatorio. *';
	}
	if (!input.gender) {
		errors.subCategory = 'Este campo es obligatorio. *';
	}
    if (!input.description) {
		errors.description = 'La descripción es obligatoria. *';
	}
    if (!input.adopted) {
		errors.adopted = 'Este campo es obligatorio. *';
	}
    if (!input.isDisabled) {
		errors.isDisabled = 'Este campo es obligatorio. *';
	}

	return errors;
}