const { DataTypes } = require('sequelize');

function orderItemModel(database) {
    return database.define('orderItem', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        total_price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    }, { updatedAt: false });
}

module.exports = (database) => {
    orderItemModel(database)
}