const prisma = require('../config/prisma');

const createTrips = async () => {
    let existingTrips = await prisma.trips.findFirst({ where: { Destination: "New-York" }});
    if(!existingTrips){
        const trip1 = await prisma.trips.create({ data: {
            Destination: "New-York",
            Price: 100.00,
            Places: 50,
        }});
    }

    existingTrips = await prisma.trips.findFirst({ where: { Destination: "Paris" }});
    if(!existingTrips){
        const trip2 = await prisma.trips.create({ data: {
            Destination: "Paris",
            Price: 200.00,
            Places: 100,
        }});
    }

        existingTrips = await prisma.trips.findFirst({ where: { Destination: "Tokyo" }});
    if(!existingTrips){
        const trip3 = await prisma.trips.create({ data: {
            Destination: "Tokyo",
            Price: 150.00,
            Places: 75,
        }});
    }

}

module.exports = createTrips;