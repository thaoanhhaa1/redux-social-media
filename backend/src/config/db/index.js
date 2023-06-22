const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.URI_MONGODB)
        console.log("Connection successfully!")
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    connect
}