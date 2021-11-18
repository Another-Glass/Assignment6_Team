module.exports = (sequelize, DataTypes) => {
  const parkingzone = sequelize.define('parkingzone', {
    id : { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false 
    },
    radius : { 
				type: DataTypes.INTEGER,
				allowNull: false,
    },
		centerPoint: {
			type: DataTypes.GEOMETRY('POINT'),
			allowNull: false 
		}
  },{timestamps:false});
	
	return parkingzone;
}