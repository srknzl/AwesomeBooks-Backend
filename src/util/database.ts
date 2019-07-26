import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize("shop","root","11037600",{
    host: "localhost",
    dialect: "mysql",
    modelPaths: [__dirname + "/.." + '/models']
});