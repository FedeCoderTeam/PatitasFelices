const { DataTypes, STRING } = require('sequelize');

function orderModel(database) {
	return database.define(
		'order',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			status: {
				type: DataTypes.ENUM('Pending', 'Cancelled', 'Paid'),
				defaultValue: 'Pending',
			},
			total: {
				type: DataTypes.DECIMAL,
				allowNull: false,
			},
			payment_method: {
				type: DataTypes.ENUM('Local', 'Mercado Pago'),
				allowNull: false,
			},
			source: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ updatedAt: false },
	);
}

module.exports = (database) => {
	orderModel(database);
};
