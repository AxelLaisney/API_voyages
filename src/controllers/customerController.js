const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs')

const getProfile = async (req, res) => {
    const customerData = req.customer;
    const customer = await prisma.customer.findFirst({ where: { ID: customerData.id}});
    res.json(customer);
}

const updateProfile = async (req, res ) => {
    const customerData = req.body
    const newPWD = bcrypt.hash(customerData.password, 15);
    const updatedCustomer = await prisma.customer.update({ where: { ID: customerData.id}, data: {
                Lname: customerData.lName, 
                Fname: customerData.fName, 
                Email: customerData.email, 
                Password: newPWD, 
    }});
    res.json(updatedCustomer)
}

module.exports = {getProfile, updateProfile};