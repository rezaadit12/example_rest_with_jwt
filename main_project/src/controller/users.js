const usersModel = require('../models/users');


const getAllUsers = async (req, res) => { // tambahkan async 
    // pemanggilan ke database bersifat async jadi perlu menunggu dulu dengan menambah 'await'
    try {
        const [data] = await usersModel.getAllUsers(); // kenapa array?, karna destructuring
        res.json({
            message: "GET users success",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
}


const createNewUser = async (req, res) => {
    const { body } = req;
    try {
        await usersModel.createNewUser(body);
        res.status(201).json({
            message: "POST user success",
            data: body,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
}


const updateUser = async (req, res) => {
    const { idUsers } = req.params;
    const { body } = req;

    try {
        await usersModel.updateUser(body, idUsers);

        console.log("idUsers: ", idUsers);
        res.json({
            message: "UPDATE user success",
            data: {
                id: idUsers,
                ...body  // spread, agar muncul semua datanya
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
}

const deleteUser = async (req, res) => {
    const { idUsers } = req.params;

    try {
        await usersModel.deleteUser(idUsers);

        res.json({
            message: "DELETE user success",
            data: {
                id: idUsers,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}