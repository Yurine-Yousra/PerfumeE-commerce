import jwt from 'jsonwebtoken';

const AuthToken = (req, res, next) => {
    const jwtSecret = process.env.JWT_SECRET
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ success: false, message: 'You have to be logged in to perform this operation' });
    }
    const token = authorization.replace("Bearer ", "") 
    try {
        // Verify the token
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Invalid token" });
            }
            req.userId = decodedToken.id; // Use the decoded token data
            next(); // Call next() to pass control to the next middleware
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
};

export default AuthToken;
