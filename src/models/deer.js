// deer.js
module.exports = (sequelize, DataTypes) => {
  const deer = sequelize.define('deer', {
    deerName: { 
      type: DataTypes.STRING, 
      primaryKey: true, 
      allowNull: false 
    },
  },{timestamps:false});
	
	deer.associate = function (models) {
    models.deer.belongsTo(models.area, {
      foreignKey: {
        name: "areaId", 
        allowNull:false
      },
      onUpdate: 'CASCADE'
    });
  };

  return deer;
};