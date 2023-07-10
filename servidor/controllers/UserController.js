import UserModel from "../models/UserModel.js";

// Comando para obtener todos los usuarios en formato JSON
export const getAllUsers = async (req, res) => {
    try {
        const Users  = await UserModel.findAll();  // Obtenemos todos los registros de usuarios de la base de datos
        res.json(Users);  // Enviamos los usuarios como respuesta en formato JSON
    } catch (error) {
        res.json({message: error.message});  // Enviamos un mensaje de error en caso de que ocurra algún problema
    }
}

// Se crea un registro de usuario
export const createUser = async (req, res) => {
    try {
        await UserModel.create(req.body);  // Creamos un nuevo usuario en la base de datos utilizando los datos recibidos en el cuerpo de la solicitud
        res.json({
            'message': 'registro creado'  // Enviamos un mensaje de éxito como respuesta
        });
    } catch (error) {
        res.json({message: error.message});  // Enviamos un mensaje de error en caso de que ocurra algún problema
    }
}

// Se actualiza un usuario específico
export const updateUser = async (req, res) => {
    try {
        await UserModel.update(req.body, {
            where: {id: req.params.id}  // Actualizamos un usuario específico en la base de datos según su ID utilizando los nuevos datos recibidos en el cuerpo de la solicitud
        });
        res.json({
            'message': 'registro actualizado'  // Enviamos un mensaje de éxito como respuesta
        });
    } catch (error) {
        res.json({message: error.message});  // Enviamos un mensaje de error en caso de que ocurra algún problema
    }
}

// Se obtiene un usuario específico
export const getUser = async (req, res) => {
    try {
       const user = await UserModel.findAll({
            where:{ id:req.params.id }  // Buscamos un usuario específico en la base de datos según su ID
        })
        res.json(user[0]);  // Enviamos el usuario como respuesta en formato JSON
    } catch (error) {
        res.json({message: error.message});  // Enviamos un mensaje de error en caso de que ocurra algún problema
    }
}
