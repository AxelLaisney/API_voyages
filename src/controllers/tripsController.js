const prisma = require('../config/prisma');

const getAll = async (req, res) => {
    try{

    }catch(error){
        res.status(400).json({ message: error.message});
    }
    const trips = await prisma.trips.findMany();
    res.json(trips);
}

const getOne = async (req, res) => {
    try{

    }catch(error){
        res.status(400).json({ message: error.message});
    }
    const id = parseInt(req.params.id);
    const trip = await prisma.trips.findFirst({ where: { ID: id}});
    res.json(trip);
}

const create = async (req, res) => {
    try{

    }catch(error){
        res.status(400).json({ message: error.message});
    }
    const trip = req.body;
    console.log(trip);
    const newTrip = await prisma.trips.create({ data: {
        Destination: trip.destination, Places: trip.places, Status: "AVAILABLE", Price: trip.price
    }});
    res.json(newTrip);
}

const update = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const trip = req.body;
        const updateTrip = await prisma.trips.update({ where: { ID: id }, data: {
            Destination: trip.destination, Places: trip.places, Status: trip.status, Price: trip.price
        }});
        res.json(updateTrip);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

const destroy = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const deletedTrip = await prisma.trips.delete({ where: { ID: id}})
        res.json(deletedTrip);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

module.exports = {getAll, getOne, create, update, destroy};