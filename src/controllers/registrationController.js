const prisma = require('../config/prisma');

const getAll = async (req, res) => {
    const customerId = req.customer.ID;
    const registrations = await prisma.registration.findMany({ where: { CustomerID: customerId}});
    res.json(registrations);
}

const getRegTrip = async (req, res ) => {
    const tripId = req.params.id;
    const registrations = await prisma.registration.findMany({ where: {TripsID: tripId}})
    res.json(registrations);
}

const create = async (req, res ) => {
    const customerId = req.customer.ID;
    const tripId = req.params.tripId;
    const registration = await prisma.registration.create({ data:{ customerId: customerId, TripsID: tripId}});
    res.json(registration);
}

const destroy = async (req, res ) => {
    const id = req.params.id;
    const registration = await prisma.registration.delete({ where: { ID: id}});
    res.json(registration);
}

module.exports = { getAll, getRegTrip, create, destroy };