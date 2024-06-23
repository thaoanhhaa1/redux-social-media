require('dotenv').config();
const compression = require('compression');
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
const swaggerDocument = require('../swagger.json');
const dailyTaskController = require('./app/controllers/dailyTaskController');

const app = express();
const PORT = process.env.PORT || 7890;

// Static files
app.use(express.static('public'));

// Use swagger
const options = {
    explorer: true,
    customCssUrl: '/customCssSwagger.css',
};

app.use(
    '/api/swagger',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options),
);

// MIDDLEWARES
// Nén data
app.use(compression());

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
dailyTaskController.analyzeTweets();

// Middleware handle error
app.use(handleErrorMiddleware);

app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

mongoose.connection.once('open', () => {
    const server = app.listen(PORT, () =>
        console.log(`Server running on port: ${PORT}`),
    );

    socket.connect(server);
});
