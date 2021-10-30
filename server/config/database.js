import mongoose from "mongoose";

const uri = 'mongodb+srv://gestionadmin:G3st10nD1n3r0@gestiondinero.kvajf.mongodb.net/gestiondinero?retryWrites=true&w=majority';

const options = {useNewUrlParser: true, useUnifiedTopology: true};

// Conectar DB gestiondinero
(async () => {
    const db = await mongoose.connect(uri, options);
    console.log('Conectado a DB gestiondinero', db.connection.name);
})();
