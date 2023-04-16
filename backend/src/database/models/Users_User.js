const { DataTypes} = require('sequelize');

function userModel(database) {
    return database.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        googleId: {
            type: DataTypes.STRING,
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
        password: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.TEXT,
            defaultValue: 'https://i.imgur.com/veqwMvk.jpg'
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
