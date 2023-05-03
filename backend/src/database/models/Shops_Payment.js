const { DataTypes } = require('sequelize');

function paymentModel(database) {
	return database.define('payment', {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		amount: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM('Pending', 'Cancelled', 'Paid'),
			defaultValue: 'Pending',
		},
	});
}

module.exports = (database) => {
	paymentModel(database);
};
