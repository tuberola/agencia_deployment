// INDEX DEL ROUTING
import express from 'express';
import {paginaInicio, paginaNosotros, paginaTestimoniales, paginaViajes, paginaPrueba, paginaDetalleViaje} from '../controllers/paginasController.js';
import { guardarTestimonial } from '../controllers/testimonialesController.js';

const router = express.Router();

// paginas
router.get('/',paginaInicio);
router.get('/nosotros',paginaNosotros);
router.get('/testimoniales',paginaTestimoniales);
router.get('/prueba',paginaPrueba);
router.get('/viajes',paginaViajes);
router.get('/viajes/:slug',paginaDetalleViaje);// se asigna un comodin al slug
router.post('/testimoniales',guardarTestimonial);


export default router;