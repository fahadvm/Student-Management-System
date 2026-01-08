const express = require("express")
const app = express()
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")
const path = require("path")
const connectDB = require("./db/connectDB")
const session = require("express-session")
const nocache = require("nocache")

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "hbs");
app.use(express.static("public"))

app.use(nocache())

// Unified session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}))

// Middleware to check for deleted users
app.use((req, res, next) => {
    const deletedUserEmail = req.app.get('deletedUserEmail');
    if (req.session.user && req.session.user.email === deletedUserEmail) {
        delete req.session.user;
        req.app.set('deletedUserEmail', null);
        return res.redirect('/user/login');
    }
    next();
});

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});



app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/user", userRoutes)
app.use("/admin", adminRoutes)

connectDB()

app.get('/',(req,res) => {
    if(req.session.user){
        res.redirect('/user/home')
    } else{
        res.redirect("/user/login")
    }
})

app.get("/admin/*", (req,res) => {
    if (req.session.admin) {
      res.redirect("/admin/dashboard");
    }else{
        res.redirect("/admin/login")
    }
});

app.get("/user/*", (req, res) => {
    if(req.session.user) {
        res.redirect("/user/home")
    }else{
        res.redirect("/user/login")
    }
})

app.listen(3188 , ()=>{
    console.log("server started at : http://localhost:3188")
})

