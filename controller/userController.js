const userSchema = require("../model/userModel.js")
const bcrypt = require("bcrypt")
const saltround = 10


//FOR REGISTERING A USER
//CHECK IF THE MAIL IS ALREADY EXISTING


const registerUser = async(req, res) => {
    try {
        const {email, password} = req.body

        const user = await userSchema.findOne({email})

        if(user){
            return res.render("user/register", {message: "User Already exists"})
        } 

        const hashedpassword = await bcrypt.hash(password, saltround)

        const newuser = new userSchema({
            email,
            password:hashedpassword
        })

        await newuser.save()

        // Instead of rendering, redirect to login page
        return res.redirect("/user/login?registered=true");

    } catch(error) {
        console.log(error)
        return res.render("user/register", { message: "An error occurred. Please try again." });
    }   
}


const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userSchema.findOne({email})

        if(!user){
            return res.render("user/login", {message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.render("user/login", {message: "Incorrect Password"})
        }

        req.session.user = true
        req.session.userData = {email: user.email}

        res.redirect("/user/home")
    } catch(error) {
        console.error(error);
        res.render("user/login", { message: "An error occurred. Please try again." })
    }
}



 // FOR LOAD REGISTER PAGE
 const  loadRegister = (req,res)=>{
    res.render("user/register")
 }

 // FOR LOAD LOGIN PAGE

const loadLogin = (req, res) => {
    const registered = req.query.registered === 'true';
    res.render("user/login", { message: registered ? "Registration Successful! Please log in." : null });
}



// LOAD Home Page

const loadHome = (req, res) => {
    if (!req.session.user) {
        return res.redirect("/user/login");
    }
    const userEmail = req.session.userData.email;

    res.render("user/userHome", { email: userEmail, message: "Login Successful" })
}

 // FOR LOGOUT
 const logout = (req, res) => {
    delete req.session.user;
    res.redirect("/user/login");
}

 
 // FOR EXPoRTING THE MODULES
module.exports = {
    registerUser,
    loadRegister,
    loadLogin,
    login,
    loadHome,
    logout
}

