module.exports = {
	host: process.env.DB_HOST,
	port: 5432,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	dialect: "postgres",
	ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};
