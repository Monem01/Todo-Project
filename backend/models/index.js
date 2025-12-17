const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    pool: dbConfig.pool,
    logging: false // désactive les logs SQL, tu peux mettre true pour debug
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.item = require("./item.model.js")(sequelize, Sequelize);

// Associations
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// Seed roles
db.seedRoles = async () => {
  const roles = ["user", "admin"];
  for (let i = 0; i < roles.length; i++) {
    const exists = await db.role.findOne({ where: { name: roles[i] } });
    if (!exists) {
      await db.role.create({ name: roles[i] });
    }
  }
};

db.ROLES = ["user", "admin"];

module.exports = db;
