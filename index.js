// const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

// asignamos a app todo el express
const app = express();

// conectar a la base de datos
db.authenticate()
    .then(()=> console.log('La base de datos se conecto exitosamente'))
    .catch(error=> console.log('error'));

//se define el puerto del servidor
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

// habilitar pug
app.set('view engine','pug');

//obtener el año actual
app.use((req,res,next)=>{ // en esta linea decimos que se utilizara na funcion con los 3 parametros
    const year = new Date(); // en esta instanciammos la fecha en una variable
    res.locals.actualYear = year.getFullYear(); // en la resPUESTA que nos manda express hacemos una nueva variable en locals llamada "actualYear" para asignarle el full year
    res.locals.nombresitio = "Agencia de viajes";
    return next();// decimos que se vaya al siguiente middleware
});

//Agregar bodyParser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// definir la carpeta publica
app.use(express.static('public'));
app.use('/viajes', express.static('public'));

//agregamos el router (contiene todas las rutas del proyecto)
app.use('/', router);

//corremos el servidor
app.listen(port, host, ()=>{
    console.log(`el servidor esta funcionando en el puerto ${port}`);
})