console.log(__dirname); // Logs the current directory

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminModel = require("../model/adminModel"); // Adjust the path to your admin model file

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb://127.0.0.1:27017/userAuth011", {});

        const email = "admin@gmail.com";
        const password = "12345679";

        // Check if the admin already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            console.log("Admin with this email already exists.");
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const newAdmin = new adminModel({
            email,
            password: hashedPassword,
        });

        await newAdmin.save();
        console.log("Admin added successfully!");
    } catch (error) {
        console.error("Error adding admin:", error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
