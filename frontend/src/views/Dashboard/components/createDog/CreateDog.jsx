import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CloudinaryWidget from '../../../../components/Cloudinary/CloudinaryWidget';
import CloudinaryWidgetFull from '../../../../components/Cloudinary/CloudinaryWidgetFull';
import style from './CreateDog.module.css';
import * as productsAction from '../../../../_redux/actions/productsAction';
// import validate from '../validations/validate'

const CreateProductForm = () => {

    const dispatch = useDispatch();

    const [url, setUrl] = useState("");

    const initialValues = {
        name: '',
        description: '',
        price: '',
        stock: '',
        brand: '',
        category: '',
        subCategory: '',
        image: url,
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'El nombre debe tener mínimo 4 caracteres. *')
            .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
            .required('El nombre es obligatorio'),
        age: Yup.number()
            .min(1, 'Debe introducir una edad aproximada en meses. EJ: 33. *')
            .max(240, '¡WOW!¿Estás seguro que el perro tiene estos meses?')
            // .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
            .required('La edad es obligatoria'),
        description: Yup.string()
            .min(10, 'La descripción debe tener mínimo 20 caracteres. *')
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
            .matches(/^.*\.(jpg|jpeg|png)$/i, 'Inserte una imagen válida.')
    });


    const handleSubmit = async (values) => {
        const obj = {
            name: values.name,
            description: values.description,
            price: values.price,
            stock: values.stock,
            brand: values.brand,
            category: values.category,
            subCategory: values.subCategory,
            image: url,
        }
        // dispatch(productsAction.createProduct(obj))
        alert(JSON.stringify(values, null, 2))
    }



    const formik = useFormik({
        initialValues,
        validationSchema,
        handleSubmit,
    });

    return (
        <div className={style.mainContainerCreateDog}>
            <div className={style.containerCreateDog}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)} >
                    {({
                        errors, values }) => (<Form>
                            <h1 className={style.titleCreateDog}>Ingresar Perro</h1>
                            <div className={style.boxCreateDog}>
                                <div className={style.containerInputsLeftCreateDog}>
                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='name'>Nombre del Perro</label>
                                        <Field className={style.inputs} name='name' type='text' placeholder='Ej: Midu' />
                                        <ErrorMessage name='name'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='description'>Descripción</label>
                                        <Field className={style.inputs} name='description' type='text' placeholder='Ej: Alimento para perros adultos pequeños. Desde los 18 meses.' />
                                        <ErrorMessage name='description'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='price'>Precio</label>
                                        <Field className={style.inputs} name='price' type='number' placeholder='Ej: 2000' />
                                        <ErrorMessage name='price'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='stock'>Stock</label>
                                        <Field className={style.inputs} name='stock' type='number' placeholder='Ej: 10' />
                                        <ErrorMessage name='stock'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                </div>
                                <div className={style.containerInputsRightCreateDog}>
                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='brand'>Marca del producto</label>
                                        <Field className={style.inputs} name='brand' type='brand' placeholder='Ej: Royal Canin' />
                                        <ErrorMessage name='brand'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor="category">Seleccione una categoria</label>
                                        <Field className={style.inputSelect} as="select" id="category" name="category">
                                            <option className={style.options} value="all"></option>
                                            <option className={style.options} value="Alimento">Alimento</option>
                                            <option className={style.options} value="Accesorio">Accesorio</option>
                                        </Field>
                                        <ErrorMessage name='category'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>
                                    {values.category && values.category === "Alimento" && (
                                        <div className={style.containerInputs}>
                                            <label className={style.labels} htmlFor="subCategory">Seleccione una subcategoria</label>
                                            <Field className={style.inputSelect} as="select" id="subCategory" name="subCategory">
                                                <option className={style.options} value="all"></option>
                                                <option className={style.options} value="Adulto">Adulto</option>
                                                <option className={style.options} value="Cachorro">Cachorro</option>
                                            </Field>
                                            <ErrorMessage name='subCategory'>
                                                {(msg) => <div className={style.errors}>{msg}</div>}
                                            </ErrorMessage>
                                        </div>
                                    )}

                                    {values.category && values.category === "Accesorio" && (
                                        <div className={style.containerInputs}>
                                            <label className={style.labels} htmlFor="subCategory">Seleccione una subcategoria</label>
                                            <Field className={style.inputSelect} as="select" id="subCategory" name="subCategory">
                                                <option className={style.options} value="all"></option>
                                                <option className={style.options} value="Comederos">Comederos</option>
                                                <option className={style.options} value="Collares">Collares</option>
                                                <option className={style.options} value="Juguetes">Juguetes</option>
                                                <option className={style.options} value="Vestimenta">Vestimenta</option>
                                            </Field>
                                            <ErrorMessage name='subCategory'>
                                                {(msg) => <div className={style.errors}>{msg}</div>}
                                            </ErrorMessage>
                                        </div>
                                    )}

                                    <div className={style.eachField}>

                                        <label className={style.labels} htmlFor='image'>Adjunte la imagen de su producto</label>
                                        <div className={style.containerUploadCreateDog}>

                                            {url.length > 0 && (
                                                <div>
                                                    <CloudinaryWidgetFull
                                                        url={url}
                                                        setUrl={setUrl}
                                                    />
                                                </div>
                                            )}
                                            {url.length === 0 && (
                                                <div>
                                                    <CloudinaryWidget
                                                        url={url}
                                                        setUrl={setUrl}
                                                    />
                                                </div>
                                            )}
                                            <div className={style.divImgUser}>
                                                <img
                                                    className={style.imgUser}
                                                    src={url}
                                                    alt={formik.values.title}
                                                    title={formik.values.title}
                                                    loading="lazy"
                                                />
                                            </div>

                                        </div>
                                        <ErrorMessage name="image">
                                            {(msg) => <div className={style.errorMessage}>{msg}</div>}
                                        </ErrorMessage>

                                    </div>
                                </div>
                            </div>
                            <div className={style.containerBtnCreateDog}>
                                <button className={style.btnCreate} disabled={Object.keys(errors).length > 0} type='submit'>CREAR</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )

}

export default CreateProductForm;