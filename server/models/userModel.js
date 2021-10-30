import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

let UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    movimientos: Array,
    category: Array,
    concepts: Array,
});

// Encrypta contraseña
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compara contraseña ingresada con base de datos
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Exportar modelo
export default model('User', UserSchema);