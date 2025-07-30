const express = require('express');
const app =express();
const bodyParser= require('body-parser');
const cors= require('cors');
require('dotenv').config();
require('./Models/db');
const AuthRouter= require('./Routes/authRouter');
const productRouter = require('./Routes/productRouter');

const PORT=process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT"]
}));
app.use('/auth', AuthRouter);
app.use('/product', productRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})