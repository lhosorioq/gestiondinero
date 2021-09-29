const mongoose = require('mongoose');
const { Schema } = mongoose;

let UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

// Convertir a modelo y exportar modelo
const User = mongoose.model('User', UserSchema); 
export default User;