require('dotenv').config();
const mongoose= require("mongoose");

const mongo_url = process.env.MONGO_CON;
mongoose.connect(mongo_url)
.then(()=>{
    console.log("Mongodb Connected...");
}) .catch((err)=>{
    console.log("Mongo error", err);
})