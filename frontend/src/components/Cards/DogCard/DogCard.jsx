import * as React from 'react';
import style from './dogCard.module.css';
import animals from './img/animals.png';
import bone from './img/bone.png';
import {
    Button,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    ThemeProvider
} from '@mui/material';
import {brown} from '@mui/material/colors';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setMaybeAdoptedDogs } from "../../../_redux/actions/dogsAction";

const DogCard = ({image, name, age, weight, color, gender, size, temperaments, id, description}) => {
    
    //puede ir aca la funcion para manejar el borrar card

    // const favoriteIcon = document.querySelector('.card .favorite-icon');
    // favoriteIcon.addEventListener('click', function() {
    //   // agregar dog favorito
    // });
    let ageInYears = age >= 12 ? Math.round (age / 12) : age + " meses";
    const separatedTemperaments = temperaments.join (", ");

    const [open, setOpen] = React.useState(false)

    const handleOpenDialog = () => {
        setOpen(!open)
    }

    return(
        <>
            <div className={style.containerCard}>
                <div className={style.containerIcon}>
                    <img className={style.Icon} src= {animals} alt='Icono-Favorito'/>
                </div>
                <div className={style.containerImg}>
                    <img className={style.img} src={image} alt='Foto-perrito' />
                </div>
                <div className={style.divDogInfo}>
                    <div className={style.divData}>
                        <h5 className={style.itemName}>
                            <img className={style.itemIcon} src={bone}/>
                        {name}
                        </h5>
                        <h5 className={style.itemTemp}>
                            <img className={style.itemIcon} src={bone}/>
                        {separatedTemperaments}
                        </h5>
                        <h5 className={style.intemAge}>
                            <img className={style.itemIcon} src={bone}/>{ageInYears}
                        </h5>
                        <h5 className={style.intemGender}>
                            <img className={style.itemIcon} src={bone}/>{gender}
                        </h5>
                        <h5 className={style.intemSize}>
                            <img className={style.itemIcon} src={bone}/>{size}
                        </h5> 
                    </div>   
                </div> 
                <div className={style.containerButton}>
                    <button className={style.button} onClick={handleOpenDialog}>Ver más información</button>
                </div>
            </div>
            <DialogDogsDetail handleOpenDialog={handleOpenDialog} open={open} dog={{image, name, ageInYears, gender, size, weight, color, temperaments, id, description}}  />
        </>
    )
}

export default DogCard;

export function DialogDogsDetail(props) {

    const dispatch = useDispatch();
    const handleClick = (id)=>{
        console.log(id);
        dispatch(setMaybeAdoptedDogs(id))
        navigate('/form')
    }
    const navigate = useNavigate()

    const innerTheme = createTheme({
        palette: {
            primary: {
                main: brown[500],
            },
            background: {
                default: '#163440',
                paper: '#163440'
            },
            text: {
                ...{
                    primary: '#fff',
                    secondary: '#fff'
                }
            }
        },
    });
    //props.dog.image name

    return(<>
        <ThemeProvider theme={innerTheme}>
            <Dialog
                open={props.open}
                onClose={props.handleOpenDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description">
                        <div className= {style.containerLeft}>
                            <div className={style.dogDetail}>
                                <h3>{props.dog.name}</h3>
                                <div className={style.avatar}>
                                    <img src={props.dog.image} alt={props.dog.name} />
                                </div>
                                <div className={style.description}>
                                    <p>{props.dog.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className= {style.containerRight}>
                        </div>
                        
                        </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" onClick={() =>{ handleClick(props.dog.id)} } autoFocus>
                        ¡Completa el formulario para adoptarlo!
                                </Button>
                            </DialogActions>
                        
            </Dialog>
        </ThemeProvider>
    </>)
}