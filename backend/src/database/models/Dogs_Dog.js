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
            type: DataTypes.ENUM('Very large', 'Large', 'Medium', 'Small', 'Very small'),
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        castrated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, { timestamps: false });
}

module.exports = (database) => {
    dogModel(database)
}