const { DataTypes } = require('sequelize');

function productModel(database) {
    return database.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        }
    });
}

module.exports = (database) => {
    productModel(database)
}