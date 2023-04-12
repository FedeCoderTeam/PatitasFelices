const { DataTypes } = require('sequelize');
function dogModel(database) {
    return database.define('dog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        size: {
            type: DataTypes.ENUM('Giant', 'Large', 'Medium', 'Small', 'Mini'),
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        castrated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        adopted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isDisabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, { timestamps: false });
}

module.exports = (database) => {
    dogModel(database)
}