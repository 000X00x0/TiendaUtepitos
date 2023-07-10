import { Sequelize } from 'sequelize';  // Se importa el módulo Sequelize

// Se conecta a la base de datos usando Sequelize, con los parámetros de nombre de base de datos, usuario y contraseña
const db = new Sequelize('store', 'root', '123456', {
    host: 'localhost',  // Host del servidor de base de datos (en este caso, local)
    dialect: 'mysql'  // Dialecto de la base de datos (en este caso, MySQL)
});

export default db;  // Se exporta la instancia de Sequelize para ser utilizada en otros archivos
