import { Sequelize } from "sequelize";

const connectionURL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
console.log(connectionURL);
const dbClient = new Sequelize(connectionURL);
export default dbClient;
