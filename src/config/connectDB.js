const mongoose = require("mongoose");

require("dotenv").config()

const userConnectionURI = process.env.CONNECTION_URI + "User"
const userConnection = mongoose.createConnection(userConnectionURI, {});

const accessibilityConnectionURI = process.env.CONNECTION_URI + "Accessibility"
const accessibilityConnection = mongoose.createConnection(accessibilityConnectionURI, {});

const mapConnectionURI = process.env.CONNECTION_URI + "Map"
const mapConnection = mongoose.createConnection(mapConnectionURI, {});

const userRoutesConnectionURI = process.env.CONNECTION_URI + "UserRoutes"
const userRoutesConnection = mongoose.createConnection(userRoutesConnectionURI, {});

const rentalConnectionURI = process.env.CONNECTION_URI + "RentalService"
const rentalConnection = mongoose.createConnection(rentalConnectionURI, {});

const transporationConnectionURI = process.env.CONNECTION_URI + "Transportation"
const transporationConnection = mongoose.createConnection(transporationConnectionURI, {});

// CHECK CONNECTIONS =================================
// Successful connection
userConnection.once("connected", () => { console.log("Successfully connected to User Database"); })
transporationConnection.once("connected", () => { console.log("Successfully connected to Transportation Database"); })
rentalConnection.once("connected", () => { console.log("Successfully connected to Rental Database"); })
accessibilityConnection.once("connected", () => { console.log("Successfully connected to Accessibility Database"); })
mapConnection.once("connected", () => { console.log("Successfully connected to Map Database"); })
userRoutesConnection.once("connected", () => { console.log("Successfully connected to User Routes Database"); })
// Error connecting
userConnection.on("error", (error) => { console.error("Error connecting to User Database: ", error); })
transporationConnection.on("error", (error) => { console.error("Error connecting to Transportation Database: ", error); })
rentalConnection.on("error", (error) => { console.error("Error connecting to Rental Database: ", error); })
accessibilityConnection.on("error", (error) => { console.error("Error connecting to Accessibility Database: ", error); })
mapConnection.on("error", (error) => { console.error("Error connecting to Map Database: ", error); })
userRoutesConnection.on("error", (error) => { console.error("Error connecting to User Routes Database: ", error); })
// Disconnected
userConnection.on("disconnected", () => { console.log("User Database disconnected"); })
transporationConnection.on("disconnected", () => { console.log("Transportation Database disconnected"); })
rentalConnection.on("disconnected", () => { console.log("Rental Database disconnected"); })
accessibilityConnection.on("disconnected", () => { console.log("Accessibility Database disconnected"); })
mapConnection.on("disconnected", () => { console.log("Map Database disconnected"); })
userRoutesConnection.on("disconnected", () => { console.log("User Routes Database disconnected"); })
// END: CHECK CONNECTIONS =============================

module.exports = {
    // connectDB,
    userConnection,
    accessibilityConnection,
    mapConnection,
    userRoutesConnection,
    rentalConnection,
    transporationConnection
}