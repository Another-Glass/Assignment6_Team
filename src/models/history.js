module.exports = (sequelize, DataTypes) => {
  const history = sequelize.define('history', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
			autoIncrement: true, 
      allowNull: false 
    },
		endPoint: {
			type: DataTypes.GEOMETRY('POINT'),
			allowNull: false 
		},
		startPoint: {
			type: DataTypes.GEOMETRY('POINT'),
			allowNull: false 
		},
		startTime: {
			type: DataTypes.DATE,
			allowNull: false 
		},
		endTime: {
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