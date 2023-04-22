import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CloudinaryWidget from '../../Cloudinary/CloudinaryWidget';
import CloudinaryWidgetFull from '../../Cloudinary/CloudinaryWidgetFull';
import style from './UpdateProductForm.module.css';
import * as productsAction from '../../../_redux/actions/productsAction'

const UpdateProductForm = () => {

    const dispatch = useDispatch();

    const [url, setUrl] = useState("");

    const productToUpdate = useSelector((state) => state.productsReducer.productDetail)

    useEffect(() =>{
        return () => {
            dispatch(productsAction.setDetail());
        };
    }, []);

    const initialValues = {
        id: productToUpdate.id,
		name: productToUpdate.name,
		description: productToUpdate.description,
		price: productToUpdate.price,
		image: productToUpdate.image,
		brand: productToUpdate.brand,
		stock: productToUpdate.stock,
		isDisabled: productToUpdate.isDisabled,
		category: productToUpdate.category,
		subCategory: productToUpdate.subCategory,
    }

    console.log(initialValues);

    const validationSchema = Yup.object().shape({
        id: Yup.number()
            .min(1, 'El id debe ser mayor a 0. *')
            .required('El id es obligatorio'),
        name: Yup.string()
            .min(4, 'El nombre debe tener mínimo 4 caracteres. *')
            .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
            .required('El nombre es obligatorio'),
        description: Yup.string()
            .min(10, 'La descripción debe tener mínimo 20 caracteres. *')
            .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
            .required('La descripción es obligatoria'),
        price: Yup.number()
            .min(1, 'El precio tiene que ser mayor a 1. *')
            .required('El precio es obligatorio.'),
        image: Yup.string()
            .matches(/^.*\.(jpg|jpeg|png)$/i, 'Inserte una imagen válida.'),
        brand: Yup.string()
            .min(2, 'La marca debe tener mínimo 2 caracteres. *')
            .matches(/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/, 'Sólo letras de la "A" a la "Z" *')
            .required('La marca es obligatoria'),
        stock: Yup.number()
            .min(0, 'El stock tiene que ser mayor o igual a 0. *')
            .required('El stock tiene que ser obligatorio.'),
        isDisabled: Yup.boolean()
            .required('Este campo es obligatorio.'),
        category: Yup.string()
            .oneOf(["Alimentos", "Accesorios"], 'Seleccione una opción.'),
        subCategory: Yup.string()
            .oneOf(["Adulto", "Cachorro", "Comederos", "Collares", "Juguetes", "Vestimenta"], 'Seleccione una opción.')
    });

    
    const handleSubmit = async (values) => {
        const obj = {
            id: values.id,
            name: values.name,
            description: values.description,
            price: values.price,
            image: values.image,
            brand: values.brand,
            stock: values.stock,
            isDisabled: values.isDisabled,
            categoryId: values.category === "Alimentos" ? values.category = 1 : values.category === "Accesorios" ? values.category = 2 : values.category,
            subCategoryId: values.subCategory === "Adulto" ? values.subCategory = 1 : values.subCategory === "Cachorro" ? values.subCategory = 2 : values.subCategory === "Comederos" ? values.subCategory = 3 : values.subCategory === "Collares" ? values.subCategory = 4 : values.subCategory === "Juguetes" ? values.subCategory = 5 : values.subCategory === "Vestimenta" ? values.subCategory = 6 : values.subCategory,
        }

        dispatch(productsAction.updateProduct(obj))
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
                            <h1 className={style.titleForm}>Editar Producto</h1>
                            <div className={style.boxForm}>
                                <div className={style.containerInputsLeftForm}>
                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='id'>Id del producto</label>
                                        <Field className={style.inputs} value={initialValues.id} name='id' type='number' placeholder='Ej: 1' />
                                        <ErrorMessage name='id'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='name'>Nombre del producto</label>
                                        <Field className={style.inputs} value={initialValues.name} name='name' type='text' placeholder='Ej: Buzo Cali Azulino' />
                                        <ErrorMessage name='name'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='description'>Descripción</label>
                                        <Field className={style.inputs} value={initialValues.description} name='description' type='text' placeholder='Ej: Alimento para perros adultos pequeños. Desde los 18 meses.' />
                                        <ErrorMessage name='description'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='price'>Precio</label>
                                        <Field className={style.inputs} value={initialValues.price} name='price' type='number' placeholder='Ej: 2000' />
                                        <ErrorMessage name='price'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='stock'>Stock</label>
                                        <Field className={style.inputs} value={initialValues.stock} name='stock' type='number' placeholder='Ej: 10' />
                                        <ErrorMessage name='stock'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                </div>
                                <div className={style.containerInputsRightForm}>
                                    <div className={style.containerInputsMarca}>
                                        <label className={style.labels} htmlFor='brand'>Marca del producto</label>
                                        <Field className={style.inputs} value={initialValues.brand} name='brand' type='brand' placeholder='Ej: Royal Canin' />
                                        <ErrorMessage name='brand'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputsMarca}>
                                        <label className={style.labels} htmlFor="isDisabled">¿Hay stock?</label>
                                        <Field className={style.inputSelect} value={initialValues.isDisabled} as="select" id="isDisabled" name="isDisabled">
                                            <option className={style.options} value="true">Sí</option>
                                            <option className={style.options} value="false">No</option>
                                        </Field>
                                        <ErrorMessage name='isDisabled'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputsMarca}>
                                        <label className={style.labels} htmlFor="category">Seleccione una categoría</label>
                                        <Field className={style.inputSelect} value={initialValues.category} as="select" id="category" name="category">
                                            <option className={style.options} value="Alimentos">Alimentos</option>
                                            <option className={style.options} value="Accesorios">Accesorios</option>
                                        </Field>
                                        <ErrorMessage name='category'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>
                                    {initialValues.category && initialValues.category === "Alimentos" &&(
                                        <div className={style.containerInputsMarca}>
                                            <label className={style.labels} htmlFor="subCategory">Seleccione una subcategoría</label>
                                            <Field className={style.inputSelect} value={initialValues.subCategory} as="select" id="subCategory" name="subCategory">
                                                <option className={style.options} value="Adulto">Adulto</option>
                                                <option className={style.options} value="Cachorro">Cachorro</option>
                                            </Field>
                                            <ErrorMessage name='subCategory'>
                                                {(msg) => <div className={style.errors}>{msg}</div>}
                                            </ErrorMessage>
                                        </div>
                                    )}

                                    {initialValues.category && initialValues.category === "Accesorios" &&(
                                        <div className={style.containerInputsMarca}>
                                            <label className={style.labels} htmlFor="subCategory">Seleccione una subcategoría</label>
                                            <Field className={style.inputSelect} value={initialValues.subCategory} as="select" id="subCategory" name="subCategory">
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
                                            <div className={style.containerUploadForm}>
                                            
                                            {url.length > 0 && (
                                                <div className={style.divCloudinaryBtn}>
                                                    <CloudinaryWidgetFull
                                                            url={url}
                                                            setUrl={setUrl}
                                                        />
                                                </div>
                                            )}
                                            {url.length === 0 &&(
                                                <div className={style.divCloudinaryBtn}>
                                                    <CloudinaryWidget
                                                            url={url}
                                                            setUrl={setUrl}
                                                        />
                                                </div>
                                            )}
                                                <div className={style.divImgUser}>
                                                    <img
                                                        className={style.imgUser}
                                                        src={!url.length ? initialValues.image : url}
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
                                <button className={style.btnCreate} disabled={Object.keys(errors).length > 0} type='submit'>EDITAR</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
    
}

export default UpdateProductForm;