const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const apiRoutes = require ('./app/routing/apiRoutes');
const htmlRoutes = require ('./app/routing/htmlRoutes');

app.use('/', htmlRoutes);
app.use('/', apiRoutes);

app.listen(PORT, () => {
    console.log('App listening on PORT' + PORT);
})