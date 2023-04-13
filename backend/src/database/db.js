require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`,
	{
		dialect: 'postgres',
		protocol: 'postgres',
		logging: false,
		dialectOptions: {
			ssl: true,
			native: true,
		},
	},
);
const basename = path.basename(__filename);

const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
	.filter(
		(file) =>
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});
modelDefiners.forEach((model) => model(sequelize));

const {
	dog,
	color,
	gender,
	temperament ,
	user,
	role,
	product,
	category,
	subCategory,
	cartItem,
} = sequelize.models;

dog.belongsToMany(color, { through: 'Dogs_Colors', timestamps: false });
color.belongsToMany(dog, { through: 'Dogs_Colors', timestamps: false });

dog.belongsToMany(temperament, { through: 'Dogs_Temperaments', timestamps: false, });
temperament.belongsToMany(dog, { through: 'Dogs_Temperaments', timestamps: false, });

gender.hasMany(dog, { foreignKey: 'genderId' });
dog.belongsTo(gender, { foreignKey: 'genderId' });

role.hasMany(user, { foreignKey: 'roleId' });
user.belongsTo(role, { foreignKey: 'roleId' });

category.hasMany(product, { foreignKey: 'categoryId' })
product.belongsTo(category, { foreignKey: 'categoryId' })

category.hasMany(subCategory, { foreignKey: 'categoryId' })
subCategory.belongsTo(category, { foreignKey: 'categoryId' })

subCategory.hasMany(product, { foreignKey: 'subCategoryId' })
product.belongsTo(subCategory, { foreignKey: 'subCategoryId' })

product.hasMany(cartItem, { foreignKey: 'productId' })
cartItem.belongsTo(product, { foreignKey: 'productId' })

module.exports = {
	...sequelize.models,
	conn: sequelize,
	Op,
};
