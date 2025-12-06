module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define('roles', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: true, // gère automatiquement createdAt et updatedAt
});
	return Role;
};
