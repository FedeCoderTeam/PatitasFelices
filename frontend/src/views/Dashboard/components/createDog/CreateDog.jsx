import React from 'react'
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CloudinaryWidget from '../../../../components/Cloudinary/CloudinaryWidget';
import style from './CreateDog.module.css';
// import { getTemperaments } from '../../_redux/reducer/dogsReducer';

const CreateDog = () => {
    const dispatch = useDispatch();

    const temperaments = useSelector((state) => state.dogsReducer.temperaments)

    const [url, setUrl] = useState("");


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
        weight: Yup.number()
            .min(1, 'El peso tiene que ser en kilos. EJ: 2.4 . *')
            .max(80, '¿Estás dando en adopción un perro o chancho?')
            .required('El peso es obligatorio.'),
        castrated: Yup.boolean()
            .required('Este campo es obligatorio.'),
        size: Yup.string()
            .required('El tamaño es obligatorio.'),
        description: Yup.string()
            .min(10, 'Describe un poco su historia.')
            .required('Este campo es obligatorio.'),
        tempers: Yup.string()
            .required('Seleccione una opción.'),
        genders: Yup.string()
            .required('Seleccione una opción.'),
        colors: Yup.string()
            .required('Seleccione una opción.'),
        // image: Yup.string()
        //     .matches(/^.*\.(jpg|jpeg|png)$/i, 'Inserte una imagen válida.')
        //     .required('La imagen es obligatoria.')
    });

    const initialValues = {
        name: '',
        age: '',
        weight: '',
        castrated: '',
        size: '',
        description: '',
        tempers: [],
        genders: [],
        colors: [],
        image: ''
    }

    const handleSubmit = async (values) => {
        const obj = {
            name: values.name,
            age: values.age,
            weight: values.weight,
            castrated: values.castrated,
            size: values.size,
            description: values.description,
            tempers: values.tempers,
            genders: values.genders,
            colors: values.colors,
            image: ''
        }
        console.log(obj)
    }

    // alert(JSON.stringify(values, null, 2))

    const formik = useFormik({
        initialValues,
        validationSchema,
        handleSubmit: () => {
            console.log(formik.values);
        },
    });

    return (
        <div className={style.mainContainerForm}>
            <div className={style.containerForm}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)} >
                    {({
                        errors, values }) => (<Form>
                            {console.log(errors)}
                            <h1 className={style.titleForm}>Crear Perro</h1>
                            <div className={style.boxForm}>
                                <div className={style.containerInputsLeftForm}>
                                    <div className={style.containerInputs}>
                                        <label htmlFor='name'>Nombre del Perro</label>
                                        <Field name='name' type='text' placeholder='EJ: Midu' />
                                        <ErrorMessage name='name' />
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label htmlFor='age'>Edad</label>
                                        <Field name='age' type='number' placeholder='EJ: 7 meses' />
                                        <ErrorMessage name='age' />
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label htmlFor='weight'>Peso</label>
                                        {/* REVISAR */}
                                        <Field name='weight' type='number' placeholder='EJ: 14 kg' />
                                        <ErrorMessage name='weight' />
                                    </div>

                                    <div className={style.containerInputs}>
                                        {/* REVISAR */}
                                        <label htmlFor='castrated'>¿Está castrado?</label>
                                        <Field name='castrated' type='checkbox' />
                                        <ErrorMessage name='castrated' />
                                    </div>

                                    <div className={style.containerInputs}>
                                        <label htmlFor='size'>Tamaño del Perro</label>
                                        <Field as="select" id="size" name="size">
                                            <option value="all"></option>
                                            <option value="Giant">Gigante</option>
                                            <option value="Large">Grande</option>
                                            <option value="Medium">Mediano</option>
                                            <option value="Small">Chico</option>
                                            <option value="Mini">Mini</option>
                                        </Field>
                                        <ErrorMessage name='size' />
                                    </div>
                                </div>

                                <div className={style.containerInputsRightForm}>
                                    <div className={style.containerInputs}>
                                        <label htmlFor="description">Descripción del Perro</label>
                                        <Field type="text" id="description" name="description" />
                                        <ErrorMessage name='description' />
                                    </div>
                                    {/* {values.category && values.category === "Alimento" && (
                                      <div className={style.containerInputs}>
                                          <label htmlFor="subCategory">Seleccione una subcategoria</label>
                                          <Field as="select" id="subCategory" name="subCategory">
                                              <option value="all"></option>
                                              <option value="Adulto">Adulto</option>
                                              <option value="Cachorro">Cachorro</option>
                                          </Field>
                                          <ErrorMessage name='subCategory' />
                                      </div>
                                  )} */}

                                    {/* {values.category && values.category === "Accesorio" && (
                                      <div className={style.containerInputs}>
                                          <label htmlFor="subCategory">Seleccione una subcategoria</label>
                                          <Field as="select" id="subCategory" name="subCategory">
                                              <option value="all"></option>
                                              <option value="Comederos">Comederos</option>
                                              <option value="Collares">Collares</option>
                                              <option value="Juguetes">Juguetes</option>
                                              <option value="Vestimenta">Vestimenta</option>
                                          </Field>
                                          <ErrorMessage name='subCategory' /> */}
                                    {/* </div> */}
                                    {/* )} */}
                                    <div>
                                        <label htmlFor="tempers">Temperamentos</label>
                                        <Field as='select' name='tempers' multiple={true}>
                                            <option value="all"></option>
                                            {
                                                temperaments.map(temper => (
                                                    <option>{temper.name}</option>
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
                                    <div>
                                        <label htmlFor="genders">Género</label>
                                        <Field as="select" id="genders" name="genders">
                                            <option value="all"></option>
                                            <option value="Male">Macho</option>
                                            <option value="Female">Hembra</option>
                                        </Field>
                                    </div>
                                    <div>
                                        <label htmlFor="colors">Colores</label>
                                        <Field as="select" id="colors" name="colors">
                                            <option value="all"></option>
                                            <option value="Negro">Negro</option>
                                            <option value="Blanco">Blanco</option>
                                            <option value="Gris">Gris</option>
                                            <option value="Marron">Marrón</option>
                                            <option value="Dorado">Dorado</option>
                                            <option value="Cobrizo">Cobrizo</option>
                                            <option value="Crema">Crema</option>
                                        </Field>
                                    </div>
                                    <div className={style.eachField}>
                                        <div className={style.containerInputImg}>
                                            <label htmlFor='image'>Adjunte la Imagen del Perro</label>
                                            <div className={style.containerUploadForm}>
                                                <div>
                                                    <CloudinaryWidget
                                                        url={url}
                                                        setUrl={setUrl}
                                                    />
                                                </div>
                                                <div>
                                                    <img
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
                            </div>
                            <div className={style.containerBtnForm}>
                                <button type='submit'>AGREGAR</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )

}

export default CreateDog;