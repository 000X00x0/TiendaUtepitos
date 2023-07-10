// Importamos el modelo
import ProductModel from "../models/ProductModel.js";
import { productsStock, productMinStock } from "../main.js";
import { sendMail } from "../mail/mail.js";

// Mostrar todos los registros
export const getAllProducts = async (req,res) => {
    try {
        const products  = await ProductModel.findAll();  // Buscamos todos los registros de productos en la base de datos
        res.json(products);  // Enviamos los registros como respuesta en formato JSON
    } catch (error) {
        res.json({message: error.message});  // Enviamos un mensaje de error en caso de que ocurra algún problema
    }
}

// Mostrar un registro
export const getProduct = async (req,res) => {
    try {
       const product = await ProductModel.findAll({
            where:{ id:req.params.id }  // Buscamos un producto específico en la base de datos según su ID
        })
        res.json(product[0]);  // Enviamos el producto como respuesta en formato JSON
    } catch (error) {
        res.json({message: error.message});  // Enviamos un mensaje de error en caso de que ocurra algún problema
    }
}

// Crear un registro
export const createProduct = async (req,res) => {
    try {
        await ProductModel.create(req.body);  // Creamos un nuevo producto en la base de datos utilizando los datos recibidos en el cuerpo de la solicitud
        res.json({
            'message': 'registro creado'  // Enviamos un mensaje de éxito como respuesta
        });
    } catch (error) {
        res.json({message: error.message});  // Enviamos un mensaje de error en caso de que ocurra algún problema
    }
}

// Actualizar registro
export const updateProducts = async (req,res) =>{
    try {
        await ProductModel.update(req.body, {
            where: {id: req.params.id}  // Actualizamos un producto específico en la base de datos según su ID utilizando los nuevos datos recibidos en el cuerpo de la solicitud
        });
        res.json({
            'message': 'registro actualizado'  // Enviamos un mensaje de éxito como respuesta
        });
    } catch (error) {
        res.json({message: error.message});  // Enviamos un mensaje de error en caso de que ocurra algún problema
    }
}

// Eliminar registro
export const deleteProduct = async (req,res) =>{
    try {
        await ProductModel.destroy(req.body, {
            where: {id: req.params.id}  // Eliminamos un producto específico de la base de datos según su ID
        });
        res.json({
            'message': 'registro borrado'  // Enviamos un mensaje de éxito como respuesta
        });
    } catch (error) {
        res.json({message: error.message});  // Enviamos un mensaje de error en caso de que ocurra algún problema
    }
}

// Reservar o no reservar productos por medio de un click al carrito
export const bookProduct = async (req, res) => {
    try {
        console.log(productsStock);
        if (req.query.f === 'unbook'){
            productsStock[req.params.id]++;  // Incrementamos el stock del producto
            return res.json('Unbooked');  // Enviamos un mensaje indicando que se ha cancelado la reserva
        } else if (req.query.f === 'book') {
            if (productsStock[req.params.id] == 0) return res.json('Stockout');  // Verificamos si el stock del producto es igual a cero y enviamos un mensaje indicando que no hay stock disponible
            productsStock[req.params.id]--;  // Decrementamos el stock del producto
            return res.json('Booked');  // Enviamos un mensaje indicando que se ha realizado la reserva
        } 
        res.status(400).json('Bad request');  // Enviamos un mensaje de error en caso de una solicitud incorrecta
    } catch (error) {
        res.json({message: error.message});  // Enviamos un mensaje de error en caso de que ocurra algún problema
    }
}

// Se actualiza el contenido de la base de datos
const updateContent = async (product, quantity) => {
    const stock = await ProductModel.findAll({
        attributes: ['id', 'stock'],
        where:{ id: product }  // Buscamos el producto en la base de datos según su ID y obtenemos su stock actual
    })
    console.log(quantity);
    await ProductModel.update({stock: stock[0].dataValues.stock - quantity[product]}, {
        where: {id: product}  // Actualizamos el stock del producto en la base de datos restando la cantidad comprada
    })
    if (productMinStock[product].stockMin >= (stock[0].dataValues.stock - quantity[product])){
        sendMail({id: product});  // Si el stock después de la compra es menor o igual al stock mínimo permitido, enviamos un correo electrónico
    }
}

// Se compran los productos y se utiliza updatecontent para actualizar el contenido de cada uno
export const buyProducts = async (req, res) => {
    try {
        console.log(typeof(req.body));
        Object.keys(req.body).forEach(product => updateContent(product, req.body));  // Iteramos sobre los productos comprados y actualizamos su contenido en la base de datos
        res.json("Successful purchase");  // Enviamos un mensaje de éxito como respuesta
    } catch (error) {
        res.json(error.message);  // Enviamos un mensaje de error en caso de que ocurra algún problema
    }
}
