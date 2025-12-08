const express = require('express');
const path = require('path');

const app = express();

// Servir les fichiers statiques Angular
app.use(express.static(path.join(__dirname, 'dist/frontend')));

// Toutes les routes renvoient index.html (pour Angular routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/frontend/index.html'));
});

// Port fourni par Azure ou par défaut
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Angular frontend running on port ${PORT}`));
