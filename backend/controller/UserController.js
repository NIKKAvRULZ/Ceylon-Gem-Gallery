const User = require("../models/Validation/UserModel");

// Display all users
const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

    if (!users) {
        return res.status(404).json({ message: "Gem not found" });
    }

    return res.status(200).json({ users });
};

// Insert a new user
const addUsers = async (req, res, next) => {
    console.log(req.body);

    const { validationid, name, gemType, colour, clarity, weight, price } = req.body;

    let users;

    try {
        users = new User({ validationid, name, gemType, colour, clarity, weight, price });
        await users.save();
    } catch (err) {
        console.log(err);
    }

    if (!users) {
        return res.status(404).json({ message: "Unable to add Gems" });
    }

    return res.status(200).json({ users });
};

// Get user by ID
const getById = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!user) {
        return res.status(404).json({ message: "Gem not found" });
    }

    return res.status(200).json({ user });
};

// Update user details
const updateUser = async (req, res, next) => {
    const id = req.params.id;

    const { validationid, name, gemType, colour, clarity, weight, price } = req.body;

    let user;

    try {
        user = await User.findByIdAndUpdate(
            id,
            { validationid, name, gemType, colour, clarity, weight, price },
            { new: true } // Return the updated document
        );
    } catch (err) {
        console.log(err);
    }

    if (!user) {
        return res.status(404).json({ message: "Unable to update gem details" });
    }

    return res.status(200).json({ user });
};

//Delete user details
const deletUser = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try{
        user = await User.findByIdAndDelete(id)
    }catch (err){

    }
    if (!user) {
        return res.status(404).json({ message: "Unable to delete gem details" });
    }

    return res.status(200).json({ user });
}
exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deletUser = deletUser;