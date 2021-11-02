import express from 'express'; 
import morgan from 'morgan'; 
import cors from 'cors'; 
import path from 'path';
import config from './config';
import userRoutes from './routes/users'

// Sirve para lidiar con modo history de Vue 
const history = require('connect-history-api-fallback'); 

const app = express(); 

// Configuraciones
app.set("port", config.port);

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 
//application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }))

app.use(history()); 
// Carpeta donde se enviaran todos los datos a HTML VUE
app.use(express.static(path.join(__dirname, 'public')));

app.use('/registros', userRoutes);

export default app;