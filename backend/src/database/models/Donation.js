const { DataTypes } = require('sequelize');

function donationModel(database) {
    return database.define('donation', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: 'Anonymous'
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Pending', 'Cancelled', 'Paid'),
            defaultValue: 'Pending'
        }
    });
}

module.exports = (database) => {
    donationModel(database)
}