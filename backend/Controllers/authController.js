const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { userModel } = require('../Models/user');

const singup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User already exists, you can login",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({
            message: "Signup successfully",
            success: true
        });

    } catch (err) {
        console.error(err);  
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const {email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: "Authentication is failed, check your email or password",
                success: false
            });
        }

        const isPasEqual = await bcrypt.compare(password, user.password);
        if(!isPasEqual){
            return res.status(403).json({
                message: "Authentication is failed, check your email or password",
                success: false
            });
        }

        const jwtoken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SEC,
            {expiresIn: "24h"}
        )


        res.status(200).json({
            message: "SignIn Successfull",
            success: true,
            jwtoken,
            email,
            name: user.name
        });

    } catch (err) {
        console.error(err);  
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


module.exports = {
    singup,
    login,
};
