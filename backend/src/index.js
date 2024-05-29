require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
require('swagger-ui-dist').absolutePath();

const db = require('./config/db');
const socket = require('./socket');
const Router = require('./routes');
const authMiddleware = require('./app/middlewares/authMiddleware');
const handleErrorMiddleware = require('./app/middlewares/handleErrorMiddleware');
const OnlineStatusModel = require('./app/models/onlineStatusModel');
const swaggerDocument = require('../swagger.json');
const dailyTaskController = require('./app/controllers/dailyTaskController');

const app = express();
const PORT = process.env.PORT || 7890;

// Use swagger
const options = {
    explorer: true,
    customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui.min.css',
};

app.use(
    '/api/swagger',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options),
);

// MIDDLEWARES
app.use(
    cors({
        allowedHeaders: '*',
    }),
);

// middleware trong express xử lý dữ liệu dạng JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);

// Middleware authentication
app.use('/api/private', authMiddleware);

// Connect DB
db.connect();

// Router init
Router(app);

//
dailyTaskController.birthdayTaskNotify();
dailyTaskController.deleteToken();

// Middleware handle error
app.use(handleErrorMiddleware);

mongoose.connection.once('open', () => {
    const server = app.listen(PORT, () =>
        console.log(`Server running on port: ${PORT}`),
    );

    socket.connect(server);
});
