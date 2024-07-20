const authModel = require('../models/M_auth');
const jwt = require('jsonwebtoken');


const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);

        const [user] = await authModel.getUserWithToken(refreshToken);
        if(!user[0]) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            const userId = user[0].id;
            const name = user[0].name;
            const acccessToken = jwt.sign({userId,name}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ acccessToken })
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = { refreshToken };