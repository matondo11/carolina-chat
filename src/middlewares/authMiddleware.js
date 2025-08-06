const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET 
IsloggenIn = (req, res, next)=>{
    const token = req.cookies.token;
    if (!token) {
        req.flash("errorMsg", "Você não está logado");
        return res.redirect("/signin");
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            req.flash("errorMsg", "Token inválido ou expirado");
            return res.redirect("/signin");
        }
        req.user = decoded;
        console.log("Usuario logado:", req.user);
        next();
    });
}
module.exports = {IsloggenIn}