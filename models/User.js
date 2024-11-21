const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

// Definir el esquema para los usuarios
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // Fecha de creación
    updatedAt: { type: Date, default: Date.now }  // Fecha de la última actualización
  }
);

// Encriptar la contraseña antes de guardar el usuario
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Método para comparar la contraseña encriptada
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Crear el modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
