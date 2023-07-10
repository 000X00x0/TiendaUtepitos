import db from "../database/db.js";  // Se importa el módulo de base de datos para conectarse a la base de datos

import DataTypes from "sequelize";  // Se importa el módulo de Sequelize para definir los tipos de datos de la base de datos

// Se define el modelo de todos los productos, especificando los campos y sus tipos de datos
const ProductModel = db.define('product', {
    nameProduct: { type: DataTypes.STRING },  // Nombre del producto (cadena de texto)
    priceProduct: { type: DataTypes.NUMBER },  // Precio del producto (número)
    descriptionProduct: { type: DataTypes.TEXT },  // Descripción del producto (texto)
    img1: { type: DataTypes.TEXT },  // Imagen 1 del producto (texto)
    img2: { type: DataTypes.TEXT },  // Imagen 2 del producto (texto)
    img3: { type: DataTypes.TEXT },  // Imagen 3 del producto (texto)
    stockMax: { type: DataTypes.INTEGER },  // Stock máximo del producto (número entero)
    stockMin: { type: DataTypes.INTEGER },  // Stock mínimo del producto (número entero)
    Stock: { type: DataTypes.INTEGER }  // Stock actual del producto (número entero)
});

export default ProductModel;  // Se exporta el modelo de producto para ser utilizado en otros archivos
