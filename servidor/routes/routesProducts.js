import express from "express";  // Se importa express para facilitar la comunicación con el servidor

import { bookProduct, buyProducts, getAllProducts, getProduct, createProduct, updateProducts, deleteProduct } from "../controllers/ProductControllers.js";  // Se importan todos los controladores ya creados para ser usados

const router = express.Router();  // Se crea una instancia de enrutador de Express

// Generación de rutas para usar la API creada para interactuar con la base de datos
// Diferentes rutas a usar con las diferentes funcionalidades

router.get('/', getAllProducts);  // Ruta para obtener todos los productos
router.put('/buy', buyProducts);  // Ruta para comprar productos
router.get('/book/:id', bookProduct);  // Ruta para reservar un producto específico por su ID
router.get('/:id', getProduct);  // Ruta para obtener un producto específico por su ID
router.post('/', createProduct);  // Ruta para crear un nuevo producto
router.put('/:id', updateProducts);  // Ruta para actualizar un producto existente por su ID
router.delete('/:id', deleteProduct);  // Ruta para eliminar un producto existente por su ID

export default router;  // Se exporta el enrutador para ser utilizado en otros archivos
