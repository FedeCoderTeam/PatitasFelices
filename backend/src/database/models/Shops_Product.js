const { DataTypes } = require('sequelize');

function productModel(database) {
	return database.define(
		'product',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			price: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			image: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			brand: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			isDisabled: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{ timestamps: false },
	);
}

module.exports = (database) => {
	productModel(database);
};
