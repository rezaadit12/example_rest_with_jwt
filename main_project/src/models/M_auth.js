const dbPool = require('../config/database');
const bcrypt = require('bcrypt');

const getAllAuthUsers = () => {
    const query = 'SELECT * FROM auth_users';
    return dbPool.execute(query);
}

const register = async(body) => {

    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(body.password, salt);

    const query =  `INSERT INTO auth_users (email, password) VALUES (?,?)`;
    const values = [body.email, hashpassword];

    return dbPool.execute(query, values);
}


const selectEmail = (email) => {
    const query = `SELECT * FROM auth_users WHERE email = ?`;
    const values = [email];

    return dbPool.execute(query, values);
}

const userUpdateToken = (userId, refreshToken) => {
    const query = `UPDATE auth_users SET refresh_token = ? WHERE id = ?`;
    const values = [refreshToken, userId];

    return dbPool.execute(query, values);
}

const getUserWithToken = (refreshToken) => {
    const query = `SELECT * FROM auth_users WHERE refresh_token = ?`;
    const values = [refreshToken];

    return dbPool.execute(query, values);
}



module.exports = {
    getAllAuthUsers,
    register,
    selectEmail,
    userUpdateToken,
    getUserWithToken
}