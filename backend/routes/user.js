const express = require('express');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer/customer');
console.log('Customer Model:', Customer); // Should log the model details

const multer = require('multer');
const path = require('path');

const router = express.Router();

// Get all users data
router.get('/users', async (req, res) => {
    try {
        const users = await Customer.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

router.post("/signup", async (req, res) => {
    const { Fname, Lname, Email, Password } = req.body;
    const user = await Customer.findOne({ Email });

    if (user) {
        return res.json({ message: "User already exists" });
    }

    const newUser = new Customer({
        Fname,
        Lname,
        Email,
        Password
    });

    await newUser.save();
    return res.json({ status: true, message: "Record registered" });
});

router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;
    const user = await Customer.findOne({ Email });

    if (!user) {
        return res.json({ message: "User is not registered" });
    }

    if (Password !== user.Password) {
        return res.json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id, Fname: user.Fname, Lname: user.Lname }, process.env.KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 600000 });
    return res.json({ status: true, message: "Login successful" });
});
const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ status: false, message: "No token" });
        }

        const decoded = jwt.verify(token, process.env.KEY);
        req.user = decoded; // Attach decoded data to req.user
        next();
    } catch (err) {
        return res.json({ status: false, message: "Invalid token" });
    }
};


router.get('/verify', verifyUser, (req, res) => {
    return res.json({ status: true, message: "Authorized" });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true });
});

router.get('/profile', verifyUser, async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.KEY);

        const user = await Customer.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            Fname: user.Fname,
            Lname: user.Lname,
            Email: user.Email,
            Password: user.Password
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});

router.put('/profile/update', verifyUser, async (req, res) => {
    try {
        const { Fname, Lname, Email, Password } = req.body;
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.KEY);
        
        const user = await Customer.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        user.Fname = Fname || user.Fname;
        user.Lname = Lname || user.Lname;
        user.Email = Email || user.Email;
        user.Password = Password || user.Password;

        await user.save();
        return res.json({ status: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ status: false, message: 'Error updating profile' });
    }
});

router.delete('/delete', verifyUser, async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.KEY);
        
        const user = await Customer.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        await Customer.deleteOne({ _id: user._id });
        res.clearCookie('token');
        return res.json({ status: true, message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        return res.status(500).json({ status: false, message: 'Error deleting account' });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

router.post('/profile/update-image', upload.single('profileImage'), async (req, res) => {
    try {
        const userId = req.user._id;
        const profileImagePath = req.file.path;

        await Customer.findByIdAndUpdate(userId, { profileImage: profileImagePath });

        res.json({ message: 'Profile image updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating profile image' });
    }
});

module.exports = router;