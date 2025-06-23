const prisma = require('../config/prisma');

const getAll = async (req, res) => {
    try{
        const customerId = req.customer.ID;
        const registrations = await prisma.trips.findMany({
            where: {
                Registrations: {
                    some: {
                        CustomerID: customerId,
                    }
                }
            },include: {
                Registrations: true
            }
        })
        res.json(registrations);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

const getRegTrip = async (req, res ) => {
    try{
        const tripId = parseInt(req.params.id);
        const registrations = await prisma.registration.findMany({ where: {TripsID: tripId}})
        res.json(registrations);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

const create = async (req, res ) => {
    try{
        const customerId = req.customer.ID;
        const tripId = parseInt(req.params.tripId);
        const trip = await prisma.trips.findFirst({ where: {ID: tripId}});
        const customer = await prisma.customer.findFirst({ where: {ID: customerId}});
        console.log(customerId, tripId)
        const registration = await prisma.registration.create({ data:{ TripsID: trip.ID, CustomerID: customer.ID }});
        res.json(registration);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

const destroy = async (req, res ) => {
    try{
        const id = parseInt(req.params.id);
        const registration = await prisma.registration.delete({ where: { ID: id}});
        res.json(registration);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

module.exports = { getAll, getRegTrip, create, destroy };