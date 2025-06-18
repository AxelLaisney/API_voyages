const prisma = require('../config/prisma');

const createUsers = async () => {
    try {
        const customerExist = await prisma.customer.findFirst({ where: { Lname: "Dupont" }});
        if(!customerExist){
            await prisma.customer.create({ 
                data: { 
                    Lname: "Dupont", 
                    Fname: "Bob", 
                    Email: "Dupont.Bob@email.com", 
                    Password: "1234", 
                    Role: "USER"
                }
            });
        }

        const adminExist = await prisma.customer.findFirst({ where: { Lname: "Laurent" }});
        if(!adminExist){
            await prisma.customer.create({ 
                data: {
                    Lname: "Laurent", 
                    Fname: "Vincent", 
                    Email: "Laurent.Vincent@email.com", 
                    Password: "5678", 
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