
// CHECKING THE SESSION
const checkSession = (req,res,next)=>{
    if(req.session.user){
        next()
    }else {
        res.redirect("/user/login")
    
    } 
    
}
//IF USER HAVE SESSION REDIRECT TO HOME OTHERWISE LOGIN
const isLogin = (req,res,next) => {
    if(req.session.user){
        res.redirect("/user/home")
       
    }else {
        next()
       
}
}
// Add this new middleware function
const preventBackToRegister = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/user/home');
    } else {
        next();
    }
};

module.exports = {checkSession, isLogin, preventBackToRegister}