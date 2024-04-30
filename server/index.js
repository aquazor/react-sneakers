import express from 'express';
import cors from 'cors';
import { AuthController, CartController, ItemsController } from './controllers/index.js';
import { checkAuth } from './utils/index.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/images', express.static('storage/img'));

app.get('/auth/getMe', checkAuth, AuthController.getMe);
app.post('/auth/register', AuthController.register);
app.post('/auth/login', AuthController.login);

app.get('/items', ItemsController.getItems);
app.post('/cart/add', checkAuth, CartController.addItem);
app.delete('/cart/remove', checkAuth, CartController.removeItem);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
