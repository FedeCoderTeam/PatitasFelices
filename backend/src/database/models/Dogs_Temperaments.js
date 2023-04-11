const { DataTypes } = require('sequelize');

function temperamentModel(database) {
    return database.define('temperament', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });
}

module.exports = (database) => {
    temperamentModel(database)
}