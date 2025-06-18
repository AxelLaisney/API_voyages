const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const createUsers = async () => {
    const customerExist = await prisma.customer.findFirst({ where: { Lname: "Dupont" }});
    if(!customerExist){
        const customer = await prisma.customer.create({ data: { 
            Lname: "Dupont", Fname: "Bob", Email: "Dupont.Bob@email.com", Password: "1234", Role: "USER", Registrations: [], Payments: [], Documents: []
        }});
    }

    const adminExist = await prisma.customer.findFirst({ where: { Lname: "Laurent " }});
    if(!adminExist){
        const admin = await prisma.customer.create({ data: {
            Lname: "Laurent", Fname: "Vincent", Email: "Laurent.Vincent@email.com", Password: "5678", Role: "ADMIN", Registrations: [], Payments: [], Documents: []
        }})
    }

    console.log(customer, admin);
}

module.exports = createUsers;