import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './adoptionForm.css';
import { getDogsById } from '../../../_redux/actions/dogsAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDogDetail, setMaybeAdoptedDog } from '../../../_redux/reducer/dogsReducer';
// import validate from '../validations/validate'

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(4, 'El nombre debe tener mínimo 4 caracteres. *')
        .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
        .required('El nombre es obligatorio'),
    age: Yup.number()
        .min(18, 'La edad tiene que ser mayor a 18 años. *')
        .required('La edad es obligatoria.'),
    phone: Yup.string()
        .matches(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/, 'Ingrese un número válido.')
        .required('El número de celular es de caracter obligatorio.'),
    address: Yup.string()
        .required('La dirección es obligatoria.'),
    email: Yup.string()
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Ingrese un email válido.')
        .required('El email es obligatorio.'),
    state: Yup.string()
        .oneOf(['Excelente', 'Bueno', 'Malo', 'No aplica'], 'Seleccione una opción.'),
    // 'Excellent', 'Good', 'Bad', 'N/A'
    otherAnimals: Yup.string()
        .required('Seleccione una opción.'),
    //.oneOf([true], 'Debe aceptar los terminos y condiciones')
    howMany: Yup.string()
        .required('Es obligatoria esta información.'),
    income: Yup.string()
        .required('Elige una opción.'),
    allowance: Yup.string()
        .required('Elige una opción.'),
    image: Yup.string()
        .matches(/^.*\.(jpg|jpeg|png)$/i, 'Inserte una imagen válida.')
        .required('La imagen es obligatoria.')
});


const AdoptionForm = () => {

    const dispatch = useDispatch();

    const dogId = useSelector(
        (state) => state.dogsReducer.maybeAdoptedDog,
    );
    console.log(dogId);

    const initialValues = {
        fullName: '', age: '', phone: '', address: '', email: '', state: '', otherAnimals: false, howMany: '', income: '', allowance: '', image: ''
    }
    useEffect(() => {
        return () => {
            dispatch(setMaybeAdoptedDog());
        };
    }, [])

    const handleSubmit = (values) => {
        alert(JSON.stringify(values, null, 2))
    }

    return (
        <div   className='mainContainer-Form' data-aos="fade-up">
            <div className='container-Form' >
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)} >
                    {({
                        errors, values }) => (<Form>
                            <h1 className='title-Form'>Formulario de Adopción {dogId.name}</h1>
                            <div className='box-Form'>

                                <div className='containerInputsLeft-Form'>

                                    <div className='eachField'>
                                        <label htmlFor='fullName'>Nombre completo de la/el adoptante</label>
                                        <Field name='fullName' type='text' placeholder='EJ: Pepito Juárez' />
                                        <ErrorMessage name="fullName">
                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className='eachField'>
                                        <label htmlFor='age'>Edad</label>
                                        <Field name='age' type='number' placeholder='EJ: 25' />
                                        <ErrorMessage name="age">
                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className='eachField'>
                                        <label htmlFor='phone'>Teléfono</label>
                                        <Field name='phone' type='number' placeholder='EJ: +54**********' />
                                        <ErrorMessage name="phone">
                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className='eachField'>
                                        <label htmlFor='text'>Dirección</label>
                                        <Field name='address' type='text' placeholder='EJ: Calle Falsa, 123, Springfield' />
                                        <ErrorMessage name="address">
                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className='eachField'>
                                        <label htmlFor='email'>Email</label>
                                        <Field name='email' type='email' placeholder='EJ: pepitojuarez1@hotmail/gmail.com' />
                                        <ErrorMessage name="email">
                                            {(msg) => <div className="errorMessage">{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                </div>

                                <div className='containerInputsRight-Form'>

                                    <div className='eachField'>
                                        <label htmlFor="otherAnimals">¿Tienes otros animales? Si la respuesta es sí, ¿cuántos y de qué tipo?</label>
                                        <div className='otherAnimals-Container'>
                                            <Field type="checkbox" id="otherAnimals" name="otherAnimals" className='checkbox'/>
                                            {values.otherAnimals && (
                                                <div className='hideInput'>
                                                    {/* <label htmlFor="howMany">¿Cuántos son y qué tipo de animales son?</label> */}
                                                    <Field type="text" id="howMany" name="howMany" placeholder='EJ: 2 gatos, 1 perro.' />
                                                    <ErrorMessage name="howMany">
                                                        {(msg) => <div className="errorMessage">{msg}</div>}
                                                    </ErrorMessage>
                                                </div>
                                            )}
                                        </div>
                                            <ErrorMessage name="otherAnimals">
                                                {(msg) => <div className="errorMessage">{msg}</div>}
                                            </ErrorMessage>
                                    </div>

                                    <div className='eachField'>
                                        <label htmlFor='income'>¿Tiene los medios económicos para substentar los gastos económicos de su mascota?</label>
                                        <Field name='income' as='select'>
                                            <option value="all"></option>
                                            <option value="si">Si</option>
                                            <option value="no">No</option>
                                        </Field>
                                        <ErrorMessage name="income">
                                            {(msg) => <div className="errorMessage">{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className='eachField'>
                                        <label htmlFor='allowance'>¿Consultaste en tu edificio, consorcio o propietario, si están de acuerdo con la adopción?</label>
                                        <Field as='select' name='allowance'>
                                            <option value="all"></option>
                                            <option value="si">Si</option>
                                            <option value="no">No</option>
                                        </Field>
                                        <ErrorMessage name="allowance">
                                            {(msg) => <div className="errorMessage">{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className='eachField'>
                                        <label htmlFor='image'>Foto de su patio/balcón/espacio al aire libre</label>
                                        {/* Esta foto se va a guardar en cloudinary */}
                                        <Field className='upload-Form' name='image' type='file' />
                                        <ErrorMessage name="image">
                                            {(msg) => <div className="errorMessage">{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className='eachField'>
                                        <label htmlFor='state'>¿Cómo se encuentra el estado de tu patio/balcón?</label>
                                        <Field name='state' as='select' >
                                            <option value="all"></option>
                                            <option value="Excelente">Excelente</option>
                                            <option value="Bueno">Bueno</option>
                                            <option value="Malo">Malo</option>
                                            <option value="No aplica">No aplica</option>
                                        </Field>
                                        <ErrorMessage name="state">
                                            {(msg) => <div className="errorMessage">{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                </div>
                            </div>
                            <div className='containerBtn-Form'>
                                <button disabled={Object.keys(errors).length > 0} type='submit'> ENVIAR </button>
                            </div>
                            <div className='containerGoHome-Form'>
                                <h4>Aún no sé si estoy listo/a, regresar a</h4>
                                <Link to="/home" className="goHome-Form">
                                    <i class="fa-solid fa-house"></i>
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AdoptionForm