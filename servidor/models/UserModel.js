import db from "../database/db.js";//se importa la base de datos para extraer info

import { DataTypes } from "sequelize";//tipo de dato extraido de la base de datos

//El modelo de todos los usuarios extrayendo todos sus campos
const UserModel = db.define ('user',{
    userName: {type: DataTypes.STRING},
    userPassword: {type: DataTypes.STRING},
    userAdress: {type: DataTypes.STRING},
    userTelephone: {type: DataTypes.STRING},
    userEmail: {type: DataTypes.STRING},
});

export default UserModel;