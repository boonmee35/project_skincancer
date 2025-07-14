const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

// Routes
const fs = require('fs');
const path = require('path');

const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const route = require(`./routes/${file}`);
    app.use('/api', route);
  });


app.use('/uploads', express.static('uploads'));

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

