const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

// Création de la connexion Sequelize avec Azure PostgreSQL
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,           // bien utiliser le port de l'environnement
    dialect: dbConfig.dialect,
    dialectOptions: {
      ssl: dbConfig.ssl            // active SSL pour Azure
    },
    pool: dbConfig.pool,
    logging: false                 // désactive les logs SQL si tu veux
  }
);

const db = {};

// Sequelize et connexion
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import des modèles
db.user = require("./user.model.js")(sequelize, DataTypes);
db.role = require("./role.model.js")(sequelize, DataTypes);
db.item = require("./item.model.js")(sequelize, DataTypes);

// Relations
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// db.user.hasMany(db.item, { as: 'items' });
// db.item.belongsTo(db.user, { foreignKey: 'id', as: 'UserId' });

// Seed des rôles initiaux
db.seedRoles = async () => {
  const roles = ["user", "admin"];
  for (let i = 0; i < roles.length; i++) {
    const exists = await db.role.findOne({ where: { name: roles[i] } });
    if (!exists) {
      await db.role.create({ name: roles[i] });
    }
  }
};

// Liste des rôles
db.ROLES = ["user", "admin"];

module.exports = db;
