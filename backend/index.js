const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Models/db');
const AuthRouter = require('./Routes/authRouter');
const productRouter = require('./Routes/productRouter');

const PORT = process.env.PORT || 5000;

// CORS config
const corsOptions = {
  origin: 'https://auth-mern-app-fh4u.vercel.app', 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/auth', AuthRouter);
app.use('/product', productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
