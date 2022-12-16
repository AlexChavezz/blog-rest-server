
class Server {
    constructor()
    {
        this.app = require('express')();
        this.port = process.env['PORT']||3000;
        this.path = '/api'
        this.dbconnection();
        this.middlewares();
        this.routes();

    }
    middlewares()
    {
        this.app.use(require('cors')());
        this.app.use(require('express').json());
    }
    routes()
    {
        this.app.use(`${this.path}/comments`, require('../routes/blog.routes'));
    }
    dbconnection()
    {
        const client = require('../database/Client');
        client.connect((err) => {
            if (err) 
            {
                console.error(err);
                return;
            }
            console.log('Connected to MongoDB');
        });
    }
    listen()
    {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });        
    }
}

module.exports = Server;