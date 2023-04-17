const { DataTypes} = require('sequelize');

function userModel(database) {
    return database.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        image: {
            type: DataTypes.TEXT,
            defaultValue: 'https://i.imgur.com/veqwMvk.jpg'
        },
        isDisabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    { timestamps: false },
    );
}

module.exports = (database) => {
    userModel(database);
};
