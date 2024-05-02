import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants.js';
import { axiosClient } from '../axios.js';

export const getMe = async (req, res) => {
  const userId = req.userId;

  const { data } = await axiosClient.get(`/users?id=${userId}`);

  if (data.length === 0) {
    return res.status(404).json({ message: 'Not found' });
  }

  const userData = data[0];
  const user = { id: userData.id, email: userData.email };

  return res.json({ user });
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await axiosClient.get(`/users?email=${email}`);

  if (existingUser.data.length > 0) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    email,
    password,
  };

  await axiosClient.post(`/users`, newUser);

  return res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Поиск пользователя по email
  const { data } = await axiosClient.get(`/users?email=${email}`);

  const userData = data[0];

  if (data.length === 0 || userData.password !== password) {
    return res.status(401).json({ message: 'Wrong email or password' });
  }

  // Создание JWT токена
  const token = jwt.sign({ id: userData.id, email: userData.email }, SECRET_KEY, {
    expiresIn: '30d',
  });

  const user = { id: userData.id, email: userData.email };

  return res.json({ user, token });
};
