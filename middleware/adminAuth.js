
//CHECKING THE SESSION
const checkSession = (req,res,next)=>{
    if(req.session.admin){
        next()
    }else {
        res.redirect("/admin/login")
    } 
}

//IF ADMIN LOGIN REDIRECT TO DASHBOARD OTHERWISE LOGIN
const isLogin = (req,res,next) => {
    if(req.session.admin){
        res.redirect("/admin/dashboard")
    }else { 
        next()
}
}

//FOR EXPORTING THE MODULE
module.exports = {
    checkSession,
    isLogin
}