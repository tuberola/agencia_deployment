import {Testimonial} from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res)=>{
    // validar
    const {nombre, correo, mensaje}=req.body;

    const errores =[];

    if(nombre.trim()===''){
        errores.push({mensaje:'El nombre esta vacio'});
    }
    if(correo.trim()===''){
        errores.push({mensaje:'El correo esta vacio'});
    }
    if(mensaje.trim()===''){
        errores.push({mensaje:'El mensaje esta vacio'});
    }

    if(errores.length>0){

        // consultar testimoniales
        const testimoniales = await Testimonial.findAll();


        // mostrar la vista con errores
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            errores: errores,
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
            testimoniales: testimoniales
        })
    }else{
        //almacenarlo en la base de datos
        console.log('Almacenando en base de datos');

        try {
            await Testimonial.create({
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            })
            console.log('los datos se insertaron en la base');
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }

}

export{
    guardarTestimonial
}