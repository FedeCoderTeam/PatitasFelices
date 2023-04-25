import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CloudinaryWidget from '../../../../components/Cloudinary/CloudinaryForm/CloudinaryWidget';
import CloudinaryWidgetFull from '../../../../components/Cloudinary/CloudinaryForm/CloudinaryWidgetFull';
import style from './UpdateProductForm.module.css';
import * as productsAction from '../../../../_redux/actions/productsAction';
import { Link } from 'react-router-dom';
import useToast from '../../../../hooks/useToast';
import { useNavigate } from 'react-router-dom';

const UpdateProductForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [url, setUrl] = useState("");

    const productToUpdate = useSelector((state) => state.productsReducer.productDetail);

    const { success } = useToast();
    
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
		name: Yup.string()
			.min(4, 'El nombre debe tener mínimo 4 caracteres. *')
			.matches(
				/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/,
				'Sólo letras de la "A" a la "Z". *',
			)
			.required('El nombre es obligatorio. *'),
		description: Yup.string()
			.min(10, 'La descripción debe tener mínimo 10 caracteres. *')
			.matches(
				/^[A-Za-z]+(?:[ ][A-Za-z]+)*$/,
				'Sólo letras de la "A" a la "Z". *',
			)
			.required('La descripción es obligatoria. *'),
		price: Yup.number()
			.min(1, 'El precio debe ser mayor a 1')
            .required('El precio es obligatorio. *'),
		brand: Yup.string()
			.min(4, 'La marca debe tener mínimo 4 caracteres. *')
			.required('La marca es obligatoria. *'),
		stock: Yup.number()
			.min(0, 'El stock debe ser mayor o igual a 0')
            .required('El stock es obligatorio. *'),
		isDisabled: Yup.boolean()
            .required('Este campo es obligatorio. *'),
		category: Yup.string()
            .oneOf(['Alimentos', 'Accesorios'])
            .required('Seleccione una categoría. *'),
		subCategory: Yup.string()
            .oneOf(['Adulto', 'Cachorro', 'Comederos', 'Collares', 'Juguetes', 'Vestimenta'])
            .required('Seleccione una subcategoría. *'),
		image: Yup.string()
			.matches(/^.*\.(jpg|jpeg|png)$/i, 'Inserte una imagen válida. *'),
	});

    const handleSubmit = async (values) => {

        const obj = {
            id: initialValues.id,
            name: values.name ? values.name : initialValues.name,
            description: values.description ? values.description : initialValues.description,
            price: values.price ? values.price : initialValues.price,
            image: url,
            brand: values.brand ? values.brand : initialValues.brand,
            stock: values.stock ? values.stock : initialValues.stock,
            isDisabled: values.isDisabled ? values.isDisabled : initialValues.isDisabled,
            categoryId: values.category ? (values.category === "Alimentos" ? 1 : 2) : initialValues.category === "Alimentos" ? 1 : 2,
            subCategoryId: values.subCategory 
            ? (values.subCategory === "Adulto" ? 1 : 
            (values.subCategory === "Cachorro" ? 2 :
            (values.subCategory === "Comederos" ? 3 : 
            (values.subCategory === "Collares" ? 4 : 
            (values.subCategory === "Juguetes" ? 5 : 
            (values.subCategory === "Vestimenta" ? 6 : initialValues.subCategory))))))
            : initialValues.subCategory,
        }

        dispatch(productsAction.updateProduct(obj))
        success(`¡Producto editado exitosamente!`, {
			duration: 2000
		});
		setTimeout(() => {
			navigate('/dashboard/products');
		}, 2000);

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        handleSubmit,
    });

    return (
        <div className={style.mainContainerForm}>
            <div className={style.containerInitials}>
                <h3 className={style.titleCardInitial}>Valores iniciales</h3>
                <div className={style.subtitlesContainer}>
                    <div className={style.subtitlesContainerLeft}>
                        <div className={style.eachField}>
                            <h3 className={style.subtitleCardInitial}>Id: </h3>
                            <h4 className={style.spanCardInitial}>{initialValues.id}</h4>
                        </div>

                        <div className={style.eachField}>
                            <h3 className={style.subtitleCardInitial}>Name: </h3>
                            <h4>{initialValues.name}</h4>
                        </div>

                        <div className={style.descriptionField}>
                            <h3 className={style.subtitleCardInitial}>Descripción: </h3>
                            <h4>{initialValues.description}</h4>
                        </div>

                        <div className={style.eachField}>
                            <h3 className={style.subtitleCardInitial}>Precio: </h3>
                            <h4>{initialValues.price}</h4>
                        </div>

                        <div className={style.eachField}>
                            <h3 className={style.subtitleCardInitial}>Marca: </h3>
                            <h4>{initialValues.brand}</h4>
                        </div>

                    </div>

                    <div className={style.subtitlesContainerRight}>

                        <div className={style.eachField}>
                            <h3 className={style.subtitleCardInitial}>Stock: </h3>
                            <h4>{initialValues.stock}</h4>
                        </div>
                        
                        <div className={style.eachField}>
                            <h3 className={style.subtitleCardInitial}>Descontinuado: </h3>
                            <h4>{initialValues.isDisabled + ""}</h4>
                        </div>

                        <div className={style.eachField}>
                            <h3 className={style.subtitleCardInitial}>Categoría: </h3>
                            <h4>{initialValues.category}</h4>
                        </div>

                        <div className={style.eachField}>
                            <h3 className={style.subtitleCardInitial}>Subcategoría: </h3>
                            <h4>{initialValues.subCategory}</h4>
                        </div>

                        <div className={style.eachField}>
                            <div className={style.imgContainer}>
                                <img className={style.imgCardInitial} src={initialValues.image}/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <div className={style.containerForm}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)} >
                    {({
                        errors, values }) => (<Form>
                            <div>
                                <Link to='/dashboard/products'>
									<button className={style.goBackBtn}><i class="fa-solid fa-arrow-left"></i></button>
								</Link>
                                <h1 className={style.titleForm}>Editar Producto</h1>
                            </div>
                            <div className={style.boxForm}>
                                <div className={style.containerInputsLeftForm}>
                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='name'>Nombre del producto</label>
                                        <Field className={style.inputs} defaultValue={initialValues.name} value={values.name} name='name' type='text' placeholder='Ej: Buzo Cali Azulino' />
                                        <ErrorMessage name='name'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='description'>Descripción</label>
                                        <Field className={style.inputs} value={values.description} name='description' type='text' placeholder='Ej: Alimento para perros adultos pequeños. Desde los 18 meses.' />
                                        <ErrorMessage name='description'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='price'>Precio</label>
                                        <Field className={style.inputs} value={values.price} name='price' type='number' placeholder='Ej: 2000' />
                                        <ErrorMessage name='price'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label className={style.labels} htmlFor='stock'>Stock</label>
                                        <Field className={style.inputs} value={values.stock} name='stock' type='number' placeholder='Ej: 10' />
                                        <ErrorMessage name='stock'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                </div>
                                <div className={style.containerInputsRightForm}>
                                    <div className={style.containerInputsMarca}>
                                        <label className={style.labels} htmlFor='brand'>Marca del producto</label>
                                        <Field defaultValue={initialValues.brand} className={style.inputs} value={values.brand} name='brand' type='brand' placeholder='Ej: Royal Canin' />
                                        <ErrorMessage name='brand'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputsMarca}>
                                        <label className={style.labels} htmlFor="isDisabled">¿Descontinuado?</label>
                                        <Field defaultValue="false" className={style.inputSelect} value={values.isDisabled} as="select" id="isDisabled" name="isDisabled">
                                            <option className={style.options} value={true}>Sí</option>
                                            <option className={style.options} value={false}>No</option>
                                        </Field>
                                        <ErrorMessage name='isDisabled'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className={style.containerInputsMarca}>
                                        <label className={style.labels} htmlFor="category">Seleccione una categoría</label>
                                        <Field className={style.inputSelect} value={values.category} as="select" id="category" name="category">
                                            <option className={style.options} value="Alimentos">Alimentos</option>
                                            <option className={style.options} value="Accesorios">Accesorios</option>
                                        </Field>
                                        <ErrorMessage name='category'>
                                            {(msg) => <div className={style.errors}>{msg}</div>}
                                        </ErrorMessage>
                                    </div>
                                    {values.category && values.category === "Alimentos" &&(
                                        <div className={style.containerInputsMarca}>
                                            <label className={style.labels} htmlFor="subCategory">Seleccione una subcategoría</label>
                                            <Field className={style.inputSelect} value={values.subCategory} as="select" id="subCategory" name="subCategory">
                                                <option className={style.options} value="Adulto">Adulto</option>
                                                <option className={style.options} value="Cachorro">Cachorro</option>
                                            </Field>
                                            <ErrorMessage name='subCategory'>
                                                {(msg) => <div className={style.errors}>{msg}</div>}
                                            </ErrorMessage>
                                        </div>
                                    )}

                                    {values.category && values.category === "Accesorios" &&(
                                        <div className={style.containerInputsMarca}>
                                            <label className={style.labels} htmlFor="subCategory">Seleccione una subcategoría</label>
                                            <Field className={style.inputSelect} value={values.subCategory} as="select" id="subCategory" name="subCategory">
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
                                                        src={!url.length ? values.image : url}
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