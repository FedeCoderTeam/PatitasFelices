import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import validate from '../validations/validate'

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(4, 'El nombre debe tener mínimo 4 caracteres. *')
        .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
        .required('El nombre es obligatorio'),
    age: Yup.number()
        .min(18, 'La edad tiene que ser mayor a 18 años. *')
        .required('La edad es obligatoria.'),
    phone: Yup.number()
        // .matches(/^(?:(?:\+|00)54|0)? ?9(?:[1-9]\d{7}|[1-9][0-9]{3}-\d{4})$/, 'Ingrese un número válido.')
        .required('El número de celular es de caracter obligatorio.'),
    address: Yup.string()
        .required('La dirección es obligatoria.'),
    email: Yup.string()
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Ingrese un email válido.')
        .required('El email es obligatorio.'),
    state: Yup.array()
        .required('Seleccione una opción.'),
    // 'Excellent', 'Good', 'Bad', 'N/A'
    otherAnimals: Yup.boolean()
        .required('Seleccione una opción.'),
    howMany: Yup.string()
        .required('¿Cuáles tenés y cuántos son?'),
    income: Yup.boolean()
        .required('Elige una opción.'),
    allowance: Yup.boolean()
        .required('Elige una opción.'),
    image: Yup.string()
        .matches(/^.*\.(jpg|jpeg|png)$/i, 'Inserte una imagen válida.')
        .required('La imagen es obligatoria.')
});

const AdoptionForm = () => {

    const [formData, setFormData] = useState({
        fullName: '', age: '', phone: '', address: '', email: '', state: '', otherAnimals: '', howMany: '', income: '', allowance: '', image: ''
    });

    const handleSubmit = (values) => {
        setFormData({ ...formData, ...values });
        alert(JSON.stringify(formData, null, 2))
    }

    const options = [
        { value: "Excelente", label: "Excelente" },
        { value: "Bueno", label: "Bueno" },
        { value: "Malo", label: "Malo" },
        { value: "No aplica", label: "No aplica" }
    ];

    return (
        <div className='mainContainer-Form'>
            <div className='container-Form'>
                <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({
                        errors, touched }) => (<Form>
                            <h1 className='title-Form'>Formulario de Adopción</h1>
                            <div className='box-Form'>
                                <div className='containerInputsLeft-Form'>
                                    <label htmlFor='fullName'>Nombre completo de la/el adoptante</label>
                                    <Field name='fullName' type='text' />
                                    <ErrorMessage name='fullName' />
                                    <label htmlFor='age'>Edad</label>
                                    <Field name='age' type='number' />
                                    <ErrorMessage name='age' />
                                    <label htmlFor='phone'>Teléfono</label>
                                    <Field name='phone' type='number' />
                                    <ErrorMessage name='phone' />
                                    <label htmlFor='text'>Dirección</label>
                                    <Field name='address' type='text' />
                                    <ErrorMessage name='address' />
                                    <label htmlFor='email'>Email</label>
                                    <Field name='email' type='email' />
                                    <ErrorMessage name='email' />
                                    <label htmlFor='state'>¿Cómo se encuentra el estado de tu patio/balcón?</label>
                                    <Field name='state' as='select' >
                                        <option value="all"></option>
                                        {options.map((option) => {
                                            return (
                                                <option key={option.value} value={option.value}> {option.label}</option>
                                            )
                                        })}
                                    </Field>
                                </div>
                                <div className='containerInputsRight-Form'>
                                    <label htmlFor='otherAnimals'>¿Tenés otros animales?</label>
                                    <label htmlFor='otherAnimals'>
                                        <Field name="otherAnimals" as='select'>
                                            </Field>
                                    </label>
                                    <label>
                                        <Field type='checkbox' name="otherAnimals" value="No" as='checkbox'>No</Field>
                                    </label>
                                    <label>¿Cuántos son y cuáles son?</label>
                                    <input type="text" />
                                    <label>¿Tiene los medios económicos para substentar los gastos económicos de su mascota?</label>
                                    <input type="text" />
                                    <label>¿Consultaste en tu edificio, consorcio o propietario, si están de acuerdo con la adopción?</label>
                                    <input type="text" />
                                    <label>Foto de su patio/balcón/espacio al aire libre</label>
                                    <div className='containerUpload-Form'>
                                        {/* Esta foto se va a guardar en cloudinary */}
                                        <input className='upload-Form' type="file" />
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                            <div className='containerBtn-Form'>
                                <button type='submit'>ENVIAR</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AdoptionForm
