module.exports = (sequelize, DataTypes) => {
  const area = sequelize.define('area', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false 
    },
    boundary: { 
				type: DataTypes.GEOMETRY,
				allowNull: false
		},
		center: {
				type: DataTypes.GEOMETRY,
				allowNull: false
		},
		coords: {
				type: DataTypes.GEOMETRY,
				allowNull: false
		},
		piceBase: {
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