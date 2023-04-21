const { DataTypes } = require('sequelize');

function orderModel(database) {
    return database.define('order', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: DataTypes.ENUM('Pending', 'Cancelled', 'Paid'),
            defaultValue: 'Pending'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        payment_method: {
            type: DataTypes.ENUM('Local', 'Mercado Pago'),
            allowNull: false
        }
    }, { updatedAt: false });
}

module.exports = (database) => {
    orderModel(database)
}