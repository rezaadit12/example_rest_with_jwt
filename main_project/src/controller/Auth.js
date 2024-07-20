const authModel = require('../models/M_auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getAllAuthUsers = async(req, res) => {
    try {
        const [dataAuth] = await authModel.getAllAuthUsers();
        res.json({
            message: "GET Auth_Users Success",
            data: dataAuth
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error!",
            serverMessage: error,
        });
    }
}


const register = async(req, res) => {
    const { body } = req;

    if(body.password !== body.confPassword) return res.status(400).json({message: "password tidak sesuai"});

    try {
        await authModel.register(body);
        res.status(201).json({message: "Registrasi Berhasil"});
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
}


const login = async(req, res) => {
    try {
        const [user] = await authModel.selectEmail(req.body.email);
        
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({message: "Wrong Password!"});

        const userId = user[0].id;
        const email = user[0].email;

        const accessToken = jwt.sign({userId, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign({userId, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await authModel.userUpdateToken(userId, refreshToken);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // watu expired dari cookie
        });

        res.json({ accessToken });

    } catch (error) {
        console.error(error);
    }
}


const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);

    const [user] = await authModel.getUserWithToken(refreshToken);
    if(!user) return res.sendStatus(204);

    const userId = user[0].id;
    // console.log(userId)
    await authModel.userUpdateToken(userId, null);

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}



module.exports = {
    getAllAuthUsers,
    register,
    login,
    logout
}