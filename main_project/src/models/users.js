const dbPool = require('../config/database');

const getAllUsers = (req, res) => {
    const query = 'SELECT * FROM users';
    return dbPool.execute(query);
}

const createNewUser = (body) => {
    const query = ` INSERT INTO users (name, email, address) 
                    VALUES ('${body.name}', '${body.email}', '${body.address}')`;

    return dbPool.execute(query);
}


// perbaikan kode agar tidak terkena sql injection
const createNewUse = (body) => {
    const query = `INSERT INTO users (name, email, address) VALUES (?, ?, ?)`;
    const values = [body.name, body.email, body.address];

    return dbPool.execute(query, values);
}
// -----------------------------------------------------

const updateUser = (body, idUser) => {
    const query = ` UPDATE users 
                    SET name='${body.name}', email='${body.email}', address='${body.address}'
                    WHERE id=${idUser}`;
    return dbPool.execute(query);
}

const deleteUser = (idUser) => {
    const query = `DELETE FROM users WHERE id=${idUser}`;

    return dbPool.execute(query);
}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}