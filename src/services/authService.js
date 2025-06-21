const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require("../config/prisma");

const addCustomer = async (customer) => {
    const existingCustomer = await prisma.customer.findFirst({ where: {Email: customer.email}});
    if(existingCustomer){
        throw new Error("Customer already exists");
    }

    const hashedPWD = await bcrypt.hash(customer.password, 15);
    const Newcustomer = await prisma.Customer.create({ data: {
                Lname: customer.lName, 
                Fname: customer.fName, 
                Email: customer.email, 
                Password: hashedPWD, 
                Role: customer.role
    }});

    return Newcustomer;
}

const authentify = async (email, password) => {
    const customer = await prisma.customer.findFirst({ where: { Email: email}});


    if (!customer){
        throw new Error('Invalid email/password');
    }

    const PWDValid = await bcrypt.compare(password, customer.Password)
    if(!PWDValid){
        throw new Error('Invalid email/password');
    }
    const token = jwt.sign(
        { customerId: customer.ID},
        process.env.JWT_secret,
        { expiresIn: '24h'}
    );
    
    return {customer, token}
}

module.exports = { addCustomer, authentify };