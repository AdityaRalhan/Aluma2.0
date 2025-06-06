import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({ error: "Unauthorized, no token found" });
    }

    try {
        const decodedInfo = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedInfo
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized, invalid token" });
    }
}