const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Employee = require("../models/empleado.model");
const Employer = require("../models/empleador.model");
const User = require("../models/user.models");
const Profile = require("../models/profile.models");
require('dotenv').config();


async function register(req, res) {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).send({ msg: "Faltan campos obligatorios" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ msg: "El usuario ya existe" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ email, password: hashedPassword, role });
    let profile = null;
    if (role === "employee") {
      const employee = await Employee.create({ ...req.body, user: user._id });
      profile =await await Profile.create({ userId: user._id, name: employee.name, age: 0, address: employee.address, phoneNumber: employee.phone });
    } else if (role === "employer") {
    const employer = await Employer.create({ ...req.body, user: user._id });
    profile = await Profile.create({ userId: user._id, name: employer.name, age: 0, address: "", phoneNumber: employer.phone });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(201).send({ token, user: { email, role }, profile });
    } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Error en el servidor" });
    }
    }
    
    async function login(req, res) {
    try {
    const { email, password } = req.body;
    if (!email || !password) {
    return res.status(400).send({ msg: "Faltan campos obligatorios" });
    }
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(401).send({ msg: "Credenciales inválidas" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return res.status(401).send({ msg: "Credenciales inválidas" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const profile = await Profile.findOne({ userId: user._id });
    return res.status(200).send({ token, user: { email, role: user.role }, profile });
    } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Error en el servidor" });
    }
    }
    
    module.exports = {
    register,
    login,
    };
