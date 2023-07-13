const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID, //genera clave unica y universal imposible que se repita
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true, // 
      allowNull: false,
    },
    image:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hp:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:1.0,
        max:100.0
      }
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:1.0,
        max:900.0
      }
    },
    defense:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:1.0,
        max:900.0
      }
    },
    speed:{
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:0.0,
        max:900.0
      }
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:0.0,
        max:900.0
      }
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:0.0,
        max:900.0
      }
    },
  },
  {
    timestamps: false,
  });
};
