const { DataTypes } = require('sequelize');

function userVerificationModel(database) {
    return database.define('userVerification', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        expires_at: {
            type: DataTypes.DATE,
            defaultValue: Date.now() + 600000
        }
    }, { updatedAt: false });
}

module.exports = (database) => {
    userVerificationModel(database)
}