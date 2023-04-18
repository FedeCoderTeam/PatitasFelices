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
    otherAnimals: Yup.string()
        .required('Seleccione una opción.'),
    howMany: Yup.string()
        .required('¿Cuáles tenés y cuántos son?'),
    income: Yup.string()
        .required('Elige una opción.'),
    allowance: Yup.string()
        .required('Elige una opción.'),
    image: Yup.string()
        .matches(/^.*\.(jpg|jpeg|png)$/i, 'Inserte una imagen válida.')
        .required('La imagen es obligatoria.')
});

const AdoptionForm = () => {

    const [formData, setFormData] = useState({
        fullName: '', age: '', phone: '', address: '', email: '', state: '', otherAnimals: false, howMany: '', income: '', allowance: '', image: ''
    });

    const handleSubmit = (values, {setSubmitting}, e) => {

        e.preventDefault()
        setFormData({ ...formData, ...values });
        alert(JSON.stringify(formData, null, 2))
        setSubmitting(false);
    }

    const options = [
        { value: "Excelente", label: "Excelente" },
        { value: "Bueno", label: "Bueno" },
        { value: "Malo", label: "Malo" },
        { value: "No aplica", label: "No aplica" }
    ];
    console.log(ErrorMessage)
    return (
        <div className='mainContainer-Form'>
            <div className='container-Form'>
                <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)} >
                    {({
                        errors, touched, values, formikBag }) => (<Form>
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
                                    <label htmlFor="otherAnimals">¿Tienes otros animales? Tilde el recuadro si la respuesta es afirmativa. ✔</label>
                                    <Field type="checkbox" id="otherAnimals" name="otherAnimals" />
                                    <ErrorMessage name='otherAnimals' />
                                    {values.otherAnimals && (
                                        <div>
                                            <label htmlFor="howMany">¿Cuántos son y qué tipo de animales son?</label>
                                            <Field type="text" id="howMany" name="howMany" />
                                            <ErrorMessage name='howMany' />
                                        </div>
                                    )}
                                    <label htmlFor='income'>¿Tiene los medios económicos para substentar los gastos económicos de su mascota?</label>
                                    <Field name='income' as='select'>
                                        <option value="all"></option>
                                        <option value="si">Si</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name='income' />
                                    <label htmlFor='allowance'>¿Consultaste en tu edificio, consorcio o propietario, si están de acuerdo con la adopción?</label>
                                    <Field as='select' name='allowance'>
                                        <option value="all"></option>
                                        <option value="si">Si</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name='allowance' />
                                    <label htmlFor='image'>Foto de su patio/balcón/espacio al aire libre</label>
                                    <div className='containerUpload-Form'>
                                        {/* Esta foto se va a guardar en cloudinary */}
                                        <Field className='upload-Form' name='image' type='file' />
                                        <ErrorMessage name='image' />
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                            <div className='containerBtn-Form'>
                                <button disabled={!Object.values(errors).length > 0} type='submit'>
                                    ENVIAR</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AdoptionForm
