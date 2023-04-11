const { DataTypes } = require('sequelize');
function colorModel(database) {
    return database.define('color', {
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
    colorModel(database)
}