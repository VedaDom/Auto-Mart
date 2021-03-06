//  Import Modules
const express = require('express');
var cors = require('cors');

//  Import Routes
const user_route = require('./routes/user.route');
const car_route = require('./routes/car.route');
const order_route = require('./routes/order.route');
const flag_route = require('./routes/flag.route');
const { Database } = require('./helpers/db/auto_mart.db');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000

//  Middlewares
app.use(express.json()); //  Json Middleware
app.use('/api/v1', user_route);
app.use('/api/v1', car_route);
app.use('/api/v1', order_route);
app.use('/api/v1', flag_route);

const db = new Database();
db.createDb();

const server = app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
});

module.exports = server;