const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    SummaryOfTheDish:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    LevelOfHealthyEating:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    StepByStep:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },{ timestamps: false});
};
