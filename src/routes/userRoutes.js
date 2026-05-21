import express from "express";

// import {
//     createUser,
//     getAllUsers,
//     getUserById,
//     updateUser,
//     deleteUser
// } from "../controllers/userController.js";

// const router = express.Router();

// router.post("/", createUser);
// router.get("/", getAllUsers);
// router.get("/:id", getUserById);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

import {
    getProfile,
    updateProfile,
    deleteProfile
} from "../controllers/userController.js";

import {authenticateUser} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authenticateUser, getProfile);
router.put("/profile", authenticateUser, updateProfile);
router.delete("/profile", authenticateUser, deleteProfile);

export default router;

