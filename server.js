const express = require('express') ; 
const dotenv  = require('dotenv').config() ; 

const contactRoutes = require("./routes/contactRoutes.js") ; 
const userRoutes = require("./routes/userRoutes.js") ; 

const errorHandler = require('./middleware/errorHandler.js');
const connectDB = require('./config/dbConnection.js');

connectDB() ; 

const app = express() ; 

const port = process.env.PORT || 3001 ;

// Use the router defined in contactRoutes.js to handle any requests made to paths starting from 
// /api/contacts

// app.use('/api/contacts', require("./routes/contactRoutes")) ; 

// Middleware to parse JSON request bodies 

app.use(express.json()) ; 

app.get('/', function (req, res) {
    res.send("Hello") ; 
}) ; 

app.use("/api/contacts", contactRoutes) ; 
app.use("/api/users", userRoutes) ; 

app.use(errorHandler) ; 

app.listen(port, () => {
    console.log(`Server running on port: ${port}`) ; 
}) ; 

