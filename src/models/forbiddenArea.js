module.exports = (sequelize, DataTypes) => {
  const forbiddenArea = sequelize.define('forbiddenArea', {
		id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false 
    },
	  boundary: {
			type: DataTypes.GEOMETRY('POLYGON'),
			allowNull: false
		},
  },{timestamps:false});

	return forbiddenArea;
}