const { DataTypes } = require('sequelize');

function categoryModel(database) {
    return database.define('category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isDisabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { timestamps: false });
}

module.exports = (database) => {
    categoryModel(database)
}