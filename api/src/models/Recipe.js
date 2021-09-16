const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image : {
      type: DataTypes.STRING,
      defaultValue : 'https://www.objetivobienestar.com/uploads/s1/36/60/12/Recetas-ingredientes-basicos-portada_1_780x462.jpg'
    },
    score:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });
};

