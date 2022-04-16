const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('temper', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
}