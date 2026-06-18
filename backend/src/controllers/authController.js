const authService = require("../services/authService");


async function register(req, res) {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({
            message: "Username dan Password Wajib Diisi!"
        });
    }

    
    const result = await authService.register(
        username,
        password
    );

    res.status(200).json(result)
}

async function login(req, res) {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({
            message: "Username dan Password Wajib Diisi!"
        });
    }

    const result = await authService.login(
        username,
        password
    );

    res.status(200).json(result)
    
}

async function profile(req, res) {
    res.json(req.user);
}
    

module.exports = {
    register,
    login,
    profile,

};