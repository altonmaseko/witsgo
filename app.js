const path = require("path") // helps use write paths properly
const express = require("express") // get main library for the server

const app = express() // initialize server
const PORT = process.env.PORT || 3000; // get port from .env file, otherwise 3000


app.get('/', (req, res) => { // listen for request to http://localhost:3000/
    res.send('Hello, this is the hexago server!!! Hooray!!!');
});

app.listen(PORT, () => { // listen for requests
    console.log(`server listening on port ${PORT}...`)
})

