if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Server = require('./model/Server');

const server = new Server();

server.listen();