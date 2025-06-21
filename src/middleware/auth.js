const jwt = require('jsonwebtoken');
const prisma = require("../config/prisma")

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        if(!token) {
            return res.status(401).json({ message: "Must be logged in"});
        }

        const decoded = jwt.verify(token, process.env.JWT_secret);
        const customer = await prisma.customer.findFirst({ where: { ID: decoded.customerId}})

        if (!customer){
            return res.status(401).json({ message: "customer not found"});
        }

        req.customer = customer;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: "invalid token"})
    }
}

const isAdmin = async (req, res, next) => {
    try {
        if (req.customer.Role !== "ADMIN") {
            return res.status(403).json({ message: "admin role required"});
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
}

module.exports = { auth, isAdmin };
