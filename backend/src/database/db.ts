import * as dotenv from 'dotenv'
import * as process from "process";
import {Op, Sequelize} from 'sequelize'

import * as path from 'path'
import * as fs from 'fs';

dotenv.config()

const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    // dialectOptions: {
    //   ssl: true,
    //   native:true,
    // }
})

const basename: string = path.basename(__filename);

const modelDefiners: any[] = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file: string) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
    .forEach((file: string) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)))
    })

modelDefiners.forEach(model => model(sequelize))

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
Object.assign(sequelize.models, Object.fromEntries(capsEntries))

// const { Country, Activity } = sequelize.models;

// Country.belongsToMany(Activity, { through: 'Country_Activity', timestamps: false})
// Activity.belongsToMany(Country, { through: 'Country_Activity', timestamps: false})

module.exports = {
    ...sequelize.models,
    conn: sequelize,
    Op
}