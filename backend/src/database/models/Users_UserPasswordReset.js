const { DataTypes } = require('sequelize');

function userPasswordResetModel(database) {
    return database.define('userPasswordReset', {
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
            defaultValue: Date.now() + (15*60*1000)
        }
    }, { updatedAt: false });
}

module.exports = (database) => {
    userPasswordResetModel(database)
}