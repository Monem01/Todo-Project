const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("../backend/models");

db.sequelize.sync({ alter: true }).then(() => {  // crée la table si besoin
  console.log("Tables créées ou modifiées si nécessaire");
  db.seedRoles();  // ajoute les rôles initiaux
});

require("../backend/routes/auth.routes")(app);
require("../backend/routes/user.routes")(app);
require("../backend/routes/item.routes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
