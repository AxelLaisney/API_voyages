const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');

const createUsers = async () => {
    try {
        const customerExist = await prisma.customer.findFirst({ where: { Lname: "Dupont" }});
        if(!customerExist){
            const hashedPWD = await bcrypt.hash("1234", 15);
            await prisma.customer.create({ 
                data: { 
                    Lname: "Dupont", 
                    Fname: "Bob", 
                    Email: "Dupont.Bob@email.com", 
                    Password: hashedPWD, 
                    Role: "USER"
                }
            });
        }

        const adminExist = await prisma.customer.findFirst({ where: { Lname: "Laurent" }});
        if(!adminExist){
            const hashedPWD = await bcrypt.hash("5678", 15);
            await prisma.customer.create({ 
                data: {
                    Lname: "Laurent", 
                    Fname: "Vincent", 
                    Email: "Laurent.Vincent@email.com", 
                    Password: hashedPWD, 
                    Role: "ADMIN"
                }
            });
        }

        console.log("Initial users created successfully");
    } catch (error) {
        console.error("Error creating initial users:", error);
    }
}

module.exports = { createUsers };