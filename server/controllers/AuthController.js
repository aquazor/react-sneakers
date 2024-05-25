import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET_KEY } from '../constants.js';
import User from '../models/User.js';

export const getMe = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = { id: user.id, email: user.email };

    return res.json({ user: userData });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return res.status(500).json({ error });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    return res.status(500).json({ error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Wrong email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '30d',
    });

    return res.json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    console.error('Error logging in user:', error.message);
    return res.status(500).json({ error });
  }
};
