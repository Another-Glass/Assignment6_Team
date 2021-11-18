module.exports = (sequelize, DataTypes) => {
  const area = sequelize.define('area', {
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
		center: {
				type: DataTypes.GEOMETRY('POINT'),
				allowNull: false
		},
		priceBase: {
				type: DataTypes.INTEGER,
				allowNull: false
		},
		pricePerMinute: {
				type: DataTypes.INTEGER,
				allowNull: false
		}
  },{timestamps:false});

	return area;
}