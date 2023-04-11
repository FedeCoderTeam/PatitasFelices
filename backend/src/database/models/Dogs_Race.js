const { DataTypes } = require('sequelize');

function raceModel(database) {
    return database.define('race', {
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
    raceModel(database)
}