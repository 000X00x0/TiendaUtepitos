import db from "../database/db.js";  // Se importa el módulo de base de datos para conectarse a la base de datos

import { DataTypes } from "sequelize";  // Se importa el módulo de Sequelize para definir los tipos de datos de la base de datos

// Se define el modelo de todos los usuarios, especificando los campos y sus tipos de datos
const UserModel = db.define('user', {
    userName: { type: DataTypes.STRING },  // Nombre de usuario (cadena de texto)
    userPassword: { type: DataTypes.STRING },  // Contraseña de usuario (cadena de texto)
    userAddress: { type: DataTypes.STRING },  // Dirección de usuario (cadena de texto)
    userTelephone: { type: DataTypes.STRING },  // Teléfono de usuario (cadena de texto)
    userEmail: { type: DataTypes.STRING },  // Correo electrónico de usuario (cadena de texto)
});

export default UserModel;  // Se exporta el modelo de usuario para ser utilizado en otros archivos
