import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants.js';

export const checkAuth = async (req, res, next) => {
  const token = req.get('Authorization' || '').replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'No access' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return err;
      }

      return decoded;
    });

    if (!decoded.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.id;
    console.log('Authed:', decoded.id);
    next();
  } catch (err) {
    res.status(403).json({ message: 'No access' });
  }
};
