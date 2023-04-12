const { DataTypes } = require('sequelize');

function roleModel(database) {
    return database.define('role', {
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
    roleModel(database)
}