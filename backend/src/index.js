const express = require('express')
const cors = require('cors')

const db = require('./config/db')
const Router = require('./routes')

const app = express();
const PORT = 8080

require('dotenv').config()

app.use(cors({
    allowedHeaders: '*'
}))

// Connect DB
db.connect();

// middleware trong express xử lý dữ liệu dạng JSON
app.use(express.json())

// Router init
Router(app);

app.listen(PORT, () => console.log('Server running on port: ' + PORT))