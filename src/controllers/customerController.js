const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs')

const getProfile = async (req, res) => {
    try{
        const customerData = req.customer;
        const customer = await prisma.customer.findFirst({ where: { ID: customerData.ID}});
        res.json(customer);
    }catch(error){
        res.status(400).json({ message: error.message});
    }

}

const updateProfile = async (req, res ) => {
    try{
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
    }catch(error){
        res.status(400).json({ message: error.message});
    }

}

module.exports = {getProfile, updateProfile};