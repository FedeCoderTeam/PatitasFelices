const { DataTypes } = require('sequelize');

function subCategoryModel(database) {
    return database.define('subCategory', {
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
    subCategoryModel(database)
}