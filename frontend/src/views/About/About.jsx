import React from 'react';
import AboutImage from './images/AboutImage.jpg';
import style from './about.module.css';
// import Typewriter from 'typewriter-effect/dist/core';


const About = () => {
    return (
        <>
            <div className={style.title}>
                <h2>¡Nuestro equipo de Patitas Felices!</h2>
            </div>
            <div className={style.description}>
                <div className={style.containerStory}>
                <div>
                    <img src={AboutImage} alt="AboutImage" />
                </div>
                    <p>Patitas Felices nació hace muchos años por la buena predisposición de una mujer en la ciudad de Córdoba, Argentina. Nuestra heroína se llama Karina. Ella rescataba a los perros de la calle que encontraba en su barrio: los alimentaba, curaba sus heridas y una vez que se encontraban sanos y fuertes, los daba en adopción responsable. En marzo de 2020, al decretarse la cuarentena obligatoria a causa de la pandemia por el COVID-19, un vecino de Karina quedó varado lejos de su casa. Como ella vivía muy cerca, pasados unos días del inicio de la cuarentena, él le pidió si podía ir a ver a sus dos perras. Cuando Karina llegó a la casa, la situación de las perras era terrible. Estaban tristes, solas y hambrientas. Ese día nació el refugio.
                        Karina se comprometió a cuidar a estas dos perras a cambio de llevar otro perrito callejero a ese lugar. En su casa no cabía otro perro. Así, ella y el dueño de la casa aunaron fuerzas. Las vecinas se enternecieron y también empezaron a ayudar. En agosto del 2021, Patitas Felices contaba con seis voluntarios. Hoy en día, el refugio cuenta con 18 voluntarios, dos turnos por día, tres integrantes por turno y funciona de lunes a lunes.
                        Estas 18 personas hacen la vida de los perritos mejor: limpian el lugar, cortan el pasto, tienden sus camitas, lavan sus sábanas, los alimentan, los medican cuando lo necesitan, los llevan al veterinario a sus controles rutinarios, los castran y los sacan a pasear 2 veces por día. Les dan amor, les hacen cariños, les quitan sus miedosy los hacen volver a confiar en los seres humanos hasta que cada uno de ellos consiga su nueva familia.
                    </p>
                </div>
            </div>
        </>
    )
}

export default About