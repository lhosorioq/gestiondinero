import express from 'express'; 
import morgan from 'morgan'; 
import cors from 'cors'; 
import path from 'path';

const mongoose = require('mongoose'); 
// Sirve para lidiar con modo history de Vue 
const history = require('connect-history-api-fallback'); 

const app = express(); 

// const uri = 'mongodb://localhost:27017/gestiondinero'; 
const uri = 'mongodb+srv://gestionadmin:G3st10nD1n3r0@gestiondinero.kvajf.mongodb.net/gestiondinero?retryWrites=true&w=majority'
// useCreateIndex: true esto fue reemplazado por useUnifiedTopology: true ya que esta obsoleto
const options = {useNewUrlParser: true, useUnifiedTopology: true};

// Conectar DB gestiondinero
mongoose.connect(uri, options)
    .then(() => { 
        console.log('Conectado a DB gestiondinero') 
    },
    err => { 
        console.log(err) 
    });

// Configuraciones
app.set('port', process.env.PORT || 3000); //Si el servidor me da un puerto que lo use de lo contrario que use el 3000

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json()); 
//application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }))


app.use(history()); 
// Carpeta donde se enviaran todos los datos a HTML VUE
app.use(express.static(path.join(__dirname, 'public')));


// Primera ruta solo para prueba
// app.get('/',(req, res) => { 
//     res.send('Hello World!'); 
// }); 
app.use('/registros', require('./routes/users'));

//Servidor escuchando
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ' + app.get('port'));
});