const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs')

const getProfile = async (req, res) => {
    const customerData = req.customer;
    const customer = await prisma.customer.findFirst({ where: { ID: customerData.ID}});
    res.json(customer);
}

const updateProfile = async (req, res ) => {
    const customerId = req.customer.ID;
    const customerData = req.body
    const newPWD = await bcrypt.hash(customerData.password, 15);
    const updatedCustomer = await prisma.customer.update({ where: { ID: customerId}, data: {
                Lname: customerData.lName, 
                Fname: customerData.fName, 
                Email: customerData.email, 
                Password: newPWD, 
    }});
    res.json(updatedCustomer)
}


module.exports = {getProfile, updateProfile};