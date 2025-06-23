const prisma = require('../config/prisma');
const { Type } = require('../generated/prisma');
const { connect } = require('../router/documentRouter');

const addDocumentsReg = async (req, res) => {
    try{
        const regId = parseInt(req.params.regId);
        console.log(req.body.type);
        const type = req.body.type;
        const document = await prisma.document.create({ data: {
            Type: type,
            Registrations: {
                connect: {
                    ID: regId
                }
            }
        }});

        res.json(document)
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

const customerAddDocuments = async (req, res) => {
    try{
        const regId = parseInt(req.params.regId);
        const customerId = req.customer.ID;
        const type = req.body.type
        const document = await prisma.document.create({ data: {
            Type: type,
            CustomerID: customerId,
            Registrations: {
                connect: {
                    ID: regId
                }
            }
        }});

        res.json(document);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

const requireCustomer = async (req, res) => {
    try{
        const customerId = req.customer.ID;
        const documents = await prisma.document.findMany({ where: { CustomerID: customerId}});

        res.json(documents);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

const getDocuments = async (req, res) => {
    try{
        const regId = req.params.regId;
        const documents = await prisma.document.findMany({ 
            where: {
                Registrations: {
                    some: { ID: regId }
                }
            }
        });

        res.json(documents);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

const getDocumentsTrip = async (req, res) => {
    try{
        const tripId = parseInt(req.params.id);
        const documents = await prisma.document.findMany({
            where: {
                Registrations: { 
                    some: { TripsID: tripId}
                }
            }
        });

        res.json(documents);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
}

module.exports = { addDocumentsReg, customerAddDocuments, requireCustomer, getDocuments, getDocumentsTrip };