// Auth middleware : checks if the user is authenticated before allowing access to endpoints aka routes.

import jwt from "jsonwebtoken";
// this library has 2 main agendas : 1. to create a token using jwt.sign() and 2. to verify a token using jwt.verify()

export const authenticateUser = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                // message: "Authorization header missing or malformed"
                message : "Unauthorized"
            });
        }

        const token = authHeader.split(" ")[1]; // split the string "Bearer token_value" and get the token_value

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "splitwise_secret");

        req.user = decoded; // attach the decoded token (which contains userId and email) to the request object for use in subsequent middleware or route handlers

        next(); // call the next route handler
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        }); 
    }
};