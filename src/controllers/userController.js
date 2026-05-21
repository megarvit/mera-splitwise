import { User } from "../models/index.js";


// // CREATE USER
// export const createUser = async (req, res) => {
//     try {
//         const { name, email } = req.body;

//         const user = await User.create({
//             name,
//             email
//         });
//         res.status(201).json(user);

//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };


// // GET ALL USERS
// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.findAll();
//         res.json(users);

//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };


// // GET USER BY ID
// export const getUserById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findByPk(id);

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }
//         res.json(user);

//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };


// // UPDATE USER
// export const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, email } = req.body;
//         const user = await User.findByPk(id);

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         await user.update({
//             name,
//             email
//         });
//         res.json(user);

//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };


// // DELETE USER
// export const deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findByPk(id);

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }
//         await user.destroy();

//         res.json({
//             message: "User deleted successfully"
//         });

//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };

// GET PROFILE
export const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId,
            {
                attributes: { exclude: ['password'] }
            }
        );

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const {name, email, currency} = req.body;

        const user = await User.findByPk(req.user.userId);

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.update({
            name : name || user.name,
            email : email || user.email,
            currency : currency || user.currency
        });

        res.json({
            message: "Profile updated successfully",
            user : {
                userId : user.userId,
                name : user.name,
                email : user.email,
                currency : user.currency
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// DELETE PROFILE
export const deleteProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId);

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.destroy();

        res.json({
            message: "Account deleted successfully"
        });

    } catch (error) {             
        res.status(500).json({
            error: error.message
        });
    }
};