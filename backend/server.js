const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// CORS
const corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import de la base de données
const db = require("./models");

// Synchronisation Sequelize et seed des rôles
db.sequelize.sync({ alter: true }).then(async () => {
  console.log("Tables créées ou modifiées si nécessaire");
  await db.seedRoles(); // ajoute les rôles initiaux
});

// Routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/item.routes")(app);

// PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Test de connexion DB
app.get('/db-test', async (req, res) => {
  try {
    // Utilisation de Sequelize pour tester la connexion
    await db.sequelize.authenticate();
    res.send('Connexion PostgreSQL OK ✅');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
