const { DataTypes } = require ('sequelize');

function requestsModel(database) {
    return database.define('requests', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        phone: {
            type: DataTypes.INTEGER,
				allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true }
        },
        areas_conditions: {
            type: DataTypes.ENUM('Excellent', 'Good', 'Bad', 'N/A'),
			allowNull: false,
        },
        more_animals: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        moreAnimas_details: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'Escribe cuántos animales más viven en la casa y qué animales son.',
        },
        proper_income: {
            type: DataTypes.ENUM('Yes', 'No'),
			allowNull: false,
        },
        inHouse_allowance: {
            type: DataTypes.ENUM('Yes', 'No'),
			allowNull: false,
        },
        outDoor_image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
}

module.exports = (database) => {
    requestsModel(database)
}