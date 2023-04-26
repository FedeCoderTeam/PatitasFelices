const { DataTypes } = require('sequelize');

function reviewsModel(database) {
    return database.define('reviews', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
});
}

module.exports = (database) => {
    reviewsModel(database)
}