module.exports = (sequelize, DataTypes) => {
  const history = sequelize.define('history', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
			autoIncrement: true, 
      allowNull: false 
    },
		useEndPoint: {
			type: DataTypes.GEOMETRY('POINT'),
			allowNull: false 
		},
		useStartPoint: {
			type: DataTypes.GEOMETRY('POINT'),
			allowNull: false 
		},
		useStartAt: {
			type: DataTypes.DATE,
			allowNull: false 
		},
		useEndAt: {
			type: DataTypes.DATE,
			allowNull: false 
		},
  },{timestamps:false});
	
	history.associate = function (models) {
    models.history.belongsTo(models.user, {
      foreignKey: {
        name: "userId", 
        allowNull:false
      },
      onUpdate: 'CASCADE'
    });
  };

	history.associate = function (models) {
    models.history.belongsTo(models.deer, {
      foreignKey: {
        name: "deerId", 
        allowNull:false
      },
      onUpdate: 'CASCADE'
    });
  };

  return history;
};