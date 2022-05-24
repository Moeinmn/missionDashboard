const http = require('http');

const mongoose = require('mongoose');
const {
    app
} = require('./app');
const writeSpaceXDataToDB = require('./services/spaceX');

require('dotenv').config()

const PORT = 8000;

;(async function connectDataBase() {
    
    await mongoose.connect(process.env.MONGO_URL);
    
})();

mongoose.connection.on('error', async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (err) {
        console.log('error loging in to mongo , retrying...');
    }
});
mongoose.connection.on('open', async() => {
    console.log('mongo connected');
    await writeSpaceXDataToDB();
    
    const server = http.createServer(app);
    server.listen(PORT,
        () => console.log(`Listening on port ${PORT}...`)
    )
})

