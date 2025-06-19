const prisma = require('../config/prisma');
const { Type } = require('../generated/prisma');
const { connect } = require('../router/documentRouter');

const addDocumentsReg = async (req, res) => {
    const regId = req.params.regId;
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
}

const customerAddDocuments = async (req, res) => {
    const regId = req.params.regId;
    const customerId = req.customer.ID;
    const type = req.body.type
    const document = await prisma.document.create({ date: {
        Type: type,
        customerId: customerId,
        Registrations: {
            connect: {
                ID: regId
            }
        }
    }});

    res.json(document);
}

const requireCustomer = async (req, res) => {
    const customerId = req.customer.ID;
    const documents = await prisma.document.findMany({ where: { CustomerID: customerId}});

    res.json(documents);
}

const getDocuments = async (req, res) => {
    const regId = req.params.regId;
    const documents = await prisma.document.findMany({ 
        where: {
            Registrations: {
                some: { ID: regId }
            }
        }
    });

    res.json(documents);
}

const getDocumentsTrip = async (req, res) => {
    const tripId = req.params.id;
    const documents = await prisma.document.findMany({
        where: {
            Registrations: { 
                some: { tripId: tripId}
            }
        }
    });

    res.json(documents);
}

module.exports = { addDocumentsReg, customerAddDocuments, requireCustomer, getDocuments, getDocumentsTrip };