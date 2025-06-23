const prisma = require('../config/prisma');

const addPayment = async (req, res) => {
    try{
        const regId = parseInt(req.params.regId);
        const customerId = req.customer.ID
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
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

const customerPayments = async (req, res ) => {
    try{
        const customerId = req.customer.ID;
        const payments = await prisma.payment.findMany({ where: { CustomerID: customerId}});
        res.json(payments);
    }catch(error){
        res.status(400).json({ message: error.message});
    }

}

const tripPayments = async (req, res ) => {
    try{
        const tripId = parseInt(req.params.id);
        const payments = await prisma.payment.findMany({
            where: {
                Registration: {
                    Trips: {
                        ID: tripId
                    }
                }
            }
        });

        res.json(payments);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

module.exports = { addPayment, customerPayments, tripPayments };