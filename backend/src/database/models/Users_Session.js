const { DataTypes } = require('sequelize');

function sessionModel(database) {
    return database.define('session', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
}

module.exports = (database) => {
    sessionModel(database)
}