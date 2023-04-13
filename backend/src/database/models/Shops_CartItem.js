const { DataTypes } = require('sequelize');

function cartItemModel(database) {
    return database.define('cartItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { timestamps: false });
}

module.exports = (database) => {
    cartItemModel(database)
}