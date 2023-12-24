const mongoose = require('mongoose');

async function connect() {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            readPreference: 'nearest', // Set the read preference to nearest
        };

        await mongoose.connect(process.env.URI_MONGODB, options);

        console.log('Connection successfully!');
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    connect,
};
