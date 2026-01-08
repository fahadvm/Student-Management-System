const adminModel = require("../model/adminModel");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

//JUST RENDER THE LOGIN PAGE
const loadLogin = async (req, res) => {
    res.render("admin/login");
};

//AUTHENTICATION OF THE ADMIN
//IF CORRECT REDIRECT TO THE DASHBOARD
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.render("admin/login", { message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.render("admin/login", { message: "Invalid Credentials" });
        }

        req.session.admin = admin;

        res.redirect("/admin/dashboard");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

//FOR DISPLAYING ALL USERS IN DASHBOARD
const loadDashboard = async (req, res) => {
    try {
        const admin = req.session.admin;
        if (!admin) {
            return res.redirect("/admin/login");
        }
        const users = await userModel.find({});

        res.render("admin/dashboard", { users: users, loggedInUser: admin });
    } catch (error) {
        res.status(500).send("Internal Sever Error");
    }
};

//FOR ADD A USER
//CHECK IF IT IS EXISTING USER, CHECK PASSWORD LENGTH
const addUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use",
            });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ email, password: hashedPassword });
        await newUser.save();
        return res.status(200).json({
            success: true,
            message: "User added successfully",
        });
    } catch (error) {
        console.error("Error in addUser:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//FOR EDIT A USER
//CHECK IF IT EXISITING MAIL, CHECK PASSWORD LENGTH
const editUser = async (req, res) => {
    const { id, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser && existingUser._id.toString() !== id) {
            return res.json({
                success: false,
                message: "Email is already in use by another user.",
            });
        }

        if (password && password.length < 8) {
            return res.json({
                success: false,
                message: "password mustbe atleast 8 characters",
            });
        }
        const updatedData = { email };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }

        await userModel.findByIdAndUpdate(id, updatedData);

        return res.json({
            success: true,
            message: "User updated successfully",
        });
    } catch (error) {
        console.error("Error in editUser:", error);
        return res.json({
            success: false,
            message: "An error occurred while updating the user",
        });
    }
};


// DELETE a USER 

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const adminEmail = req.session.admin.email;
        
        console.log(`Admin ${adminEmail} attempting to delete user ${userId}`);
        req.session.user = false

        const user = await userModel.findById(userId);
        
        if (!user) {
            console.log(`User ${userId} not found`);
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        console.log(`Found user to delete: ${user.email}`);

        await userModel.findByIdAndDelete(userId);
        console.log(`User ${user.email} deleted from database`);

        // Set a flag to indicate that this user has been deleted
        req.app.set('deletedUserEmail', user.email);

        console.log(`Deletion process completed for ${user.email}`);

        res.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteUser:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// WHEN ADMIN ADDING USER CHECK IF THE AMIN IS AUTHORIZED
// IF IT IS RENDER ADD USER PAGE
// IF NOT REDIRECT TO LOGIN PAGE

const loadAddUser = (req, res) => {
    try {
        const admin = req.session.admin;
        if (!admin) {
            return res.redirect("/admin/login");
        }
        res.render("admin/add-user");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

//FOR LOGOUT
const logout = (req, res) => {
    delete req.session.admin;
    res.redirect("/admin/login");
};

//FOR SEARCHING THE USERS
const searchUsers = async (req, res) => {
    try {
        const admin = req.session.admin;
        if (!admin) {
            return res.redirect("/admin/login");
        }

        const searchQuery = req.query.q || "";
        const users = await userModel.find({
            email: { $regex: searchQuery, $options: "i" },
        });

        res.render("admin/dashboard", { users, loggedInUser: admin, searchQuery });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//FOR EXPORTING MODULES
module.exports = {
    loadLogin,
    login,
    loadDashboard,
    addUser,
    editUser,
    deleteUser,
    loadAddUser,
    logout,
    searchUsers,
};
