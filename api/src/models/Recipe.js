const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('recipe', {     // defino el modelo
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
    },
    summaryOfTheDish:{
      type: DataTypes.TEXT,
    },
    levelOfHealthyEating:{
      type: DataTypes.INTEGER,
      validate:{
        min:0,
        max:100
      }
    },
    stepByStep:{
      type: DataTypes.STRING
      // type: DataTypes.ARRAY(DataTypes.JSON),
    } ,
    createIndb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },{ timestamps: false});
};
