export default function validation(input) {
	let errors = {};

	if (!input.name.trim()) {
		errors.name = 'El nombre es obligatorio. *';
	}

	if (!input.description) {
		errors.description = 'La descripción es obligatoria. *';
	}

	if (!input.price) {
		errors.price = 'El precio es obligatorio. *';
	}

	if (!input.brand) {
		errors.brand = 'La marca es obligatoria. *';
	}

	if (!input.stock) {
		errors.stock = 'El stock es obligatorio. *';
	}

	if (!input.isDisabled) {
		errors.isDisabled = 'Este campo es obligatorio. *';
	}

	if (!input.category.length) {
		errors.category = 'Este campo es obligatorio. *';
	}
	if (!input.subCategory.length) {
		errors.subCategory = 'Este campo es obligatorio. *';
	}

	return errors;
}