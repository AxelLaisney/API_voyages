const prisma = require('../config/prisma');

const addPayment = async (req, res) => {
    const regId = req.params.regId;
    const customerId = req.customer.regId
    const trip = await prisma.trips.findFirst({
        select: { 
            Price: true,
            Registrations : {
                where: { ID: regId}
            }
        }
    })
    const payment = await prisma.payment.create({ data: {
        CustomerID: customerId,
        RegistrationID: regId,
        Amount: trip.Price
    }})
    res.json(payment);
}

const customerPayments = async (req, res ) => {
    const customerId = req.customer.ID;
    const payments = await prisma.payment.findMany({ where: { CustomerID: customerId}});
    res.json(payments);
}

const tripPayments = async (req, res ) => {
    const tripId = req.params.id;
    const payments = await prisma.payment.findMany({ where: {
        Registration: { 
            where: { tripId: tripId }
        }
    }});

    res.json(payments);
}

module.exports = { addPayment, customerPayments, tripPayments };