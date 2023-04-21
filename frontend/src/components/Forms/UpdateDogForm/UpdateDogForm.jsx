import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CloudinaryWidget from '../../Cloudinary/CloudinaryWidget';
import CloudinaryWidgetFull from '../../Cloudinary/CloudinaryWidgetFull';
import style from './UpdateDogForm.module.css';
import * as productsAction from '../../../_redux/actions/productsAction'
// import validate from '../validations/validate'

const UpdateDogForm = () => {

    const dispatch = useDispatch();

    const temperaments = useSelector((state) => state.dogsReducer.temperaments)

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
            .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z". *')
            .required('El nombre es obligatorio. *'),
        age: Yup.number()
            .min(1, 'Debe introducir una edad aproximada en meses. *')
            .max(240, '¡WOW!¿Estás seguro que el perro tiene estos meses? *')
            // .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
            .required('La edad es obligatoria. *'),
        size: Yup.string()
            .oneOf(['Gigante', 'Grande', 'Mediano', 'Pequeño', 'Muy pequeño'], 'El tamaño es obligatorio. *'),
        weight: Yup.number()
            .min(1, 'El peso tiene que ser mayor a 1. *')
            .max(110, '¡WOW!¿Estás seguro que es un perro? *')
            .required('El peso es obligatorio. *'),
        gender: Yup.string()
            .oneOf(['Hembra', 'Macho'], 'El género es obligatorio. *'),
        castrated: Yup.string()
            .oneOf(['Yes', 'No'], 'Este campo es obligatorio. *'),
        colors: Yup.string()
            .oneOf(['Negro', 'Blanco', 'Gris', 'Marron', 'Dorado', 'Cobrizo', 'Crema'], 'El color es obligatorio. *'),
        description: Yup.string()
            .required('La descripción es obligatoria. *'),
        adopted: Yup.string()
            .oneOf(['Yes', 'No'], 'Este campo es obligatorio. *'),
        isDisabled: Yup.string()
            .oneOf(['Yes', 'No'], 'Este campo es obligatorio. *'),
        image: Yup.string()
            .matches(/^.*\.(jpg|jpeg|png)$/i, 'Inserte una imagen válida. *')
            .required('La imagen es obligatoria. *'),
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
        <div className={style.mainContainerForm}>
            <div className={style.containerForm}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)} >
                    {({
                        errors, values }) => (<Form>
                            <h1 className={style.titleForm}>Editar Perro</h1>
                            <div className={style.boxForm}>
                                <div className={style.containerInputsLeftForm}>
                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='name'>Nombre</label>
                                        <Field className={style.inputs} name='name' type='text' placeholder='Ej: Otis' />
                                        <ErrorMessage name='name'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='age'>Edad (meses)</label>
                                        <Field className={style.inputs} name='age' type='number' placeholder='Ej: 24' />
                                        <ErrorMessage name='age'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor="size">Tamaño</label>
                                        <Field className={style.inputSelect} as="select" id="category" name="size">
                                            <option className={style.options} value="all"></option>
                                            <option className={style.options} value="Gigante">Gigante</option>
                                            <option className={style.options} value="Grande">Grande</option>
                                            <option className={style.options} value="Mediano">Mediano</option>
                                            <option className={style.options} value="Pequeño">Pequeño</option>
                                            <option className={style.options} value="Muy pequeño">Muy pequeño</option>
                                        </Field>
                                        <ErrorMessage name='size'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='weight'>Peso (kg.)</label>
                                        <Field className={style.inputs} name='weight' type='number' placeholder='Ej: 24' />
                                        <ErrorMessage name='weight'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor="gender">Género</label>
                                        <Field className={style.inputSelect} as="select" id="category" name="gender">
                                            <option className={style.options} value="all"></option>
                                            <option className={style.options} value="Hembra">Hembra</option>
                                            <option className={style.options} value="Macho">Macho</option>
                                        </Field>
                                        <ErrorMessage name='gender'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor="castrated">¿Está castrado?</label>
                                        <Field className={style.inputSelect} as="select" id="category" name="castrated">
                                            <option className={style.options} value="all"></option>
                                            <option className={style.options} value="Yes">Sí</option>
                                            <option className={style.options} value="No">No</option>
                                        </Field>
                                        <ErrorMessage name='castrated'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                </div>
                                <div className={style.containerInputsRightForm}>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor="tempers">Temperamentos</label>
                                        <Field className={style.inputSelect} as="select" id="category" name="tempers">
                                            <option className={style.options} value="all"></option>
                                            {
                                                temperaments.map(temper => (
                                                    <option className={style.options}>{temper.name}</option>
                                                ))
                                            }
                                                {/* {initialValues.tempers.map(temp =>
                                                    <div>
                                                        <p>{temp.name}</p>
                                                    </div>
                                                )} */}
                                                {/* <button onClick={() => { handleDelete(temp) }}>X</button> */ }
                                                
                                        </Field>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor="colors">Colores</label>
                                        <Field className={style.inputSelect} as="select" id="colors" name="colors">
                                            <option className={style.options} value="all"></option>
                                            <option className={style.options} value="Negro">Negro</option>
                                            <option className={style.options} value="Blanco">Blanco</option>
                                            <option className={style.options} value="Gris">Gris</option>
                                            <option className={style.options} value="Marron">Marrón</option>
                                            <option className={style.options} value="Dorado">Dorado</option>
                                            <option className={style.options} value="Cobrizo">Cobrizo</option>
                                            <option className={style.options} value="Crema">Crema</option>
                                        </Field>
                                        <ErrorMessage name='colors'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor="description">Descripción del Perro</label>
                                        <Field className={style.inputTextArea} type="text" id="description" name="description" />
                                        <ErrorMessage name='description'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor="adopted">¿Fue adoptado?</label>
                                        <Field className={style.inputSelect} as="select" id="category" name="adopted">
                                            <option className={style.options} value="all"></option>
                                            <option className={style.options} value="Yes">Sí</option>
                                            <option className={style.options} value="No">No</option>
                                        </Field>
                                        <ErrorMessage name='adopted'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor="isDisabled">¿El perrito falleció?</label>
                                        <Field className={style.inputSelect} as="select" id="category" name="isDisabled">
                                            <option className={style.options} value="all"></option>
                                            <option className={style.options} value="Yes">Sí</option>
                                            <option className={style.options} value="No">No</option>
                                        </Field>
                                        <ErrorMessage name='isDisabled'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.eachField}>
                                       
                                            <label className={style.labels} htmlFor='image'>Adjunte la imagen de su producto</label>
                                            <div className={style.containerUploadForm}>
                                            
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
                            <div className={style.containerBtnForm}>
                                <button className={style.btnCreate} disabled={Object.keys(errors).length > 0} type='submit'>CREAR</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
    
}

export default UpdateDogForm;