const prisma = require('../config/prisma');

const getAll = async (req, res) => {
    const trips = await prisma.trips.findMany();
    res.json(trips);
}

const getOne = async (req, res) => {
    const id = req.params.id
    const trip = await prisma.trips.findFirst({ where: { ID: id}});
    res.json(trip);
}

const create = async (req, res) => {
    const trip = req.body;
    const newTrip = await prisma.trips.create({ data: {
        Destination: trip.destination, Places: trip.places, Status: "AVAILABLE", Price: trip.price, Registrations: []
    }});
}

const update = async (req, res) => {
    const trip = req.body;
    const updateTrip = await prisma.trips.update({ data: {
        Destination: trip.destination, Places: trip.places, Status: trip.status, Price: trip.price, Registrations: []
    }});
}

const destroy = async (req, res) => {
    const id = req.params.id
    const deletedTrip = await prisma.trips.delete({ where: { ID: id}})
    res.json(deletedTrip);
}

module.exports = {getAll, getOne, create, update, destroy};