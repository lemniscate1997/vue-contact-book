global.Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false,
    pool: {
        max: Number(process.env.MAXIMUM),
        min: Number(process.env.MINIMUM),
        acquire: Number(process.env.ACQUIRE),
        idle: Number(process.env.IDLE)
    },
    define: {
        timestamps: false
    },
    dialectOptions: {
        useUTC: false, // for reading from database
    },
    timezone: '+05:30'
});

const UsersModel = require("./users");
const ContactModel = require("./contact");

const models = {
    users: UsersModel.init(sequelize, Sequelize),
    contact: ContactModel.init(sequelize, Sequelize)
};

Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

sequelize.sync({ force: false })
    .then(() => {
        console.log("Database & tables created!")
    });

const db = {
    ...models,
    sequelize
};

module.exports = db;