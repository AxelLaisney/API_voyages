const { createUsers } = require("./src/services/CreateUserDB");
const createTrips = require("./src/services/createTripsDB")
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")

dotenv.config()

app.use(express.json());
app.use(cors({ 
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [ 'Content-Type', 'Authorization'],
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use( require('./src/router/tripsRouter'))
app.use( require('./src/router/customerRouter'))
app.use( require('./src/router/authentificationRouter'))
app.use( require('./src/router/paymentRouter'))
app.use( require('./src/router/documentRouter'))
app.use( require('./src/router/registrationRouter'))

createUsers();
createTrips();

app.listen(3000, () => console.log('Server running on port 3000'));