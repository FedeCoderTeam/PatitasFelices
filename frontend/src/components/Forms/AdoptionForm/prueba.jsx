import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.min(4, 'Name must be at least 4 characters')
		.matches(/^[a-zA-Z]+$/, 'Only letters from a to z are allowed')
		.required('Name is required'),
	image: Yup.string()
		.url('Invalid image URL')
		.required('Image URL is required'),
	attack: Yup.number()
		.min(1, 'Attack must be at least 1')
		.max(100, 'Attack cannot be greater than 100')
		.required('Attack is required'),
});

function App() {
	const [formData, setFormData] = useState({ name: '', image: '', attack: '', idDog: '' });

	const handleFormSubmit = (values) => {
		setFormData({ ...formData, ...values });
		alert(JSON.stringify(formData, null, 2));
	};

	return (
		<div>
			<h1>Create a Pokemon</h1>
			<Formik
				initialValues={formData}
				validationSchema={validationSchema}
				onSubmit={handleFormSubmit}
			>
				{({ errors, touched }) => (
					<Form>
						<div>
							<label htmlFor="name">Name</label>
							<Field name="name" />
							<ErrorMessage name="name" />
						</div>
						<div>
							<label htmlFor="image">Image URL</label>
							<Field name="image" />
							<ErrorMessage name="image" />
						</div>
						<div>
							<label htmlFor="attack">Attack</label>
							<Field name="attack" type="number" />
							<ErrorMessage name="attack" />
						</div>
						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default App;
