import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
// import validate from '../validations/validate'


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'El nombre debe tener mínimo 4 caracteres. *')
        .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
        .required('El nombre es obligatorio'),
    description: Yup.string()
        .min(20, 'La descripción debe tener mínimo 20 caracteres. *')
        .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
        .required('La descripción es obligatoria'),
    price: Yup.number()
        .min(1, 'El precio tiene que ser mayor a 1. *')
        .required('El precio es obligatorio.'),
    stock: Yup.number()
        .min(0, 'El stock tiene que ser mayor o igual a 0. *')
        .required('El stock tiene que ser obligatorio.'),
    brand: Yup.string()
        .min(2, 'La marca debe tener mínimo 2 caracteres. *')
        .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
        .required('La marca es obligatoria'),
    category: Yup.string()
        .oneOf(['Alimento', 'Accesorio'], 'Seleccione una opción.'),
    subCategory: Yup.string()
        .oneOf(['Adulto', 'Cachorro', 'Comederos', 'Collares', 'Juguetes', 'Vestimenta'], 'Seleccione una opción.'),
    image: Yup.string()
        .matches(/^.*\.(jpg|jpeg|png)$/i, 'Ingrese una url válida.')
        .required('La imágen es obligatoria.')
});


const CreateProductForm = () => {

    const dispatch = useDispatch();

    const initialValues = {
        name: '', 
        description: '', 
        price: '', 
        stock: '', 
        brand: '', 
        category: '', 
        subCategory: '', 
        image: ''
    }

    const handleSubmit = (values) => {
        alert(JSON.stringify(values, null, 2))
    }

    return (
        <div className='mainContainer-Form'>
            <div className='container-Form'>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)} >
                    {({
                        errors, values }) => (<Form>
                            <h1 className='title-Form'>Crear Producto</h1>
                            <div className='box-Form'>
                                <div className='containerInputsLeft-Form'>
                                    <label htmlFor='name'>Nombre del producto</label>
                                    <Field name='name' type='text' placeholder='EJ: Buzo Cali Azulino' />
                                    <ErrorMessage name='name' />

                                    <label htmlFor='description'>Descripción</label>
                                    <Field name='description' type='text' placeholder='EJ: Alimento para perros adultos pequeños. Desde los 18 meses.' />
                                    <ErrorMessage name='description' />

                                    <label htmlFor='price'>Precio</label>
                                    <Field name='price' type='number' placeholder='EJ: 2000' />
                                    <ErrorMessage name='price' />

                                    <label htmlFor='stock'>Stock</label>
                                    <Field name='stock' type='number' placeholder='EJ: 10' />
                                    <ErrorMessage name='stock' />

                                    <label htmlFor='brand'>Marca del producto</label>
                                    <Field name='brand' type='brand' placeholder='EJ: Royal Canin' />
                                    <ErrorMessage name='brand' />
                                </div>
                                <div className='containerInputsRight-Form'>
                                    <label htmlFor="category">Seleccione una categoria</label>
                                    <Field as="select" id="category" name="category">
                                        <option value="all"></option>
                                        <option value="Alimento">Alimento</option>
                                        <option value="Accesorio">Accesorio</option>
                                    </Field>
                                    <ErrorMessage name='category' />
                                    {values.category && values.category === "Alimento" &&(
                                        <div>
                                            <label htmlFor="subCategory">Seleccione una subcategoria</label>
                                            <Field as="select" id="subCategory" name="subCategory">
                                                <option value="all"></option>
                                                <option value="Adulto">Adulto</option>
                                                <option value="Cachorro">Cachorro</option>
                                            </Field>
                                            <ErrorMessage name='subCategory' />
                                        </div>
                                    )}

                                    {values.category && values.category === "Accesorio" &&(
                                        <div>
                                            <label htmlFor="subCategory">Seleccione una subcategoria</label>
                                            <Field as="select" id="subCategory" name="subCategory">
                                                <option value="all"></option>
                                                <option value="Comederos">Comederos</option>
                                                <option value="Collares">Collares</option>
                                                <option value="Juguetes">Juguetes</option>
                                                <option value="Vestimenta">Vestimenta</option>
                                            </Field>
                                            <ErrorMessage name='subCategory' />
                                        </div>
                                    )}

                                    <div className='containerUpload-Form'>
                                        <label htmlFor='image'>Imágen del producto</label>
                                        <Field className='upload-Form' name='image' type='text' placeholder='Ingrese la url de la imágen' />
                                        <ErrorMessage name='image' />
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                            <div className='containerBtn-Form'>
                                <button disabled={Object.keys(errors).length > 0} type='submit'>CREAR</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default CreateProductForm;