const expressAsyncHandler = require("express-async-handler");
const Auth = require("../models/AuthSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register User
const Register = expressAsyncHandler(async (req, res) => {
    const { name, phone, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !phone || !email || !password) {
        res.status(400);
        throw new Error("Please Fill All Details!!");
    }

    // Validate phone number
    if (phone.length !== 10) {
        res.status(400);
        throw new Error("Enter a Valid Phone Number!!");
    }

    // Check if user already exists
    const emailExist = await Auth.findOne({ email });
    const phoneExist = await Auth.findOne({ phone });

    if (emailExist || phoneExist) {
        res.status(403);
        throw new Error("User Already Exists || Enter a Unique Number");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await Auth.create({ name, phone, email, password: hashedPassword });

    if (!user) {
        res.status(400);
        throw new Error("User Not Registered!!");
    } else {
        res.status(201).json({
            id: user._id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            admin: user.isAdmin,
            token: generateToken(user._id),
        });
    }
});

// Login User
const Login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please Fill Details!!");
    }

    const user = await Auth.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user._id,
            email: user.email,
            admin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

// Private Route
const PrivateController = async (req, res) => {
    res.json(req.user);
};

// Generate Token
const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { Register, Login, PrivateController };
