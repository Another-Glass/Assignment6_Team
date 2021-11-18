module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      allowNull: false 
    }
  },{timestamps:false});

  return user;
};