import { Testimonial } from '../models/Testimoniales.js';
import {Viaje} from '../models/Viaje.js';

const paginaInicio = async (req, res)=>{

    // CONSULTAR 3 VIAJES Y 3 TESTIMONIALES DE MANERA NO VIABLE ------------------------
    // try {
    //     const viajes = await Viaje.findAll({limit:3});
    //     const testimoniales = await Testimonial.findAll({limit:3});
    //     res.render('inicio',{
    //         pagina: 'Inicio',
    //         clase: 'home',
    //         viajes: viajes,
    //         testimoniales: testimoniales
    //     });
        
    // } catch (error) {
    //     console.log(error);
    // }

    // CONSULTAR 3 VIAJES Y 3 TESTIMONIALES DE MANERA VIABLE -----------------------

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({limit:3}));
    try {
        const resultado = await Promise.all(promiseDB);
        res.render('inicio',{
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
        
    } catch (error) {
        console.log(error);
    }


}

const paginaNosotros = (req, res)=>{
    res.render('nosotros',{
        pagina: 'Nosotros',
    });
}

const paginaTestimoniales = async (req, res)=>{

    try {

        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina: 'Testimonales',
            testimoniales: testimoniales
        });
        
    } catch (error) {
        console.log(error);
    }
}

const paginaPrueba = async (req, res)=>{
    const viajes = await Viaje.findAll();

    res.render('prueba',{
        pagina: 'Prueba',
        viajes: viajes
    });
}

const paginaViajes = async (req, res)=>{

    // Antes del render haremos la consulta a la base de datos
    const viajes = await Viaje.findAll();

    console.log(viajes);

    res.render('viajes',{
        pagina: 'Próximos viajes',
        viajes: viajes
    });
}

// Muestra un viaje por su Slug
const paginaDetalleViaje = async (req, res)=>{
    const {slug} = req.params;

    try {
        // Buscar en la base de datos donde el slug sea igual en los parametros y se asigna a resultado
        const viaje = await Viaje.findOne({ where: { slug: slug }})

        // una vez hallado se renderiza la vista
        res.render('viaje',{
            pagina: 'Información del viaje',
            viaje: viaje
        });
    } catch (error) {
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaTestimoniales,
    paginaViajes,
    paginaPrueba,
    paginaDetalleViaje
}