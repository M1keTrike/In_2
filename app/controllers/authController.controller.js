const db = require("../config/db.config.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const usuario = require("../models/usuarios.model.js");
dotenv.config();

exports.register = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const {
    username,
    password,
    apellidos,
    direccion,
    correo_electronico,
    telefono,
    roles,
  } = req.body;

  const usuarios = await usuario.getAllUsers();

  let duplicated = false;

  usuarios.forEach((usur) => {
    if (usur.nombre === req.body.username) duplicated = true;
  });
  if (duplicated) {
    res.status(500).send({ message: "Ese usuario ya existe" });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const query =
    "INSERT INTO usuarios (nombre, contraseña, apellidos, direccion, correo_electronico, telefono, roles) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      username,
      hashedPassword,
      apellidos,
      direccion,
      correo_electronico,
      telefono,
      roles,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(201).send({ id: result.insertId, username });
    }
  );
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM usuarios WHERE nombre = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const user = results[0];

    const passwordIsValid = bcrypt.compareSync(password, user.contraseña);
    if (!passwordIsValid) {
      res.status(401).send({ token: null, message: "Invalid Password" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    res.setHeader("Authorization", "Bearer " + token);
    res.status(200).send({
      message: "Login successful",
      id_user: user.id,
      user_role: user.roles,
    });
  });
};
