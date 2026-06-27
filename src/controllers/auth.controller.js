const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'El email ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno en el registro.' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Falta email o contraseña.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret_key_por_defecto',
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno en el login.' });
  }
}

async function logout(req, res) {
  return res.status(200).json({ message: 'Logout exitoso. Elimine el token en el cliente.' });
}

async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener datos del usuario.' });
  }
}

module.exports = { register, login, logout, getMe };