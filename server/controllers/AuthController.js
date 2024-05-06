import jwt from 'jsonwebtoken';
import { axiosClient } from '../axios.js';
import { SECRET_KEY } from '../constants.js';

export const getMe = async (req, res) => {
  const userId = req.userId;

  const { data } = await axiosClient.get(`/users/${userId}`);

  console.log(data);

  if (data.length === 0) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userData = data[0];
  const user = { id: userData.id, email: userData.email };

  return res.json({ user });
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: userData } = await axiosClient.get(`/users?email=${email}`);

    if (userData.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  try {
    const newUser = {
      email,
      password,
    };

    await axiosClient.post(`/users`, newUser);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error registrating user' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: userData } = await axiosClient.get(`/users?email=${email}`);

    const userInfo = userData[0];

    if (userData.length === 0 || userInfo.password !== password) {
      return res.status(401).json({ message: 'Wrong email or password' });
    }

    const token = jwt.sign({ id: userInfo.id, email: userInfo.email }, SECRET_KEY, {
      expiresIn: '30d',
    });

    const user = { id: userInfo.id, email: userInfo.email };

    return res.json({ user, token });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(500).json({ message: 'Network error' });
  }
};
