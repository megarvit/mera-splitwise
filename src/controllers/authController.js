// JWT authentication controller
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const generateToken = (user) => {
    return jwt.sign({
        userId: user.userId,
        email: user.email
    }, 
    process.env.JWT_SECRET || "splitwise_secret", {
        expiresIn: "7d"
    });
};

// SIGN UP
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ message : "All fields are required"});
        }

        // check if that user exists or not
        const existingUser = await User.findOne({ where: { email } });

        if(existingUser) {
            return res.status(400).json({ message : "User with this email already exists"});
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password,10);

        // create a user
        const user = await User.create({
            name, 
            email,
            password: hashedPassword
        });

        // generate a token
        const token = generateToken(user);

        res.status(201).json({
            message: "User created successfully",
            token,
            user : {
                userId : user.userId,
                name : user.name,
                email : user.email,
                currency : user.currency
            }
        });
    } catch (error){
        res.status(500).json({
            error: error.message
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message : "Email and password are required"});
        }

        // check if that user exists or not
        const user = await User.findOne({ where: { email } });

        if(!user) {
            return res.status(400).json({ message : "Invalid email or password"});
        }
        
        // check password is correct or not
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({ message : "Invalid credentials"});
        }

        // if password is correct then generate the token
        const token = generateToken(user);
        
        res.json({
            message: "Login successful",
            token,
            user : {
                userId : user.userId,
                name : user.name,
                email : user.email,
                currency : user.currency
            }
        });
    } catch (error){
        res.status(500).json({
            error: error.message
        });
    }
};

