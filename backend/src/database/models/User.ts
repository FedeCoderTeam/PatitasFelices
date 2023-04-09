import {DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from 'sequelize';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: number;
}

function userModel(database: Sequelize) {
    return database.define<UserModel>('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
}

module.exports = (database: Sequelize) => {
    userModel(database)
}