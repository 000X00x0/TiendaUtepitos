import db from "../database/db.js"; //se busca conectarse a la base de datos

import { DataTypes } from "sequelize";//Tipo de datos para cada atributo de la base de datos

//El modelo de todos los productos extrayendo todos sus campos
const ProductModel = db.define ('product',{
    nameProduct: {type: DataTypes.STRING},
    priceProduct: {type: DataTypes.NUMBER},
    descriptionProduct: {type: DataTypes.TEXT},
    img1: {type: DataTypes.TEXT},
    img2: {type: DataTypes.TEXT},
    img3: {type: DataTypes.TEXT},
    stockMax: {type: DataTypes.INTEGER},
    stockMin: {type: DataTypes.INTEGER},
    Stock: {type: DataTypes.INTEGER}
});

export default ProductModel;