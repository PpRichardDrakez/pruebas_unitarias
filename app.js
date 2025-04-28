const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/', routes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

module.exports = app;
