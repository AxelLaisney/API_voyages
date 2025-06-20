const { createUsers } = require("./src/services/CreateUserDB");
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")

dotenv.config()

app.use(express.json());
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use( require('./src/router/tripsRouter'))
app.use( require('./src/router/customerRouter'))
app.use( require('./src/router/authentificationRouter'))
app.use( require('./src/router/paymentRouter'))
app.use( require('./src/router/documentRouter'))
app.use( require('./src/router/registrationRouter'))

createUsers();

app.listen(3000, () => console.log('Server running on port 3000'));