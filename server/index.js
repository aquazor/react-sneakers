import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import { AuthController, CartController, ItemsController } from './controllers/index.js';
import { checkAuth } from './utils/index.js';

const app = express();
configDotenv();

const PORT = process.env.PORT || 7777;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(process.env.MONGODB_CONNECT_URI)
  .then(() => {
    console.log('DB Connected');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());
app.use('/images', express.static('storage/img', { maxAge: '2d' }));

app.get('/auth/getMe', checkAuth, AuthController.getMe);
app.post('/auth/register', AuthController.register);
app.post('/auth/login', AuthController.login);

app.get('/items', ItemsController.getItems);

app.post('/cart', checkAuth, CartController.syncAndGetItems);
app.post('/cart/add', checkAuth, CartController.addOrUpdateItem);
app.delete('/cart/remove', checkAuth, CartController.removeItem);
app.delete('/cart/decrement', checkAuth, CartController.decrementItemCount);
