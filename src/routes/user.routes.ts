import {Router} from 'express'
const router = Router()

import {getLibros, createLibro, getLibro, deleteLibro} from '../controllers/user.controller'

router.get('/libros', getLibros);
router.post('/libros', createLibro);
router.get('/libros/:id', getLibro);
router.put('/libros',);
router.delete('/libros', deleteLibro);

export default router
