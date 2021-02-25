import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';

const server = new Server();

// Body parse
server.app.use( bodyParser.urlencoded({extended: true}));
server.app.use( bodyParser.json());

server.app.use('/user', userRoutes);

// Conectar base de datos
mongoose.connect('mongodb://localhost:27017/photosgram', {
    useNewUrlParser: true, useCreateIndex: true,
}, (error) => {
    if (error) {
        throw error;
    }
    console.log('base de datos online');
});

// Levantar express
server.start();