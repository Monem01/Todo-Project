const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// CORS
var corsOptions = {
  origin: [
    "https://myapp-angular-frontend-hydveef9f5gcgyby.francecentral-01.azurewebsites.net",
    "http://localhost:4200"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization","x-access-token"],
};

app.use(cors(corsOptions));

// Pour les pré‑requêtes OPTIONS 
app.options("*", cors(corsOptions));


// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database
const db = require("./models");

// Sync DB and seed roles
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Tables créées ou modifiées si nécessaire");
  db.seedRoles();
});

// Routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/item.routes")(app);

// Test DB connection
app.get("/db-test", async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.send("Connexion PostgreSQL OK ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
