module.exports = {
  host: process.env.DB_HOST, // mp2l-postgres.postgres.database.azure.com
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME, // peandb
  user: process.env.DB_USER, // postgres@mp2l-postgres
  password: process.env.DB_PASSWORD, // Mot de passe exact
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
